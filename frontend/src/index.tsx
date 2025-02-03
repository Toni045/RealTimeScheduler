import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';

const domain = process.env.REACT_APP_AUTH0_DOMAIN!;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID!;

const onRedirectCallback = (appState?: any) => {
    // Redirect to `appState.returnTo` or default to the root `/`
    window.history.replaceState({}, document.title, appState?.returnTo || '/');
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <Auth0Provider
        domain={domain}
        clientId={clientId}
        authorizationParams={{
            redirect_uri: 'http://localhost:3000',
            audience: 'http://localhost:8080/api',
            scope: "read:messages write:messages"
        }}
        useRefreshTokens={true}
        cacheLocation="localstorage"
        onRedirectCallback={onRedirectCallback}
    >
        <Router>
            <App />
        </Router>
    </Auth0Provider>
);
