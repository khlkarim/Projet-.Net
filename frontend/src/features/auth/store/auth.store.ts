import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { usersApi } from '~/features/users/api/users.api';
import { User, UserUpdateRequest } from '~/features/users/schemas/users.schemas';

import type { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from '../schemas/auth.schemas';

import { authApi } from '../api/auth.api';
import { useRouter } from 'next/navigation';

export interface AuthActions {
  login: (data: LoginRequest) => Promise<LoginResponse>;
  logout: () => Promise<void>;
  register: (data: RegisterRequest) => Promise<RegisterResponse>;
  setHasHydrated: (state: boolean) => void;
  update: (user: UserUpdateRequest) => void;
}

export interface AuthState {
  hasHydrated?: boolean;
  isAuthenticated: boolean;
  token: null | string;
  user: null | User;
}

export const useAuthStore = create<AuthActions & AuthState>()(
  persist(
    (set, get) => ({
      hasHydrated: false,
      isAuthenticated: false,
      /** Log in the user and update tokens */
      login: async (credentials: LoginRequest): Promise<LoginResponse> => {
        const response = await authApi.login(credentials);
        set({
          isAuthenticated: true,
          token: response.token,
          user: response.user,
        });
        return response;
      },
      /** Log out completely */
      logout: async () => {
        set({
          isAuthenticated: false,
          token: null,
          user: null,
        });
      },

      /** Log in the user and update tokens */
      register: async (credentials: RegisterRequest): Promise<RegisterResponse> => {
        return await authApi.register(credentials);
      },

      setHasHydrated: (state: boolean) => {
        set({
          hasHydrated: state
        });
      },

      token: null,

      /** Update user info */
      update: async (updatedUserRequest: UserUpdateRequest) => {
        const id = get().user?.id;
        if (!id) { return; }
        const response = await usersApi.update(id, updatedUserRequest);
        set({ user: response });
      },

      user: null
    }),
    {
      name: 'auth-storage',
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setHasHydrated(true);
        }
      },
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        token: state.token,
        user: state.user,
      })
    },
  ),
)
