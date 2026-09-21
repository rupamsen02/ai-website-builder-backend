import { Request, Response, NextFunction } from "express";
import { auth } from "../lib/auth.js";
import { fromNodeHeaders } from "better-auth/node";

export const authFunction = async (
  req: Request,
  res: Response,
  nextFuction: NextFunction,
) => {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });
    if (!session || !session?.user) {
      return res.status(401).json({ message: "User is not autheticated!" });
    }
    req.userId = session.user.id;
    nextFuction();
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
