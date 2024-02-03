export interface MessageType {
    id: string;
    mine: boolean;
    wrongMessage?: boolean;
    data?: {
        message: string;
        media?: string | undefined;
        createdAt: any;
    } | null;
}