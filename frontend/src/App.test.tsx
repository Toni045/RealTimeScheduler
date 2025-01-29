import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';

test('renders login button', () => {
  render(
      <Auth0Provider
          domain="test-domain"
  clientId="test-client-id"
  authorizationParams={{ redirect_uri: 'http://localhost:3000' }}
>
  <App />
  </Auth0Provider>
);
  const loginButton = screen.getByText(/Log In/i);
  expect(loginButton).toBeInTheDocument();
});
