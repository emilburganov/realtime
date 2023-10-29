import axios from "axios";
import {FC, MouseEvent, useEffect, useState} from "react";
import MessagesList from "../components/MessagesList";
import Button from "../components/UI/Button/Button";
import Input from "../components/UI/Input/Input";
import {API_URL} from "../constants";
import {MessagesContext} from "../context/MessagesContext";
import {IMessage} from "../models/IMessage";

const LongPooling: FC = () => {
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [messageValue, setMessageValue] = useState<string>("");

    useEffect(() => {
        subscribe();
    }, []);

    /**
     * Subscribe on Long Polling
     * @returns {Promise<void>}
     */
    const subscribe = async (): Promise<void> => {
        try {
            const {data} = await axios.get<IMessage>(API_URL + "/messages");
            setMessages((prevMessages) => [data, ...prevMessages]);
            await subscribe();
        } catch {
            setTimeout(() => {
                subscribe();
            }, 500);
        }
    };

    /**
     * Send message method
     * @returns {Promise<void>}
     */
    const sendMessage = async (event: MouseEvent<HTMLButtonElement>): Promise<void> => {
        event.preventDefault();

        if (messageValue === "") {
            return;
        }

        setMessageValue("");

        await axios.post(API_URL + "/messages", {
            id: Date.now(),
            message: messageValue,
        });
    };

    return (
        <MessagesContext.Provider value={{messages, setMessages}}>
            <div className="center">
                <div className="flex col g-20 w-600">
                    <form className="card form">
                        <h3>Realtime Chat Form</h3>
                        <Input
                            label="Message"
                            value={messageValue}
                            setValue={setMessageValue}
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

export default LongPooling;