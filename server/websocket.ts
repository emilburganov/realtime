import {WebSocket} from "ws";
import {IMessage} from "./models/IMessage";

const websocket = require("ws");

const websocketServer = new websocket.Server({
    port: 5000,
}, () => console.log(`Server started on 5000`));

websocketServer.on("connection", (websocket: WebSocket) => {
    websocket.on("message", (message: IMessage) => {
        const _message = JSON.parse(message.toString());

        switch (_message.event) {
            case "message":
                broadcastMessage(_message);
                break;
            case "connection":
                broadcastMessage(_message);
                break;
        }
    });
});

const broadcastMessage = (message: IMessage) => {
    websocketServer.clients.forEach((client: WebSocket) => {
        client.send(JSON.stringify(message));
    });
};