// src/app/login/page.tsx
'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '../../components/Button';
import { 
  FormContainer, 
  FormWrapper, 
  Title, 
  Subtitle, 
  InputGroup, 
  Label, 
  Input, 
  StyledLink,
  LinksContainer
} from '../../components/FormStyles';

export default function LoginPage() {
  const router = useRouter();

  // Estados de entrada e erro
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password }),
        });
      if (!res.ok) {
        throw new Error('Credenciais inválidas');
      }

      const data = await res.json();
      type User = {
          id: number;
          name: string;
          email: string;
          password_hash: string;
          role: string;
          created_at: string;
          updated_at: string;
        };
      if (data.token) {
        localStorage.setItem('token',data.token);
        localStorage.setItem('role',data.role)
        // Redireciona após login bem-sucedido
        router.push('/home');
      } else {
        throw new Error('Token não recebido');
      }
    } catch (err: any) {
      console.error('Erro no login:', err);
      setError(err.message);
    }
  };

  return (
    <FormContainer>
      <FormWrapper onSubmit={handleLogin}>
        <div style={{ textAlign: 'center' }}>
          <Title>Entrar</Title>
          <Subtitle>Entre para continuar</Subtitle>
        </div>

        <InputGroup>
          <Label htmlFor="email">EMAIL</Label>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </InputGroup>

        <InputGroup>
          <Label htmlFor="password">SENHA</Label>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </InputGroup>

        {/* Mensagem de erro */}
        {error && (
          <p style={{ color: 'red', textAlign: 'center', marginTop: '10px' }}>
            {error}
          </p>
        )}

        <Button type="submit" $fullWidth>Entrar</Button>

        <LinksContainer>
          <StyledLink href="/esqueci-senha">Esqueci minha senha</StyledLink>
          <StyledLink href="/cadastro">Cadastrar</StyledLink>
        </LinksContainer>
      </FormWrapper>
    </FormContainer>
  );
}
