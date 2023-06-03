"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const middleware_1 = require("./middleware");
const app = (0, express_1.default)();
const port = 5000;
const prismaClient = new client_1.PrismaClient();
app.use(express_1.default.json());
const middleware = (req, res, next) => {
    const x = 1;
    console.log("In middleware");
    // console.log(req.headers);
    if (req.headers.token !== "") {
        next();
    }
    else {
        res.sendStatus(400);
    }
};
app.use((0, cors_1.default)());
app.use(middleware);
app.use(middleware_1.verifyUser);
app.get("/", async (req, res) => {
    const result = await prismaClient.toDo.findMany({
        where: { email: req.body.email },
    });
    res.send(result);
});
app.get("/users", middleware_1.verifyAdmin, async (req, res, next) => {
    const result = await prismaClient.user.findMany();
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
app.put("/update/user", middleware_1.verifyAdmin, async (req, res) => {
    console.log("🚀 ~ file: index.ts:127 ~ app.put ~ req:", req.body);
    const result = await prismaClient.user.update({
        where: {
            id: req.body.userId,
        },
        data: {
            role: req.body.userRole,
        },
    });
    res.send(result);
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
//# sourceMappingURL=index.js.map