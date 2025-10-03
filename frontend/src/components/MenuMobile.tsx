// src/components/MenuMobile.tsx
'use client';
import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

// --- Ícones (Copie do seu arquivo Sidebar.tsx) ---
const IconWrapper = styled.div` width: 24px; height: 24px; color: #6b7280; `;
const HomeIcon = () => <IconWrapper><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg></IconWrapper>;
const PostsIcon = () => <IconWrapper><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg></IconWrapper>;
const UsersIcon = () => <IconWrapper><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg></IconWrapper>;
const MateriasIcon = () => <IconWrapper><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><text x="4" y="18" fontSize="20" fontFamily="serif" fill="currentColor">A</text></svg></IconWrapper>;
const AccountIcon = () => <IconWrapper><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg></IconWrapper>;
const LogoutIcon = () => <IconWrapper><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg></IconWrapper>;

// --- Styled Components ---
const MenuOverlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000;
  opacity: ${props => (props.$isOpen ? 1 : 0)};
  visibility: ${props => (props.$isOpen ? 'visible' : 'hidden')};
  transition: opacity 0.3s ease, visibility 0.3s ease;
`;

const MenuContent = styled.nav<{ $isOpen: boolean }>`
  position: fixed;
  top: ${props => (props.$isOpen ? '0' : '-100%')}; /* Anima de cima para baixo */
  left: 0;
  right: 0;
  background-color: #ffffff;
  z-index: 1001;
  transition: top 0.3s ease;
  padding: 1.5rem;
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const NavItem = styled.li`
  a {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    border-bottom: 1px solid #f3f4f6;
    text-decoration: none;
    color: #374151;
    font-weight: 500;
    font-size: 1.125rem;
  }
`;

interface MenuMobileProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MenuMobile({ isOpen, onClose }: MenuMobileProps) {
  return (
    <MenuOverlay $isOpen={isOpen} onClick={onClose}>
      <MenuContent $isOpen={isOpen} onClick={(e) => e.stopPropagation()}>
        <NavList>
          <NavItem><Link href="/home" onClick={onClose}><HomeIcon /> Página Inicial</Link></NavItem>
          <NavItem><Link href="/posts" onClick={onClose}><PostsIcon /> Gerenciar Posts</Link></NavItem>
          <NavItem><Link href="/gerenciar-alunos" onClick={onClose}><UsersIcon /> Gerenciar Alunos</Link></NavItem>
          <NavItem><Link href="/gerenciar-materias" onClick={onClose}><MateriasIcon /> Gerenciar Matérias</Link></NavItem>
          <NavItem><Link href="/minha-conta" onClick={onClose}><AccountIcon /> Minha Conta</Link></NavItem>
          <NavItem><Link href="/login" onClick={onClose}><LogoutIcon /> Sair</Link></NavItem>
        </NavList>
      </MenuContent>
    </MenuOverlay>
  );
}