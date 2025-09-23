// src/components/PostCard.tsx
import React from 'react';

interface PostCardProps {
  title: string;
  author: string;
  description: string;
}

export default function PostCard({ title, author, description }: PostCardProps) {
  return (
    <div className="border rounded-lg p-4 shadow-md w-full max-w-2xl my-2 bg-white">
      <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
      <p className="text-sm text-gray-500 my-1">por {author}</p>
      <p className="text-gray-700">{description}</p>
      <a href="#" className="text-blue-600 hover:underline mt-2 inline-block">Ler mais...</a>
    </div>
  );
}