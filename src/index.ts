import { PrismaClient } from "@prisma/client";
import express from "express";
import cors from "cors";

const app = express();
const port = 5000;
const prismaClient = new PrismaClient();
app.use(cors());
app.get("/", async (req, res) => {
  const result = await prismaClient.toDo.findMany();
  res.send(result);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
