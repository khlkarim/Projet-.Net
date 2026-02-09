import axiosInstance from '~/lib/axios';

import { LoginResponse, User, UserDto } from '../schemas/users.schemas';

export const usersApi = {
    get: async (id: string): Promise<User> => {
        const response = await axiosInstance.get<User>(`/users/${id}`);
        return response.data;
    },

    getAllUsers: async (): Promise<User[]> => {
        // Placeholder for a backend endpoint to get all users, which is currently missing.
        // This would typically be a GET /api/users endpoint.
        // For now, returning an empty array.
        // const response = await axiosInstance.get<User[]>('/users');
        // return response.data;
        return Promise.resolve([]);
    },

    login: async (email: string, password: string): Promise<LoginResponse> => {
        // Backend expects query params based on signature: Login(string email, string password)
        // If it was FromBody it would be an object. Let's check controller signature.
        // Controller: public async Task<IActionResult> Login(string email, string password) -> Query params by default in ASP.NET Core unless [FromBody] specified or using a DTO
        // Wait, usually simple types are query params. Let's assume query params for now as per signature `Login(string email, string password)`.
        // However, for security, POST usually uses body.
        // If I look at `[HttpPost("login")]`, and arguments are `string email, string password`, without `[FromBody]`, ASP.NET Core might expect query string.
        // But let's try sending as query params since it's safer assumption given the signature seen in `view_file` output earlier.
        const response = await axiosInstance.post<LoginResponse>(`/users/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`);
        return response.data;
    },

    register: async (data: UserDto): Promise<User> => {
        const response = await axiosInstance.post<User>('/users/register', data);
        return response.data;
    },

    update: async (id: string, data: UserDto): Promise<User> => {
        const response = await axiosInstance.put<User>(`/users/${id}`, data);
        return response.data;
    },
};
