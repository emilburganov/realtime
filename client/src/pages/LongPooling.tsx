import axios from "axios";
import {useEffect, useState} from "react";
import {API_URL} from "../constants";
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
                subscribe()
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

        await axios.post(API_URL + "/messages", {
            id: Date.now(),
            messageValue,
        });
    };

    return (
        <div className="center">
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
            <div className="list">
                {messages.map((message: IMessage) =>
                    <div className="card">{message.message}</div>,
                )}
            </div>
        </div>
    );
};

export default LongPooling;