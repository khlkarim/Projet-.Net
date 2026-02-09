// Stub auth client to maintain compatibility with existing components
// In a real implementation, this would integrate with your .NET API's auth endpoints

export interface User {
    email: string;
    id: string;
    image?: null | string;
    name?: null | string;
}

export const useCurrentUser = () => {
    return {
        isPending: false,
        session: null,
        user: null as null | User,
    };
};
