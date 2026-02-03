// src/components/Button.tsx
'use client';
import React from 'react';
import styled from 'styled-components';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'danger' | 'success'| 'create'; // Adicionada a variante 'success'
  $fullWidth?: boolean;
}

const StyledButton = styled.button<ButtonProps>`
  background-color: ${props => {
    if (props.variant === 'danger') return '#dc2626';
    if (props.variant === 'success') return '#16a34a'; // Cor verde
    if (props.variant === 'create') return '#1f599b';
    return '#111827'; // Cor primária (preto)
  }};
  color: white;
  font-weight: bold;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.375rem;
  
  cursor: pointer;
  transition: background-color 0.3s;
  width: ${props => (props.$fullWidth ? '100%' : 'auto')};

  &:hover {
    background-color: ${props => {
      if (props.variant === 'danger') return '#b91c1c';
      if (props.variant === 'success') return '#15803d'; // Verde mais escuro no hover
      return '#4b5563';
    }};
  }
`;

export default function Button({ children, onClick, type = 'button', variant = 'primary', $fullWidth = false }: ButtonProps) {
  return (
    <StyledButton type={type} onClick={onClick} variant={variant} $fullWidth={$fullWidth}>
      {children}
    </StyledButton>
  );
}