// src/components/SearchBar.tsx
'use client';
import React, { useState } from 'react';
import styled from 'styled-components';
import Button from './Button';

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 1rem 0;
`;

const Input = styled.input`
  border: 2px solid #d1d5db;
  background-color: white;
  height: 2.5rem;
  padding: 0 1.25rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  color: black;

  &:focus {
    outline: none;
    border-color: #2563eb;
  }
`;

export default function SearchBar() {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    alert(`Buscando por: ${query}`);
  };

  return (
    <SearchContainer>
      <Input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar posts..."
      />
      <Button onClick={handleSearch}>Buscar</Button>
    </SearchContainer>
  );
}