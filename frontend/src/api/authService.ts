import { Auth0ContextInterface, User, withAuthenticationRequired } from '@auth0/auth0-react';

let auth0Client: Auth0ContextInterface<User> | null = null;

export const setAuth0Client = (client: Auth0ContextInterface<User>) => {
    auth0Client = client;
};

export const getToken = async (): Promise<string | null> => {
    if (!auth0Client) {
        console.error('Auth0 Client is not initialized');
        return null;
    }
    try {
        return await auth0Client.getAccessTokenSilently();
    } catch (error) {
        console.error('Error getting token:', error);
        return null;
    }
};
