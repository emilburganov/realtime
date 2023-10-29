import {FC, useContext} from "react";
import {MessagesContext, MessagesContextType} from "../context/MessagesContext";
import {IMessage} from "../models/IMessage";
import DestroyButton from "./UI/Button/DestroyButton";
import UserIcon from "./UI/Icon/UserIcon";

interface MessageProps {
    message: IMessage;
}

const Message: FC<MessageProps> = ({message}) => {
    const {messages, setMessages} = useContext<MessagesContextType>(MessagesContext);

    const destroyMessage = () => {
        setMessages([...messages].filter((_message) => _message.id !== message.id));
    };

    return (
        <div className="card flex sb ac g-20">
            <div className="message flex g-20 ac">
                <UserIcon/>
                {message?.event === "connection" ?
                    <p className="message__text">
                        User <span>{message.username}</span> connected!
                    </p>
                    :
                    <p className="message__text">
                        {message.message}
                    </p>
                }
            </div>
            {message?.event === "message" && <DestroyButton onClick={destroyMessage}/>}
        </div>
    );
};

export default Message;