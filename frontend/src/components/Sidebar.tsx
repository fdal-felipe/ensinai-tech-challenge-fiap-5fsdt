'use client';
import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

// --- Styled Components ---
const SidebarContainer = styled.aside`
  width: 280px;
  background-color: #ffffff;
  border-right: 1px solid #e5e7eb;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  font-family: var(--font-lora), serif;
  font-size: 1.75rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #111827;
`;

const Subtitle = styled.p`
  color: #6b7280;
  margin-bottom: 2rem;
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex-grow: 1; /* Empurra o botão 'Sair' para baixo */
`;

const NavItem = styled.li`
  a {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
    text-decoration: none;
    color: #374151;
    font-weight: 500;
    transition: background-color 0.2s, color 0.2s;

    &:hover {
      background-color: #f3f4f6;
      color: #111827;
    }
  }
`;

// --- Componentes de Ícones (SVG) ---
const IconWrapper = styled.div` width: 24px; height: 24px; color: #6b7280; `;
const HomeIcon = () => <IconWrapper><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg></IconWrapper>;
const PostsIcon = () => <IconWrapper><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg></IconWrapper>;
const UsersIcon = () => <IconWrapper><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg></IconWrapper>;
const MateriasIcon = () => <IconWrapper><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><text x="4" y="18" fontSize="20" fontFamily="serif" fill="currentColor">A</text></svg></IconWrapper>;
const AccountIcon = () => <IconWrapper><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg></IconWrapper>;
const LogoutIcon = () => <IconWrapper><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg></IconWrapper>;
const ChevronRight = () => <svg style={{marginLeft: 'auto'}} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>;


// --- Componente Principal ---
export default function Sidebar() {
  return (
    <SidebarContainer>
      <div>
        <Title>Página Inicial</Title>
        <Subtitle>Seja Bem vindo!</Subtitle>
      </div>
      <NavList>
        {/* NOVO ITEM ADICIONADO AQUI */}
        <NavItem><Link href="/home"><HomeIcon /> Página Inicial <ChevronRight /></Link></NavItem>
        <NavItem><Link href="/posts"><PostsIcon /> Gerenciar Posts <ChevronRight /></Link></NavItem>
        <NavItem><Link href="#"><UsersIcon /> Gerenciar Alunos <ChevronRight /></Link></NavItem>
        <NavItem><Link href="#"><MateriasIcon /> Gerenciar Matérias <ChevronRight /></Link></NavItem>
        <NavItem><Link href="/minha-conta"><AccountIcon /> Minha Conta <ChevronRight /></Link></NavItem>
      </NavList>
      {/* Empurra o item de Sair para o final */}
      <NavList style={{ flexGrow: 0 }}>
         <NavItem><Link href="/login"><LogoutIcon /> Sair <ChevronRight /></Link></NavItem>
      </NavList>
    </SidebarContainer>
  );
}