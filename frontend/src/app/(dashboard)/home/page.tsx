// src/app/(dashboard)/home/page.tsx
'use client';
import styled from 'styled-components';

const WelcomeMessage = styled.div`
  text-align: left;
`;

const WelcomeTitle = styled.h1`
    font-size: 2.5rem;
    font-weight: bold;
    color: #1f2937;
`;

const WelcomeText = styled.p`
    font-size: 1.125rem;
    color: #4b5563;
    margin-top: 0.5rem;
`;

export default function HomePage() {
  return (
    <WelcomeMessage>
      <WelcomeTitle>Bem-vindo ao seu Dashboard!</WelcomeTitle>
      <WelcomeText>Selecione uma opção no menu lateral para começar a gerenciar o conteúdo.</WelcomeText>
    </WelcomeMessage>
  );
}