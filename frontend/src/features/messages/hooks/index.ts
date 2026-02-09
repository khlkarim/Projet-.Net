import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { messagesApi } from '../api/messages.api';
import { MessageDto } from '../schemas/messages.schemas';

export const useSendMessage = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: MessageDto) => messagesApi.send(data),
        onSuccess: (data) => {
            // Invalidate conversation query
            queryClient.invalidateQueries({ queryKey: ['messages', 'conversation', data.senderId, data.receiverId] });
            queryClient.invalidateQueries({ queryKey: ['messages', 'conversation', data.receiverId, data.senderId] });
        },
    });
};

export const useConversation = (user1Id: string, user2Id: string) => {
    return useQuery({
        enabled: !!user1Id && !!user2Id,
        queryFn: () => messagesApi.getConversation(user1Id, user2Id),
        queryKey: ['messages', 'conversation', user1Id, user2Id],
    });
};
