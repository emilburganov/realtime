import axios from "axios";
import {useEffect, useState} from "react";
import MessagesList from "../components/MessagesList";
import {API_URL} from "../constants";
import {MessagesContext} from "../context/MessagesContext";
import {IMessage} from "../models/IMessage";

const LongPooling = () => {
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [messageValue, setMessageValue] = useState<string>("");

    useEffect(() => {
        subscribe();
    }, []);

    /**
     * Subscribe on Long Polling
     * @returns {Promise<void>}
     */
    const subscribe = async () => {
        try {
            const {data} = await axios.get(API_URL + "/messages");
            setMessages((prevState) => [data, ...prevState]);
            await subscribe();
        } catch {
            setTimeout(() => {
                subscribe();
            }, 500);
        }
    };

    /**
     * Message input change handle (data binding)
     * @param event
     */
    const handleMessageChange = (event) => {
        setMessageValue(event.target.value);
    };

    /**
     * Send message method
     * @returns {Promise<void>}
     */
    const sendMessage = async (event) => {
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
                        <div className="input-group">
                            <label>Message</label>
                            <input
                                value={messageValue}
                                onChange={handleMessageChange}
                                className="input"
                                type="text"
                            />
                        </div>
                        <button
                            onClick={sendMessage}
                            className="button"
                            type="submit"
                        >
                            Send Message
                        </button>
                    </form>
                    <MessagesList/>
                </div>
            </div>
        </MessagesContext.Provider>
    );
};

export default LongPooling;