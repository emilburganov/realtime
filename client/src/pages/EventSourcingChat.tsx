import axios from "axios";
import {FC, MouseEvent, useEffect, useState} from "react";
import MessagesList from "../components/MessagesList";
import Navigation from "../components/UI/Navigation/Navigation";
import Button from "../components/UI/Button/Button";
import Input from "../components/UI/Input/Input";
import {API_URL} from "../constants";
import {MessagesContext} from "../context/MessagesContext";
import {IMessage} from "../models/IMessage";

const EventSourcingChat: FC = () => {
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [message, setMessage] = useState<string>("");

    useEffect(() => {
        subscribe();
    }, []);

    /**
     * Subscribe on Event Sourcing
     * @returns {Promise<void>}
     */
    const subscribe = async (): Promise<void> => {
        const eventSource = new EventSource(API_URL + "/messages");

        eventSource.onmessage = (event) => {
            const messages = JSON.parse(event.data);
            setMessages((prevMessages) => [messages, ...prevMessages]);
        };
    };

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

        await axios.post(API_URL + "/messages", {
            id: Date.now(),
            message,
        });
    };

    return (
        <MessagesContext.Provider value={{messages, setMessages}}>
            <div className="center">
                <div className="flex col g-20 w-600">
                    <Navigation/>
                    <form className="card form">
                        <h3>Realtime Chat (EventSourcing)</h3>
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

export default EventSourcingChat;