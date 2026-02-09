import { usersApi } from '~/features/users/api/users.api';
import { LoginResponse, UserDto } from '~/features/users/schemas/users.schemas';
import axiosInstance from '~/lib/axios';

import {
    DisableTwoFactorRequest,
    EnableTwoFactorRequest,
    EnableTwoFactorResponse,
    LoginSocialRequest,
    VerifyTwoFactorRequest,
} from '../schemas/auth.schemas';

export const authApi = {
    disableTwoFactor: async (data: DisableTwoFactorRequest): Promise<void> => {
        console.log("Mock: Disabling 2FA with password", data.password);
        // In a real app, this would hit /auth/2fa/disable endpoint
        return Promise.resolve();
    },

    // Placeholder for two-factor authentication endpoints
    enableTwoFactor: async (data: EnableTwoFactorRequest): Promise<EnableTwoFactorResponse> => {
        console.log("Mock: Enabling 2FA with password", data.password);
        // In a real app, this would hit /auth/2fa/enable endpoint
        return Promise.resolve({
            backupCodes: ["CODE1", "CODE2", "CODE3"],
            totpURI: "otpauth://totp/VehiclePlatform?secret=JBSWY3DPEHPK3PXP", // Example URI
        });
    },

    signInEmail: async (email: string, password: string): Promise<LoginResponse> => {
        // Calls the usersApi.login, which interacts with the ASP.NET backend
        return usersApi.login(email, password);
    },

    signInSocial: async (data: LoginSocialRequest): Promise<LoginResponse> => {
        // Mock social login for now, as backend doesn't have explicit social auth endpoints
        console.log(`Attempting social login with ${data.provider}`);
        // In a real app, this would hit a backend endpoint that handles OAuth
        // e.g., /auth/login/github
        return Promise.resolve({ token: `mock-social-token-${data.provider}` });
    },

    signOut: async (): Promise<void> => {
        console.log("Mock: Signing out");
        // In a real app, this might invalidate a token on the backend or clear session
        return Promise.resolve();
    },

    signUpEmail: async (data: UserDto): Promise<void> => {
        // Calls the usersApi.register, which interacts with the ASP.NET backend
        await usersApi.register(data);
    },

    verifyBackupCode: async (data: VerifyTwoFactorRequest): Promise<LoginResponse> => {
        console.log("Mock: Verifying backup code", data.code);
        // In a real app, this would hit /auth/2fa/verify/backup endpoint
        return Promise.resolve({ token: "mock-verified-backup-token" });
    },

    verifyTotp: async (data: VerifyTwoFactorRequest): Promise<LoginResponse> => {
        console.log("Mock: Verifying TOTP code", data.code);
        // In a real app, this would hit /auth/2fa/verify/totp endpoint
        return Promise.resolve({ token: "mock-verified-totp-token" });
    },
};
