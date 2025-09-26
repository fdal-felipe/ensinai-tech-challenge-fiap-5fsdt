// src/app/cadastro/page.tsx
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

export default function CadastroPage() {
  return (
    <FormContainer>
      <FormWrapper>
        <div style={{ textAlign: 'center' }}>
          <Title>Cadastro</Title>
          <Subtitle>Crie a sua conta</Subtitle>
        </div>

        <InputGroup>
          <Label htmlFor="name">NOME COMPLETO</Label>
          <Input type="text" id="name" placeholder="John Doe" />
        </InputGroup>

        <InputGroup>
          <Label htmlFor="email">EMAIL</Label>
          <Input type="email" id="email" placeholder="john@gmail.com" />
        </InputGroup>

        <InputGroup>
          <Label htmlFor="password">SENHA</Label>
          <Input type="password" id="password" placeholder="************" />
        </InputGroup>

        <Button type="submit">Criar</Button>

        <StyledLink href="/login">Já tem uma conta? Entrar</StyledLink>
      </FormWrapper>
    </FormContainer>
  );
}