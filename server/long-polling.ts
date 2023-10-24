const express = require("express");
const cors = require("cors");
const events = require("events");

import {Application, json, Request, Response} from "express";

const PORT = 5000;

const app: Application = express();
const emitter = new events.EventEmitter();

app.use(cors());
app.use(express.json())

app.get("/messages", (req: Request, res: Response) => {
    emitter.once("newMessage", (message: string) => {
        res.json(message);
    });
});

app.post("/messages", (req: Request, res: Response) => {
    const message = req.body;

    emitter.emit("newMessage", message);
    res.status(200);
});

app.listen(PORT, () => {
    console.log(`Server started at ${PORT} port`);
});