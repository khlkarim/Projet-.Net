import axiosInstance from '~/lib/axios';

import { Message, MessageDto } from '../schemas/messages.schemas';

export const messagesApi = {
    getConversation: async (user1Id: string, user2Id: string): Promise<Message[]> => {
        const response = await axiosInstance.get<Message[]>(`/messages/conversation?user1Id=${user1Id}&user2Id=${user2Id}`);
        return response.data;
    },

    send: async (data: MessageDto): Promise<Message> => {
        const response = await axiosInstance.post<Message>('/messages', data);
        return response.data;
    },
};
