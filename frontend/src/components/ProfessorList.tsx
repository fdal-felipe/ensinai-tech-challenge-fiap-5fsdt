// app/components/ProfessorList.tsx
'use client';
import React from 'react';
import styled from 'styled-components';

// Definindo o tipo User
type User = {
  id: number;
  name: string;
  email: string;
  password_hash: string;
  role: string;
  created_at: string;
  updated_at: string;
};

// Styled Components para o ProfessorList
const Select = styled.select`
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid #d1d5db;
  background-color: #ffffff;
  color: #111827;
  font-size: 1rem;
  font-family: inherit;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
  }
  
  &:disabled {
    background-color: #f9fafb;
    color: #6b7280;
    cursor: not-allowed;
  }
`;

const EmptyMessage = styled.p`
  padding: 0.75rem 1rem;
  color: #6b7280;
  font-size: 1rem;
  text-align: center;
  border: 1px dashed #d1d5db;
  border-radius: 0.5rem;
  background-color: #f9fafb;
`;

// Definindo as props do componente
interface ProfessorListProps {
  users: User[];
  onProfessorSelect: (selectedProfessorId: number) => void;
}

export default function ProfessorList({ users, onProfessorSelect }: ProfessorListProps) {
  // Filtra o array para incluir apenas usuários com a role "professor"
  const professores = users.filter(user => user.role === 'professor');

  // Lida com a mudança na seleção
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onProfessorSelect(Number(event.target.value));
  };

  return (
    <div>
      {professores.length > 0 ? (
        <Select onChange={handleChange} defaultValue="">
          <option value="" disabled>Selecione um professor...</option>
          {professores.map((professor) => (
            <option key={professor.id} value={professor.id}>
             Professor {professor.name}
            </option>
          ))}
        </Select>
      ) : (
        <EmptyMessage>Nenhum professor disponível no momento.</EmptyMessage>
      )}
    </div>
  );
}