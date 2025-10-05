// src/app/page.tsx
'use client';

import React, { useEffect } from 'react';
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
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/login');
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <LoadingContainer>
      <Title>Ensinai</Title>
      <Spinner />
    </LoadingContainer>
  );
}