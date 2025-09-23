// src/components/Header.tsx
import React from 'react';

export default function Header() {
  return (
    <header className="w-full bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Ensinai Blog</h1>
      <nav>
        <a href="/" className="text-white hover:underline mx-2">Home</a>
        <a href="/admin" className="text-white hover:underline mx-2">Admin</a>
        <a href="/login" className="text-white hover:underline mx-2">Login</a>
      </nav>
    </header>
  );
}