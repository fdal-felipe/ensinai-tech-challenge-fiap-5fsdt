// src/app/(dashboard)/layout.tsx
'use client'
import React, { useState } from 'react'
import styled from 'styled-components'
import Sidebar from '../../components/Sidebar'
import MobileNav from '../../components/HeaderMobile'
import MenuMobile from '../../components/MenuMobile'

const DashboardWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #f9fafb;
`

const MainContent = styled.main`
  flex-grow: 1;
  padding: 2rem 3rem;
  overflow-y: auto;

  @media (max-width: 768px) {
    padding: 1.2rem;
    padding-bottom: 100px; /* Espaço para o botão de navegação flutuante */
  }
`

export default function DashboardLayout ({
  children
}: {
  children: React.ReactNode
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <DashboardWrapper>
      <Sidebar /> {/* Sidebar original, que já se esconde no mobile */}
      <MobileNav onMenuClick={() => setIsMenuOpen(true)} />
      <MenuMobile isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <MainContent>{children}</MainContent>
    </DashboardWrapper>
  )
}
