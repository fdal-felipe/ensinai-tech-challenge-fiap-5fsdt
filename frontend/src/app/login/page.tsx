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
  LinksContainer,
} from '../../components/FormStyles';

export default function LoginPage() {
  const router = useRouter();

  // Estados começam vazios
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
          'Content-Type': 'application/json',
          'Authorization': 'Bearer "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsInJvbGUiOiJwcm9mZXNzb3IiLCJpYXQiOjE3NTg5MDU4MzUsImV4cCI6MTc1ODkwOTQzNX0.NC9SGpNkI0rhAdRJiTHXb8VAl2zSM0Jie-9T3K5FjGE"'
        },
        body: JSON.stringify({ email, password }), // pega valores do state
      });
      if (!res.ok) {

        throw new Error('Credenciais inválidas');
      }

      const data = await res.json();

      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('tipo', data.role);
        router.push('/home');
        console.log(data.token);
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
            onChange={(e) => setEmail(e.target.value)} // atualiza state
            required
          />
        </InputGroup>

        <InputGroup>
          <Label htmlFor="password">SENHA</Label>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // atualiza state
            required
          />
        </InputGroup>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <Button type="submit" $fullWidth>Entrar</Button>

        <LinksContainer>
          <StyledLink href="/esqueci-senha">esqueci minha senha</StyledLink>
          <StyledLink href="/cadastro">Cadastrar</StyledLink>
        </LinksContainer>
      </FormWrapper>
    </FormContainer>
  );
}
