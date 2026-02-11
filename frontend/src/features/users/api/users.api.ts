import axiosInstance from '~/lib/axios';

import {
    User,
    userResponseSchema,
    UserUpdateRequest,
    userUpdateRequestSchema
} from '../schemas/users.schemas';

export const usersApi = {
    async delete(id: string): Promise<void> {
        await axiosInstance.delete(`/api/Users/${id}`);
    },

    async getUserById(id: string): Promise<User> {
        const response = await axiosInstance.get(`/api/Users/${id}`);
        return userResponseSchema.parse(response.data);
    },

    async getUsers(): Promise<User[]> {
        const response = await axiosInstance.get('/api/Users');

        return response.data.map((user: unknown) =>
            userResponseSchema.parse(user)
        );
    },

    async update(
        id: string,
        payload: UserUpdateRequest
    ): Promise<User> {
        const validatedPayload = userUpdateRequestSchema.parse(payload);

        const response = await axiosInstance.put(
            `/api/Users/${id}`,
            validatedPayload
        );

        return userResponseSchema.parse(response.data);
    }
};

