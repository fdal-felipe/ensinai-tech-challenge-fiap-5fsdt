// src/app/(dashboard)/home/page.tsx
'use client'
import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'

// --- Styled Components ---
const HomeWrapper = styled.div`
  padding: 1rem;
`

const Title = styled.h1`
  font-family: var(--font-inter), serif;
  font-size: 2.5rem;
  font-weight: bold;
  color: #111827;
  margin-bottom: 0.5rem;
`

const Subtitle = styled.p`
  color: #6b7280;
  font-size: 1.125rem;
  margin-bottom: 3rem;
`

const ActionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* sempre 3 colunas */
  gap: 1.5rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  /* mobile: 1 coluna */
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`

const ActionCard = styled(Link)`
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  padding: 1.5rem;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  transition: box-shadow 0.2s, transform 0.2s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
  }
`

const CardTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
`

const CardDescription = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
  flex-grow: 1;
`

export default function HomePage () {
  return (
    <HomeWrapper>
      <Title>Bem-vindo ao seu Dashboard!</Title>
      {/* Texto adaptado para funcionar em qualquer tela */}
      <Subtitle>
        Selecione uma opção no menu para começar a gerenciar o conteúdo.
      </Subtitle>

      <ActionsGrid>
        <ActionCard href='/posts'>
          <CardTitle>Gerenciar Posts</CardTitle>
          <CardDescription>
            Visualize, edite ou remova posts já existentes na plataforma.
          </CardDescription>
        </ActionCard>
        <ActionCard href='/minha-conta'>
          <CardTitle>Configurações da Conta</CardTitle>
          <CardDescription>
            Ajuste suas preferências, altere sua senha e gerencie integrações.
          </CardDescription>
        </ActionCard>
        <ActionCard href='/gerenciar-alunos'>
          <CardTitle>Gerenciar Alunos</CardTitle>
          <CardDescription>
            Visualizar alunos e quais matérias os mesmos participam.
          </CardDescription>
        </ActionCard>
        <ActionCard href='/gerenciar-materias'>
          <CardTitle>Gerenciar Matérias</CardTitle>
          <CardDescription>
            Gerenciar e editar as matérias as quais você leciona.
          </CardDescription>
        </ActionCard>
      </ActionsGrid>
    </HomeWrapper>
  )
}
