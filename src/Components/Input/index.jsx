import React from 'react';
import * as C from './styles';

const Input = ({ type, placeholder, value, onChange, testid }) => {
  return (
    <C.Input
      data-testid={testid}
      value={value}
      onChange={onChange}
      type={type}
      placeholder={placeholder}
    />
  );
};

export default Input;
