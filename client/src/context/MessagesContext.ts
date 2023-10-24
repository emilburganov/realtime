import {createContext, Dispatch, SetStateAction} from "react";
import {IMessage} from "../models/IMessage";

export interface MessagesContextType {
    messages: IMessage[];
    setMessages: Dispatch<SetStateAction<IMessage[]>>;
}

export const MessagesContext = createContext<MessagesContextType>({
    messages: [],
    setMessages: () => {}
});