'use client';
import React from 'react';
import Button from '../../components/Button';
import { 
  FormContainer, 
  FormWrapper, 
  Title, 
  Subtitle, 
  InputGroup, 
  Label, 
  Input, 
  StyledLink 
} from '../../components/FormStyles';
import { useRouter } from 'next/navigation'; // 1. Importe o useRouter

export default function CadastroPage() {
  const router = useRouter(); // 2. Inicialize o router

  // 3. Crie a função para lidar com o envio do formulário
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Impede o recarregamento da página
    
    // Aqui viria a lógica para enviar os dados para a API do backend
    console.log('Criando conta...');
    
    // Redireciona para a página de login
    router.push('/login');
  };

  return (
    <FormContainer>
      {/* 4. Conecte a função ao onSubmit do formulário */}
      <FormWrapper onSubmit={handleSubmit}>
        <div style={{ textAlign: 'center' }}>
          <Title>Cadastro</Title>
          <Subtitle>Crie a sua conta</Subtitle>
        </div>

        <InputGroup>
          <Label htmlFor="name">NOME COMPLETO</Label>
          <Input type="text" id="name" placeholder="John Doe" required />
        </InputGroup>

        <InputGroup>
          <Label htmlFor="email">EMAIL</Label>
          <Input type="email" id="email" placeholder="john@gmail.com" required />
        </InputGroup>

        <InputGroup>
          <Label htmlFor="password">SENHA</Label>
          <Input type="password" id="password" placeholder="************" required />
        </InputGroup>

        <Button type="submit" $fullWidth>Criar</Button>

        <StyledLink href="/login">Já tem uma conta? Entrar</StyledLink>
      </FormWrapper>
    </FormContainer>
  );
}

