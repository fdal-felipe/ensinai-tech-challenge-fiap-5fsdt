// src/components/PostCard.tsx
'use client';
import React from 'react';
import styled from 'styled-components';

interface PostCardProps {
  title: string;
  author: string;
  description: string;
}

const CardWrapper = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 1rem;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
  width: 100%;
  max-width: 42rem;
  margin: 0.5rem 0;
  background-color: white;

  h2 {
    font-size: 1.5rem;
    font-weight: bold;
    color: #1f2937;
  }

  p {
    color: #4b5563;
  }

  .author {
    font-size: 0.875rem;
    color: #6b7280;
    margin: 0.25rem 0;
  }

  a {
    color: #2563eb;
    text-decoration: none;
    margin-top: 0.5rem;
    display: inline-block;
    &:hover {
      text-decoration: underline;
    }
  }
`;

export default function PostCard({ title, author, description }: PostCardProps) {
  return (
    <CardWrapper>
      <h2>{title}</h2>
      <p className="author">por {author}</p>
      <p>{description}</p>
      <a href="#">Ler mais...</a>
    </CardWrapper>
  );
}