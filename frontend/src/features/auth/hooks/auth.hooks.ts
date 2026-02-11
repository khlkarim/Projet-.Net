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
        onError: () => {
            toast.error("Failed to login.");
        },
        onSuccess: () => {
            toast.success("Login successful.");
        },
    });
};

export const useRegister = () => {
    const { register } = useAuthStore();

    return useMutation<RegisterResponse, unknown, RegisterRequest>({
        mutationFn: (request) => register(request),
        onError: () => {
            toast.error("Failed to register.");
        },
        onSuccess: () => {
            toast.success("Registered successfully.");
        },
    });
};

export const useLogout = () => {
    const { logout } = useAuthStore();
    return {
        mutate: logout,
        mutateAsync: async () => logout
    }
}

