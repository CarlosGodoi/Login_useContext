import React, { useState } from 'react';
import Input from '../../Components/Input';
import Button from '../../Components/Button';
import * as C from './styles';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';

const SingIn = () => {
  const { signin } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (!email | !senha) {
      setError('Preencha todos os campos');
      return;
    }

    const res = signin(email, senha);

    if (res) {
      setError(res);
      return;
    }

    navigate('/home');
  };

  return (
    <C.Container data-testid="signin">
      <C.Label>SISTEMA DE LOGIN</C.Label>
      <C.Content>
        <Input
          testid="inputMail"
          type="email"
          placeholder="Digite seu E-mail"
          value={email}
          onChange={(e) => [setEmail(e.target.value), setError('')]}
        />
        <Input
          testid="inputSenha"
          type="password"
          placeholder="Digite sua Senha"
          value={senha}
          onChange={(e) => [setSenha(e.target.value), setError('')]}
        />
        <C.labelError>{error}</C.labelError>
        <Button text="Entrar" onClick={handleLogin} testid="Entrar" />
        <C.LabelSignup>
          Não tem uma conta?
          <C.Strong>
            <Link to="/signup">&nbsp;Registre-se</Link>
          </C.Strong>
        </C.LabelSignup>
      </C.Content>
    </C.Container>
  );
};

export default SingIn;
