// src/components/MobileNav.tsx
'use client';
import React from 'react';
import styled from 'styled-components';

const NavWrapper = styled.div`
  display: none; // Escondido em desktop

  @media (max-width: 768px) {
    display: block;
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 950;
  }
`;

const MenuButton = styled.button`
  background-color: #111827; // Cor preta
  color: white;
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }
`;

const HamburgerIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);

interface MobileNavProps {
  onMenuClick: () => void;
}

export default function MobileNav({ onMenuClick }: MobileNavProps) {
  return (
    <NavWrapper>
      <MenuButton onClick={onMenuClick} aria-label="Abrir menu">
        <HamburgerIcon />
      </MenuButton>
    </NavWrapper>
  );
}