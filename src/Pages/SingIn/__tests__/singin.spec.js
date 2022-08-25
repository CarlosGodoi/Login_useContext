import SingIn from '..';
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import useAuth from '../../../Hooks/useAuth';
import { act } from 'react-dom/test-utils';

const mockedUseNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUseNavigate,
}));

jest.mock('../../../Hooks/useAuth');

const Signin = { useAuth };
const STATE_SPY = jest.spyOn(Signin, 'useAuth');

describe('Signin', () => {
  it('should render Signin component', () => {
    STATE_SPY.mockReturnValue({
      signin: () => undefined,
    });

    render(<SingIn />, { wrapper: MemoryRouter });

    expect(screen.getByTestId('signin')).toBeInTheDocument();
  });
});

describe('Test to verify receiving field data correctly and login', () => {
  it('should verify if fields are required', async () => {
    STATE_SPY.mockReturnValue({
      signin: () => undefined,
    });

    render(<SingIn />, { wrapper: MemoryRouter });

    fireEvent.click(screen.getByTestId('Entrar'));

    await waitFor(() => {
      expect(screen.getByText('Preencha todos os campos')).toBeInTheDocument();
    });
  });

  it('should verify if there is registered user', async () => {
    STATE_SPY.mockReturnValue({
      signin: () => 'Usuário não cadastrado',
    });

    render(<SingIn />, { wrapper: MemoryRouter });

    const inputMail = screen.getByTestId('inputMail');

    fireEvent.change(inputMail, {
      target: { value: 'abc' },
    });

    const inputSenha = screen.getByTestId('inputSenha');

    fireEvent.change(inputSenha, {
      target: { value: '123' },
    });

    act(() => {
      fireEvent.click(screen.getByTestId('Entrar'));
    });

    await waitFor(() => {
      expect(screen.getByText('Usuário não cadastrado')).toBeInTheDocument();
    });
  });

  it('should navigate to home after filling in the fields', async () => {
    STATE_SPY.mockReturnValue({
      signin: () => undefined,
    });

    render(<SingIn />, { wrapper: MemoryRouter });

    const inputMail = screen.getByTestId('inputMail');

    fireEvent.change(inputMail, {
      target: { value: 'abc@mail.com' },
    });

    const inputSenha = screen.getByTestId('inputSenha');

    fireEvent.change(inputSenha, {
      target: { value: '123cba' },
    });

    fireEvent.click(screen.getByTestId('Entrar'));

    await waitFor(() => {
      expect(mockedUseNavigate).toHaveBeenCalledWith('/home');
    });
  });
});
