// src/app/(dashboard)/gerenciar-alunos/[id]/page.tsx
'use client'
import React from 'react'
import { useRouter, useParams } from 'next/navigation'
import styled from 'styled-components'
import { PageWrapper } from '../../../../components/SettingsComponents'

// --- Dados de Exemplo (simulando uma busca no banco) ---
// Em uma aplicação real, você faria um fetch para a API usando o ID
const allStudents = [
  {
    id: 1,
    name: 'Carlos Dias',
    photoUrl: 'https://i.pravatar.cc/150?u=ana',
    description: 'Aluno do 3º ano, focado em exatas.',
    subjects: ['Matemática II', 'Física VI']
  },
  {
    id: 2,
    name: 'Bruno Gomes',
    photoUrl: 'https://i.pravatar.cc/150?u=bruno',
    description: 'Interessado em programação e desenvolvimento de jogos.',
    subjects: ['Matemática I', 'Inglês III']
  },
  {
    id: 3,
    name: 'Sérgio Fontana',
    photoUrl: 'https://i.pravatar.cc/150?u=carla',
    description: 'Ótimo aluno de humanas, participativo em debates.',
    subjects: ['Inglês III']
  },
  {
    id: 4,
    name: 'Daniel Alves',
    photoUrl: 'https://i.pravatar.cc/150?u=daniel',
    description: 'Atleta e estudante, se esforça para conciliar as duas áreas.',
    subjects: ['Física VI']
  }
]

// --- Styled Components ---
const PageHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
`
const Title = styled.h1`
  font-family: var(--font-inter), serif;
  font-size: 2.25rem;
  font-weight: bold;
  color: #111827;
  margin: 0;
`
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
  flex-shrink: 0;
  &:hover {
    background: #4b5563;
  }
`
const BackIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    viewBox='0 0 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <line x1='19' y1='12' x2='5' y2='12'></line>
    <polyline points='12 19 5 12 12 5'></polyline>
  </svg>
)

const ProfileContainer = styled.div`
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  padding: 2rem;
`
const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
`
const ProfilePicture = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
`
const ProfileName = styled.h2`
  font-size: 1.75rem;
  font-weight: bold;
  color: #111827;
  margin: 0;
`
const ProfileDescription = styled.p`
  color: #4b5563;
  margin-top: 0.5rem;
  line-height: 1.6;
`
const SubjectsSection = styled.div`
  border-top: 1px solid #f3f4f6;
  padding-top: 1.5rem;
  margin-top: 1.5rem;
`
const SubjectsTitle = styled.h4`
  font-size: 0.875rem;
  font-weight: bold;
  color: #6b7280;
  text-transform: uppercase;
  margin: 0 0 1rem 0;
`
const SubjectsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`
const SubjectTag = styled.span`
  background-color: #eef2ff;
  color: #4338ca;
  font-size: 0.875rem;
  font-weight: 500;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
`

export default function StudentDetailPage () {
  const router = useRouter()
  const params = useParams()
  const studentId = params.id as string

  const student = allStudents.find(s => s.id === parseInt(studentId))

  if (!student) {
    return (
      <PageWrapper>
        <PageHeader>
          <BackButton type='button' onClick={() => router.back()}>
            <BackIcon />
          </BackButton>
          <Title>Aluno não encontrado</Title>
        </PageHeader>
      </PageWrapper>
    )
  }

  return (
    <PageWrapper>
      <PageHeader>
        <BackButton type='button' onClick={() => router.back()}>
          <BackIcon />
        </BackButton>
      </PageHeader>
      <ProfileContainer>
        <ProfileHeader>
          <ProfilePicture
            src={student.photoUrl}
            alt={`Foto de ${student.name}`}
          />
          <ProfileName>{student.name}</ProfileName>
        </ProfileHeader>
        <ProfileDescription>{student.description}</ProfileDescription>
        <SubjectsSection>
          <SubjectsTitle>Matérias que Atende</SubjectsTitle>
          <SubjectsList>
            {student.subjects.map(subject => (
              <SubjectTag key={subject}>{subject}</SubjectTag>
            ))}
          </SubjectsList>
        </SubjectsSection>
      </ProfileContainer>
    </PageWrapper>
  )
}
