import { create } from 'zustand';
import { authApi } from '../api/auth.api';
import { persist } from 'zustand/middleware';
import { usersApi } from '~/features/users/api/users.api';
import { User, UserUpdateRequest } from '~/features/users/schemas/users.schemas';
import type { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from '../schemas/auth.schemas';

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  hasHydrated?: boolean;
}

export interface AuthActions {
  login: (data: LoginRequest) => Promise<LoginResponse>;
  register: (data: RegisterRequest) => Promise<RegisterResponse>;
  logout: () => Promise<void>;
  update: (user: User) => void;
  setHasHydrated: (state: boolean) => void;
}

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      hasHydrated: false,

      /** Log in the user and update tokens */
      login: async (credentials: LoginRequest): Promise<LoginResponse> => {
        const response = await authApi.login(credentials);
        set({
          user: response.user,
          token: response.token,
          isAuthenticated: true,
        });
        return response;
      },

      /** Log in the user and update tokens */
      register: async (credentials: RegisterRequest): Promise<RegisterResponse> => {
        return await authApi.register(credentials);
      },

      /** Log out completely */
      logout: async () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },

      /** Update user info */
      update: async (updatedUserRequest: UserUpdateRequest) => {
        const id = get().user?.id;
        if (!id) { return; }
        const response = await usersApi.update(id, updatedUserRequest);
        set({ user: response });
      },

      setHasHydrated: (state: boolean) => {
        set({
          hasHydrated: state
        });
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setHasHydrated(true);
        }
      }
    },
  ),
)
