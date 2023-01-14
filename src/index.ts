import { PrismaClient } from "@prisma/client";
import express, { request } from "express";
import cors from "cors";

const app = express();
const port = 5000;
const prismaClient = new PrismaClient();
app.use(express.json());

app.use(cors());
app.get("/", async (req, res) => {
  const result = await prismaClient.toDo.findMany();
  res.send(result);
});

app.post("/create", async (req, res) => {
  console.log(req.body);
  const result = await prismaClient.toDo.create({
    data: {
      title: req.body.title,
    },
  });
  res.send(result);
});

app.post("/update", async (req, res) => {
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
