'use client';
import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // 1. Importe o useRouter para o botão de voltar

// --- Styled Components ---
const AccountWrapper = styled.div`
  max-width: 800px;
`;

// 2. Crie um cabeçalho para o título e o botão de voltar
const PageHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const BackButton = styled.button`
    background: #111827;
    color: #ffffff;
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color 0.2s;
    &:hover { background: #4b5563; }
`;

const BackIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>;

const Title = styled.h1`
  font-family: var(--font-lora), serif;
  font-size: 2.25rem;
  font-weight: bold;
  color: #111827;
`;

// 3. Altere o ProfileHeader para ProfileSection e alinhe à esquerda
const ProfileSection = styled.div`
  display: flex;
  align-items: center; /* Alinha verticalmente a imagem e o texto */
  gap: 1.5rem; /* Espaçamento entre a foto e as informações */
  margin-bottom: 3rem;
`;

const ProfilePicture = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
`;

// 4. Crie um container para agrupar nome e descrição
const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProfileName = styled.h2`
  font-size: 1.75rem;
  font-weight: bold;
  color: #111827;
  margin: 0;
`;

// 5. Crie o componente para a descrição
const ProfileDescription = styled.p`
  color: #6b7280;
  margin-top: 0.5rem;
  line-height: 1.6;
`;

const ActionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ActionItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.5rem;
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  text-decoration: none;
  color: #374151;
  font-weight: 500;
  transition: background-color 0.2s, box-shadow 0.2s;

  &:hover {
    background-color: #f9fafb;
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.05);
  }
`;

// --- Ícones (sem alterações) ---
const IconWrapper = styled.div` width: 24px; height: 24px; color: #6b7280; `;
const UserIcon = () => <IconWrapper><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg></IconWrapper>;
const SettingsIcon = () => <IconWrapper><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg></IconWrapper>;
const BellIcon = () => <IconWrapper><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg></IconWrapper>;
const CloudIcon = () => <IconWrapper><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path></svg></IconWrapper>;
const ChevronRight = () => <svg style={{marginLeft: 'auto'}} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>;

export default function AccountPage() {
  const router = useRouter(); // Inicializa o router

  return (
    <AccountWrapper>
      <PageHeader>
        <BackButton type="button" onClick={() => router.back()}>
          <BackIcon />
        </BackButton>
        <Title>Minha Conta</Title>
      </PageHeader>
      
      <ProfileSection>
        <ProfilePicture src="https://i.pravatar.cc/150?u=nicholasgerade" alt="Foto do Perfil" />
        <ProfileInfo>
          <ProfileName>Nicholas Gerade</ProfileName>
          <ProfileDescription>
            Professor de Matemática e entusiasta de novas tecnologias aplicadas à educação. Foco em gamificação e metodologias ativas.
          </ProfileDescription>
        </ProfileInfo>
      </ProfileSection>

      <ActionsList>
        <ActionItem href="/minha-conta/editar"><UserIcon /> Editar conta <ChevronRight /></ActionItem>
        <ActionItem href="/configuracoes"><SettingsIcon /> Configurações <ChevronRight /></ActionItem>
        <ActionItem href="/notificacoes"><BellIcon /> Notificações <ChevronRight /></ActionItem>
        <ActionItem href="/integracoes"><CloudIcon /> Integrações <ChevronRight /></ActionItem>
      </ActionsList>
    </AccountWrapper>
  );
}