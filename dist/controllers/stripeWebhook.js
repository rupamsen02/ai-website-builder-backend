import prisma from "../lib/prisma.js";
import Stripe from "stripe";
export const stripeWebhook = async (req, res) => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (endpointSecret) {
        // Get the signature sent by Stripe
        const signature = req.headers["stripe-signature"];
        let event;
        try {
            event = stripe.webhooks.constructEvent(req.body, signature, endpointSecret);
        }
        catch (error) {
            console.log(`Webhook signature verification failed.`, error.message);
            return res.sendStatus(400);
        }
        // Handle the event
        switch (event.type) {
            case "payment_intent.succeeded":
                const paymentIntent = event.data.object;
                const sessionList = await stripe.checkout.sessions.list({
                    payment_intent: paymentIntent.id,
                });
                const session = sessionList.data[0];
                const { transactionId, appId } = session.metadata;
                if (appId === 'ai-website-builder' && transactionId) {
                    const transaction = await prisma.transaction.update({
                        where: { id: transactionId },
                        data: { isPaid: true },
                    });
                    // Add the credits to the user data
                    await prisma.user.update({
                        where: { id: transaction.userId },
                        data: { credits: { increment: transaction.credits } }
                    });
                }
                break;
            case "payment_method.attached":
                const paymentMethod = event.data.object;
                break;
            // ... handle other event types
            default:
                console.log(`Unhandled event type ${event.type}`);
        }
        // Return a response to acknowledge receipt of the event
        res.json({ received: true });
    }
};
