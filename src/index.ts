import { PrismaClient } from "@prisma/client";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { verifyUser } from "./middleware";

const app = express();
const port = 5000;
const prismaClient = new PrismaClient();
app.use(express.json());

const middleware = (req: Request, res: Response, next: NextFunction) => {
  const x: Number = 1;
  console.log("In middleware");
  // console.log(req.headers);
  if (req.headers.token !== "") {
    next();
  } else {
    res.sendStatus(400);
  }
};

app.use(cors());

app.use(middleware);
app.use(verifyUser);

app.get("/", async (req, res) => {
  const result = await prismaClient.toDo.findMany({
    where: { email: req.body.email },
  });
  res.send(result);
});

app.post("/isAdmin", async (req, res) => {
  const result = await prismaClient.user.findFirst({
    where: {
      email: req.body.email,
      role: "ADMIN",
    },
  });
  if (!result) {
    return res.send({
      admin: false,
    });
  }

  return res.send({
    admin: true,
  });
});

app.post("/signup", async (req, res) => {
  console.log("🚀 ~ file: index.ts:33 ~ app.post ~ req:", req.body);
  //console.log("req.body" + req.body);

  const user = await prismaClient.user.findUnique({
    where: {
      email: req.body.email,
    },
  });
  if (!user) {
    const result = await prismaClient.user.create({
      data: {
        id: req.body.id,
        email: req.body.email,
      },
    });
  }

  res.sendStatus(200);
});

app.post("/create", async (req, res) => {
  console.log("🚀 ~ file: index.ts:33 ~ app.post ~ req:", req.body);
  //console.log("req.body" + req.body);

  const result = await prismaClient.toDo.create({
    data: {
      title: req.body.title,
      email: req.body.email,
    },
  });
  res.send(result);
});

app.put("/update/title", async (req, res) => {
  console.log(req.body);
  const result = await prismaClient.toDo.update({
    where: {
      id: req.body.id,
    },
    data: {
      title: req.body.title,
    },
  });
  res.send(result);
});

app.put("/update/duration", async (req, res) => {
  console.log(req.body);
  const result = await prismaClient.toDo.update({
    where: {
      id: req.body.id,
    },
    data: {
      timespan: req.body.duration,
    },
  });
  res.send(result);
});

app.delete("/:id", async (req, res) => {
  const result = await prismaClient.toDo.delete({
    where: {
      id: Number(req.params.id),
    },
  });
  res.send(result);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
