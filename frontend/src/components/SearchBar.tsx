// src/components/SearchBar.tsx
'use client'; // Necessário para usar hooks como o useState

import React, { useState } from 'react';
import Button from './Button';

export default function SearchBar() {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (!query) {
      alert('Por favor, digite algo para buscar.');
      return;
    }
    alert(`Buscando por: ${query}`);
    // Aqui você chamaria a API de busca
  };

  return (
    <div className="flex items-center gap-2 my-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar posts..."
        className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none text-black"
      />
      <Button onClick={handleSearch}>Buscar</Button>
    </div>
  );
}