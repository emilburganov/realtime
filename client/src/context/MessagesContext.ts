import {createContext} from 'react';
import {IMessage} from "../models/IMessage";

interface MessagesContextType {
    messages: IMessage[];
    setMessages: void;
}

export const MessagesContext = createContext<MessagesContextType | null>(null);