import React from 'react';
import * as C from './styles';

const Button = ({ text, onClick, type = 'Button', testid }) => {
  return (
    <C.Button type={type} onClick={onClick} data-testid={testid}>
      {text}
    </C.Button>
  );
};

export default Button;
