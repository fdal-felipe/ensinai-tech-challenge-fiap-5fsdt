// src/app/login/page.tsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FormContainer, FormWrapper, Title, Subtitle, InputGroup, Input, Label, ErrorMessage } from '../../components/FormStyles';
import Button from '../../components/Button';
import PasswordInput from '../../components/PasswordInput';

interface ApiError {
  message: string;
}

interface LoginResponse {
  token: string;
  role: string;
}

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password }),
      });

      console.log('Response status:', res.status);
      console.log('Response headers:', res.headers);
      console.log('Response body:', await res.clone().text());

      if (!res.ok) {
        const errorData = await res.json() as ApiError;
        setError(errorData.message || 'Erro ao fazer login');
        return;
      }

      const data = await res.json() as LoginResponse;
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);
      router.push('/home');
    } catch {
      setError('Erro de conexão com o servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormContainer>
      <FormWrapper onSubmit={handleLogin}>
        <Title>Ensinai</Title>
        <Subtitle>Faça login em sua conta</Subtitle>

        <InputGroup>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </InputGroup>

        <InputGroup>
          <Label htmlFor="password">Senha</Label>
          <PasswordInput
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </InputGroup>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <Button type="submit" $fullWidth>
          {loading ? 'Entrando...' : 'Entrar'}
        </Button>

        <Link href="/esqueci-senha" style={{ color: '#2563eb', textDecoration: 'none' }}>
          Esqueci minha senha
        </Link>

        <Link href="/cadastro" style={{ color: '#2563eb', textDecoration: 'none' }}>
          Criar conta
        </Link>
      </FormWrapper>
    </FormContainer>
  );
}
