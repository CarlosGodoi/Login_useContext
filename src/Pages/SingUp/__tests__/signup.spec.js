import React from 'react';
import SignUp from '..';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import useAuth from '../../../Hooks/useAuth';
import { act } from 'react-dom/test-utils';

const mockedUseNAvigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUseNAvigate,
}));

jest.mock('../../../Hooks/useAuth');

const Signup = { useAuth };
const STATE_SPY = jest.spyOn(Signup, 'useAuth');

describe('Signup', () => {
  it('should render Signup component', () => {
    STATE_SPY.mockReturnValue({
      signup: () => undefined,
    });
    render(<SignUp />, { wrapper: MemoryRouter });

    expect(screen.getByTestId('signup')).toBeInTheDocument();
  });
});

describe('Test to verify that all data is required in the fields', () => {
  it('should verify that all fields have been filled', async () => {
    STATE_SPY.mockReturnValue({
      signup: () => undefined,
    });

    render(<SignUp />, { wrapper: MemoryRouter });

    fireEvent.click(screen.getByTestId('Inscrever-se'));

    await waitFor(() => {
      expect(screen.getByText('Preencha todos os campos')).toBeInTheDocument();
    });
  });

  it('should check if emails fields are the same', async () => {
    STATE_SPY.mockReturnValue({
      signup: () => 'Os e-mails não são iguais',
    });

    render(<SignUp />, { wrapper: MemoryRouter });

    const inputMail = screen.getByTestId('inputEmail');

    fireEvent.change(inputMail, {
      target: { value: 'edu@mail.com' },
    });

    const inputMailConf = screen.getByTestId('inputEmailConf');

    fireEvent.change(inputMailConf, {
      target: { value: 'eduardo.com' },
    });

    const inputSenha = screen.getByTestId('inputSenha');

    fireEvent.change(inputSenha, {
      target: { value: '123' },
    });

    act(() => {
      fireEvent.click(screen.getByTestId('Inscrever-se'));
    });

    await waitFor(() => {
      expect(screen.getByText('Os e-mails não são iguais')).toBeInTheDocument();
    });
  });

  it('should navigate to signin after filling in the fields', async () => {
    STATE_SPY.mockReturnValue({
      signup: () => undefined,
    });

    render(<SignUp />, { wrapper: MemoryRouter });

    const inputMail = screen.getByTestId('inputEmail');

    fireEvent.change(inputMail, {
      target: { value: 'edu@mail.com' },
    });

    const inputMailConf = screen.getByTestId('inputEmailConf');

    fireEvent.change(inputMailConf, {
      target: { value: 'edu@mail.com' },
    });

    const inputSenha = screen.getByTestId('inputSenha');

    fireEvent.change(inputSenha, {
      target: { value: '1234' },
    });

    act(() => {
      fireEvent.click(screen.getByTestId('Inscrever-se'));
    });

    await waitFor(() => {
      expect(mockedUseNAvigate).toHaveBeenCalledWith('/');
    });
  });
});
