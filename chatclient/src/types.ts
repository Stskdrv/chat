
export interface UserInterface {
    username: string;
    token: string;
    message: string;
    id: string;
}

export interface ConversationInterface {
    _id: string;
    members: string[];
    createdAt: string;
    updatesAt: string;
}

export interface MessageInterface {
    _id: string;
    conversationId: string;
    sender: string;
    text: string;
    createdAt: string;
    updatesAt: string;
}

