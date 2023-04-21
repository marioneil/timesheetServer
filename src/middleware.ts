import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { auth } from "./firebase";

const prismaClient = new PrismaClient();

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
    req.body.id = decodedToken.uid;
    // get role of the user using uuid

    // put role in request
    // check role
    // check
    next();
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

export const verifyAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //return res.sendStatus(400);

    const result = await prismaClient.user.findFirst({
      where: {
        email: req.body.email,
        role: "ADMIN",
      },
    });
    if (!result) {
      return res.sendStatus(400);
    }

    next();
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};
