import {useContext} from "react";
import {MessagesContext} from "../context/MessagesContext";
import {IMessage} from "../models/IMessage";
import Message from "./Message";

const MessagesList = () => {
    const {messages} = useContext(MessagesContext);

    return (
        <div className="list">
            {messages.map((message: IMessage) =>
                <Message key={message.id} message={message}/>,
            )}
        </div>
    );
};

export default MessagesList;