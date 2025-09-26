// src/components/PasswordInput.tsx
'use client';
import React, { useState } from 'react';
import styled from 'styled-components';
import { Input } from './FormStyles';

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const ToggleButton = styled.button`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.25rem;
  color: #6b7280;
`;

// Ícone de olho (SVG simples)
const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>
);

export default function PasswordInput(props: React.ComponentPropsWithoutRef<'input'>) {
  const [visible, setVisible] = useState(false);

  return (
    <InputWrapper>
      <Input type={visible ? 'text' : 'password'} {...props} />
      <ToggleButton type="button" onClick={() => setVisible(!visible)}>
        <EyeIcon />
      </ToggleButton>
    </InputWrapper>
  );
}