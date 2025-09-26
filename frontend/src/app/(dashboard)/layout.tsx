// src/app/(dashboard)/layout.tsx
'use client';
import React from 'react';
import styled from 'styled-components';
import Sidebar from '../../components/Sidebar'; // Vamos criar este componente a seguir

const DashboardWrapper = styled.div`
  display: flex;
  height: 100vh;
  background-color: #f9fafb; /* Um cinza bem claro para o fundo */
`;

const MainContent = styled.main`
  flex-grow: 1;
  padding: 2rem 3rem; /* Mais espaçamento para desktop */
  overflow-y: auto; /* Adiciona scroll se o conteúdo for grande */
`;

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardWrapper>
      <Sidebar />
      <MainContent>{children}</MainContent>
    </DashboardWrapper>
  );
}