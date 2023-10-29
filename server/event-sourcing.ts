const express = require("express");
const cors = require("cors");
const events = require("events");

import {Application, Request, Response} from "express";

const PORT = 5000;

const app: Application = express();
const emitter = new events.EventEmitter();

app.use(cors());
app.use(express.json());

app.get("/messages", (req: Request, res: Response) => {
    res.writeHead(200, {
        "Connection": "keep-alive",
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
    });

    emitter.on("newMessage", (message: string) => {
        res.write(`data: ${JSON.stringify(message)} \n\n`);
    });
});

app.post("/messages", (req: Request, res: Response) => {
    const message = req.body;

    emitter.emit("newMessage", message);
    res.status(200);
    res.end();
});

app.listen(PORT, () => {
    console.log(`Server started at ${PORT} port`);
});