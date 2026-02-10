import { useMutation } from '@tanstack/react-query';

import { toast } from 'sonner';
import {
    LoginRequest,
    LoginResponse,
    RegisterRequest,
    RegisterResponse,
} from '../schemas/auth.schemas';
import { useAuthStore } from '../store/auth.store';

export const useLogin = () => {
    const { login } = useAuthStore();

    return useMutation<LoginResponse, unknown, LoginRequest>({
        mutationFn: (request) => login(request),
        onSuccess: () => {
            toast.success("Login successful.");
        },
        onError: () => {
            toast.error("Failed to login.");
        },
    });
};

export const useRegister = () => {
    const { register } = useAuthStore();

    return useMutation<RegisterResponse, unknown, RegisterRequest>({
        mutationFn: (request) => register(request),
        onSuccess: () => {
            toast.success("Registered successfully.");
        },
        onError: () => {
            toast.error("Failed to register.");
        },
    });
};

