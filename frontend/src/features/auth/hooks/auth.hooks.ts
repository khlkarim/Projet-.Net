import { useMutation, useQueryClient } from '@tanstack/react-query';

import { authApi } from '../api/auth.api';
import {
    LoginRequest,
    LoginResponse,
    RegisterRequest,
    RegisterResponse,
} from '../schemas/auth.schemas';
import { toast } from 'sonner';

export const useLogin = () => {
    return useMutation<LoginResponse, unknown, LoginRequest>({
        mutationFn: (request) => authApi.login(request),
        onSuccess: () => {
            console.log("TODO: register the user in the store.");
            toast.success("Login successful.");
        },
        onError: () => {
            toast.error("Failed to login.");
        },
    });
};

export const useRegister = () => {
    return useMutation<RegisterResponse, unknown, RegisterRequest>({
        mutationFn: (request) => authApi.register(request),
        onSuccess: () => {
            console.log("TODO: redirect the user to the login page.");
            toast.success("Registered successfully.");
        },
        onError: () => {
            toast.error("Failed to register.");
        },
    });
};

