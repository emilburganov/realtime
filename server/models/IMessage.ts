export interface IMessage {
    id: number;
    event?: string,
    date?: string,
    username?: string,
    message: string;
}