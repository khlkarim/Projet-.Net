import axiosInstance from '~/lib/axios';

import {
    LoginRequest,
    LoginResponse,
    RegisterRequest,
    RegisterResponse,
    loginRequestSchema,
    loginResponseSchema,
    registerRequestSchema,
    registerResponseSchema
} from '../schemas/auth.schemas';

export const authApi = {
    login: async (request: LoginRequest): Promise<LoginResponse> => {
        loginRequestSchema.parse(request);
        const res = await axiosInstance.post('/api/auth/login', request);
        return loginResponseSchema.parse(res.data);
    },

    register: async (request: RegisterRequest): Promise<RegisterResponse> => {
        registerRequestSchema.parse(request);
        const res = await axiosInstance.post('/api/auth/register', request);
        return registerResponseSchema.parse(res.data);
    }
};
