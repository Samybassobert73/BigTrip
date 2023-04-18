import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { RouterContext } from 'next/dist/next-server/lib/router-context';
import RegisterPage from './register';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// Mock axios
const mockAxios = new MockAdapter(axios);

describe('Register page', () => {
  it('should render the registration form', () => {
    // Render the Register page
    const mockRouter = { push: jest.fn() };
    render(
      <RouterContext.Provider value={{ push: mockRouter.push } as any}>
        <RegisterPage />
      </RouterContext.Provider>
    );

    // Check that the registration form is displayed
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Mot de passe');
    const confirmPasswordInput = screen.getByLabelText('Confirmez le mot de passe');
    const registerButton = screen.getByRole('button', { name: 'S\'inscrire' });
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(confirmPasswordInput).toBeInTheDocument();
    expect(registerButton).toBeInTheDocument();
  });

  it('should register a new user and redirect to the travel planner page', async () => {
    // Configure axios to simulate a successful registration
    mockAxios.onPost('/register').reply(201, {});

    // Render the Register page
    const mockRouter = { push: jest.fn() };
    render(
      <RouterContext.Provider value={{ push: mockRouter.push } as any}>
        <RegisterPage />
      </RouterContext.Provider>
    );

    // Fill out and submit the registration form
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Mot de passe');
    const confirmPasswordInput = screen.getByLabelText('Confirmez le mot de passe');
    const registerButton = screen.getByRole('button', { name: 'S\'inscrire' });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'testpassword' } });
    fireEvent.click(registerButton);

    // Check that the API call was made with the correct information
    await waitFor(() => {
      expect(mockAxios.history.post[0].data).toEqual(JSON.stringify({ email: 'test@example.com', password: 'testpassword' }));
    });

    // Check that the user was redirected to the travel planner page
    expect(mockRouter.push).toHaveBeenCalledWith('/travel-planner');
  });

  it('should display an error message if registration fails', async () => {
    // Configure axios to simulate a failed registration
    mockAxios.onPost('/register').reply(400, { message: 'Email already exists' });

    // Render the Register page
    const mockRouter = { push: jest.fn() };
    render(
      <RouterContext.Provider value={{ push: mockRouter.push } as any}>
        <RegisterPage />
      </RouterContext.Provider>
    );

    // Fill out and submit the registration form
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Mot de passe');
    const confirmPasswordInput = screen.getByLabelText('Confirmez le mot de passe');
    const registerButton = screen.getByRole('button', { name: 'S\'inscrire' });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'testpassword' } });
    fireEvent.click(registerButton);

    // Check that an error message is displayed
    const errorMessage = await screen.findByText('Email already exists');
    expect(errorMessage).toBeInTheDocument();
  });
});