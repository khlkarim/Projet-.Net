import { useMutation, useQueryClient } from '@tanstack/react-query';

import { LoginResponse, UserDto } from '~/features/users/schemas/users.schemas';

import { authApi } from '../api/auth.api';
import {
    DisableTwoFactorRequest,
    EnableTwoFactorRequest,
    LoginSocialRequest,
    VerifyTwoFactorRequest,
} from '../schemas/auth.schemas';

// --- Authentication Hooks ---

export const useSignInEmail = () => {
    return useMutation({
        mutationFn: ({ email, password }: { email: string; password: string }) =>
            authApi.signInEmail(email, password),
        onSuccess: (data: LoginResponse) => {
            // TODO: Handle successful login, e.g., store token, redirect
            console.log("Login successful, token:", data.token);
            // Invalidate any user-specific queries if necessary
        },
    });
};

export const useSignUpEmail = () => {
    return useMutation({
        mutationFn: (data: UserDto) => authApi.signUpEmail(data),
        onSuccess: () => {
            // TODO: Handle successful sign-up, e.g., redirect to login
            console.log("Sign-up successful");
        },
    });
};

export const useSignInSocial = () => {
    return useMutation({
        mutationFn: (data: LoginSocialRequest) => authApi.signInSocial(data),
        onSuccess: (data: LoginResponse) => {
            console.log("Social login successful, token:", data.token);
            // Invalidate any user-specific queries if necessary
        },
    });
};

export const useSignOut = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => authApi.signOut(),
        onSuccess: () => {
            console.log("Sign out successful");
            // Clear all queries related to the user and redirect
            queryClient.clear();
            // TODO: Clear any stored tokens or user data
        },
    });
};

// --- Two-Factor Authentication Hooks ---

export const useEnableTwoFactor = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: EnableTwoFactorRequest) => authApi.enableTwoFactor(data),
        onSuccess: () => {
            console.log("2FA enabled");
            queryClient.invalidateQueries({ queryKey: ['users', 'current'] }); // Invalidate current user data
        },
    });
};

export const useDisableTwoFactor = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: DisableTwoFactorRequest) => authApi.disableTwoFactor(data),
        onSuccess: () => {
            console.log("2FA disabled");
            queryClient.invalidateQueries({ queryKey: ['users', 'current'] });
        },
    });
};

export const useVerifyTotp = () => {
    return useMutation({
        mutationFn: (data: VerifyTwoFactorRequest) => authApi.verifyTotp(data),
        onSuccess: (data: LoginResponse) => {
            console.log("TOTP verified, token:", data.token);
            // Handle successful verification, e.g., store token, redirect
        },
    });
};

export const useVerifyBackupCode = () => {
    return useMutation({
        mutationFn: (data: VerifyTwoFactorRequest) => authApi.verifyBackupCode(data),
        onSuccess: (data: LoginResponse) => {
            console.log("Backup code verified, token:", data.token);
            // Handle successful verification, e.g., store token, redirect
        },
    });
};
