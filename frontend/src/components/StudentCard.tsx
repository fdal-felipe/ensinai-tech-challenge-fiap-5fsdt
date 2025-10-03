// src/components/StudentCard.tsx
'use client';
import React from 'react';
import styled from 'styled-components';

// --- Styled Components ---
const CardWrapper = styled.div`
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.05);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  cursor: pointer; // Adiciona o cursor de link
  transition: box-shadow 0.2s, border-color 0.2s;

  &:hover {
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
    border-color: #d1d5db;
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ProfilePicture = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
`;

const StudentInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const StudentName = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
`;

const StudentDescription = styled.p`
  color: #4b5563;
  margin: 0.25rem 0 0 0;
  font-size: 0.875rem;
  line-height: 1.5;
`;

const SubjectsSection = styled.div`
  border-top: 1px solid #f3f4f6;
  padding-top: 1rem;
`;

const SubjectsTitle = styled.h4`
  font-size: 0.75rem;
  font-weight: bold;
  color: #6b7280;
  text-transform: uppercase;
  margin: 0 0 0.5rem 0;
`;

const SubjectsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const SubjectTag = styled.span`
  background-color: #eef2ff;
  color: #4338ca;
  font-size: 0.75rem;
  font-weight: 500;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
`;

// --- Component Props ---
export interface Student {
  id: number;
  name: string;
  photoUrl: string;
  description: string;
  subjects: string[];
}

// Adicione onClick às props
interface StudentCardProps extends Student {
  onClick: () => void;
}

export default function StudentCard({ name, photoUrl, description, subjects, onClick }: StudentCardProps) {
  return (
    <CardWrapper onClick={onClick}>
      <CardHeader>
        <ProfilePicture src={photoUrl} alt={`Foto de ${name}`} />
        <StudentInfo>
          <StudentName>{name}</StudentName>
          <StudentDescription>{description}</StudentDescription>
        </StudentInfo>
      </CardHeader>
      <SubjectsSection>
        <SubjectsTitle>Matérias</SubjectsTitle>
        <SubjectsList>
          {subjects.map(subject => (
            <SubjectTag key={subject}>{subject}</SubjectTag>
          ))}
        </SubjectsList>
      </SubjectsSection>
    </CardWrapper>
  );
}