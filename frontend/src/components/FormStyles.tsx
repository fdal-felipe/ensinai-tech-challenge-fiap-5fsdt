// src/components/FormStyles.tsx
'use client';
import styled from 'styled-components';

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #ffffff; /* Fundo branco */
`;

export const FormWrapper = styled.form` /* Alterado para tag <form> */
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  width: 100%;
  max-width: 400px;
  padding: 2rem;
`;

export const Title = styled.h1`
  font-family: var(--font-inter), serif; /* Usando a fonte Lora */
  font-size: 2.5rem;
  font-weight: bold;
  color: #111827;
  margin-bottom: 0.5rem; /* Espaçamento inferior adicionado */
`;

export const Subtitle = styled.p`
  color: #6b7280;
  margin-top: 0;
  margin-bottom: 2rem; /* Aumentando o espaço abaixo do subtítulo */
`;

export const InputGroup = styled.div`
  width: 100%;
`;

export const Label = styled.label`
  display: block;
  color: #4b5563; /* Cor mais escura */
  font-size: 0.875rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid #d1d5db; /* Borda cinza clara */
  background-color: #ffffff; /* Fundo branco */
  box-shadow: none; /* Removido o box-shadow */
  color: #111827;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #3b82f6; /* Borda azul no foco */
  }
`;

export const StyledLink = styled.a`
  color: #4b5563;
  text-decoration: none;
  font-size: 0.875rem;
  margin-top: 0.5rem;
  
  &:hover {
    text-decoration: underline;
  }
`;

export const LinksContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
`;