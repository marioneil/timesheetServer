import { Request, Response, NextFunction } from "express";
import { auth } from "./firebase";

export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.token as string;
    if (!token) {
      return res.sendStatus(400);
    }
    const decodedToken = await auth.verifyIdToken(token);
    req.body.email = decodedToken.email;
    next();
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};
