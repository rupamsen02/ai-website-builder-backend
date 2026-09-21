import "dotenv/config";
import express, { Request, Response } from 'express';
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth.js";
import userRouter from "./routes/userRoute.js";
import projectRouter from "./routes/projectRoutes.js";
import { stripeWebhook } from "./controllers/stripeWebhook.js";

const app = express();

const corsOptions = {
    origin: process.env.TRUSTED_ORIGINS,
    credentials: true,
}

// Middleware
app.use(cors(corsOptions))
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.all('/api/auth/{*any}', toNodeHandler(auth));
app.get('/', (req: Request, res: Response) => {
    res.send('Server is Live!');
});
app.use('/api/user', userRouter);
app.post('/api/stripe', express.raw({type: 'application/json'}), stripeWebhook);
app.use('/api/project', projectRouter);
const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});