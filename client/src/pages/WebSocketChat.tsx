import {FC, MouseEvent, useRef, useState} from "react";
import MessagesList from "../components/MessagesList";
import Button from "../components/UI/Button/Button";
import Input from "../components/UI/Input/Input";
import Navigation from "../components/UI/Navigation/Navigation";
import {MessagesContext} from "../context/MessagesContext";
import {IMessage} from "../models/IMessage";

const WebSocketChat: FC = () => {
    const socket = useRef<WebSocket | null>(null);
    const [connected, setConnected] = useState<boolean>(false);

    const [username, setUsername] = useState<string>("");
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [message, setMessage] = useState<string>("");

    const connect = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        socket.current = new WebSocket("ws://localhost:5000");

        if (socket.current instanceof WebSocket) {
            socket.current.onopen = () => {
                setConnected(true);

                socket.current!.send(JSON.stringify({
                    id: Date.now(),
                    event: "connection",
                    username,
                }));

                console.log("Socket is connected :)");
            };

            socket.current.onmessage = (event: MessageEvent) => {
                const message = JSON.parse(event.data);
                setMessages((prevMessages) => [message, ...prevMessages]);
            };

            socket.current.onclose = () => {
                console.log("Socket is closed :(");
            };

            socket.current.onerror = () => {
                console.log("Socket error :(");
            };
        }
    };

    if (!connected) {
        return (
            <div className="center">
                <div className="flex col g-20 w-600">
                    <Navigation/>
                    <form className="card form">
                        <h3>Log in Realtime Chat (Websocket)</h3>
                        <Input
                            label="Username"
                            value={username}
                            setValue={setUsername}
                        />
                        <Button
                            onClick={(event: MouseEvent<HTMLButtonElement>) => connect(event)}
                            type="submit"
                        >
                            Login
                        </Button>
                    </form>
                    <MessagesList/>
                </div>
            </div>
        );
    }

    /**
     * Send message method
     * @returns {Promise<void>}
     */
    const sendMessage = async (event: MouseEvent<HTMLButtonElement>): Promise<void> => {
        event.preventDefault();

        if (message === "") {
            return;
        }

        setMessage("");

        socket.current!.send(JSON.stringify({
            id: Date.now(),
            event: "message",
            username,
            message,
        }));
    };

    return (
        <MessagesContext.Provider value={{messages, setMessages}}>
            <div className="center">
                <div className="flex col g-20 w-600">
                    <Navigation/>
                    <form className="card form">
                        <h3>Realtime Chat Form (WebSocket)</h3>
                        <Input
                            label="Message"
                            value={message}
                            setValue={setMessage}
                        />
                        <Button
                            onClick={(event: MouseEvent<HTMLButtonElement>) => sendMessage(event)}
                            type="submit"
                        >
                            Send Message
                        </Button>
                    </form>
                    <MessagesList/>
                </div>
            </div>
        </MessagesContext.Provider>
    );
};

export default WebSocketChat;