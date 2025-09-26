// src/app/login/page.tsx
'use client';
import React from 'react';
import { useRouter } from 'next/navigation'; // Importe o useRouter
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
  const router = useRouter(); // Inicialize o router

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui viria a lógica de autenticação com a API
    console.log('Simulando login...');
    // Redireciona para a página home do dashboard
    router.push('/home');
  };

  return (
    <FormContainer>
      {/* Adiciona o onSubmit ao FormWrapper */}
      <FormWrapper onSubmit={handleLogin}>
        <div style={{ textAlign: 'center' }}>
          <Title>Entrar</Title>
          <Subtitle>Entre para continuar</Subtitle>
        </div>

        <InputGroup>
          <Label htmlFor="email">EMAIL</Label>
          <Input type="email" id="email" defaultValue="john@gmail.com" />
        </InputGroup>

        <InputGroup>
          <Label htmlFor="password">SENHA</Label>
          <Input type="password" id="password" defaultValue="************" />
        </InputGroup>

        <Button type="submit" $fullWidth>Entrar</Button>

        <LinksContainer>
          <StyledLink href="/esqueci-senha">esqueci minha senha</StyledLink>
          <StyledLink href="/cadastro">Cadastrar</StyledLink>
        </LinksContainer>
      </FormWrapper>
    </FormContainer>
  );
}