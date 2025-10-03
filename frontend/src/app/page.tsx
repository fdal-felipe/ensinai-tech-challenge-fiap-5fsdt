// src/app/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import Spinner from '../components/Spinner';

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  gap: 2rem;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  font-family: "Inter", sans-serif;
`;

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      router.push('/login'); // Redireciona para a página de login
    }, 3000); // 3 segundos

    return () => clearTimeout(timer); // Limpa o timer se o componente for desmontado
  }, [router]);

  return (
    <LoadingContainer>
      <Title>Ensinai</Title>
      <Spinner />
    </LoadingContainer>
  );
}