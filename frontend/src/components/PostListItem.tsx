'use client';
import React from 'react';
import styled from 'styled-components';

// --- Styled Components ---
const Card = styled.div`
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  cursor: pointer;
  transition: box-shadow 0.2s, border-color 0.2s;

  &:hover {
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
    border-color: #d1d5db;
  }
`;

const Title = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
`;

const Author = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0.25rem 0 0.5rem 0;
`;

const Description = styled.p`
  color: #4b5563;
  margin: 0;
  line-height: 1.5;
`;

// --- Component Props ---
interface PostListItemProps {
  title: string;
  author: string;
  description: string;
  onClick: () => void; // Apenas a ação de clique
}

// --- Component ---
export default function PostListItem({ title, author, description, onClick }: PostListItemProps) {
  return (
    <Card onClick={onClick}>
      <Title>{title}</Title>
      <Author>Prof {author}</Author>
      <Description>{description}</Description>
    </Card>
  );
}