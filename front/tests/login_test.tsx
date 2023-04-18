// Import des modules nécessaires
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { useRouter } from 'next/router';
import LoginPage from '../src/pages/login';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';

// Création d'un mock axios pour simuler les appels à l'API
const mockAxios = new MockAdapter(axios);

describe('LoginPage', () => {
  // Création d'un mock useRouter pour simuler le routage de Next.js
  jest.mock('next/router', () => ({
    useRouter: jest.fn(),
  }));
  const mockRouter = {
    push: jest.fn(),
  };
  (useRouter as jest.Mock).mockReturnValue(mockRouter);

  afterEach(() => {
    jest.resetAllMocks();
    mockAxios.reset();
  });

  it('affiche le formulaire de connexion', () => {
    // Rendu de la page de connexion
    render(<LoginPage />);

    // Vérification que le formulaire de connexion est affiché
    expect(screen.getByLabelText('Adresse e-mail'));
    expect(screen.getByLabelText('Mot de passe'));
    expect(screen.getByRole('button', { name: 'login' })).toBeInTheDocument();
  });

  it('soumet le formulaire de connexion avec des informations valides', async () => {
    // Configuration du mock axios pour simuler une réponse d'authentification réussie
    mockAxios.onPost('/api/login').reply(200, { success: true });

    // Rendu de la page de connexion
    render(<LoginPage />);

    // Remplissage des champs de formulaire
    const emailInput = screen.getByLabelText('Adresse e-mail');
    const passwordInput = screen.getByLabelText('Mot de passe');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });

    // Soumission du formulaire
    const submitButton = screen.getByRole('button', { name: 'login' });
    fireEvent.click(submitButton);

    // Vérification que l'appel à l'API a été effectué avec les informations de connexion fournies
    await waitFor(() => {
      expect(mockAxios.history.post[0].data).toEqual(JSON.stringify({ email: 'test@example.com', password: 'testpassword' }));
    });

    // Vérification que l'utilisateur est redirigé vers la page de voyages planifiés
    expect(mockRouter.push).toHaveBeenCalledWith('/trips');
  });

  it('affiche une erreur si les informations de connexion sont incorrectes', async () => {
    // Configuration du mock axios pour simuler une réponse d'authentification échouée
    mockAxios.onPost('/api/login').reply(401, { error: 'Identifiants de connexion invalides' });

    // Rendu de la page de connexion
    render(<LoginPage />);

    // Remplissage des champs de formulaire
    const emailInput = screen.getByLabelText('Adresse e-mail');
    const passwordInput = screen.getByLabelText('Mot de passe');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
    fireEvent.click(submitButton);

    // Vérification que l'appel à l'API a été effectué avec les informations de connexion fournies
    await waitFor(() => {
      expect(mockAxios.history.post[0].data).toEqual(JSON.stringify({ email: 'test@example.com', password: 'testpassword' }));
    });

    // Vérification que l'erreur est affichée
    const errorMessage = await screen.findByText('Identifiants de connexion invalides');
    expect(errorMessage).toBeInTheDocument();

    // Vérification que l'utilisateur n'est pas redirigé
    expect(mockRouter.push).not.toHaveBeenCalled();
  });
});

function afterEach(arg0: () => void) {
    throw new Error('Function not implemented.');
}


function expect(arg0: any) {
    throw new Error('Function not implemented.');
}
