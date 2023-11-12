
export interface UserInterface {
    name: string;
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
    updatedAt: string;
}

export interface OnlineUser {
    userId: string, 
    soketId: string
}
