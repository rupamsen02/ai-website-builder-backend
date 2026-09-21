import { auth } from "../lib/auth.js";
import { fromNodeHeaders } from "better-auth/node";
export const authFunction = async (req, res, nextFuction) => {
    try {
        const session = await auth.api.getSession({
            headers: fromNodeHeaders(req.headers),
        });
        if (!session || !session?.user) {
            return res.status(401).json({ message: "User is not autheticated!" });
        }
        req.userId = session.user.id;
        nextFuction();
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};
