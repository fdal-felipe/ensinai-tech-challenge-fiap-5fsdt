// src/app/cadastro/page.tsx
'use client';
import React, { useState } from 'react';
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
  SelectGroup,
  Select,
  Option
} from '../../components/FormStyles';
import { useRouter } from 'next/navigation';

interface ErrorResponse {
  message: string;
}

export default function CadastroPage() {
  const router = useRouter();

  // Estados do formulário
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'aluno',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Atualiza os valores dos campos
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Envia o formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setMessage('As senhas não coincidem!');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role,
        }),
      });

      if (res.ok) {
        setMessage('✅ Cadastro realizado com sucesso! Redirecionando...');
        setFormData({ name: '', email: '', password: '', confirmPassword: '', role: 'aluno' });

        // Redireciona após 1.5s
        setTimeout(() => {
          router.push('/login');
        }, 1500);
      } else {
        const errorData: ErrorResponse = await res.json();
        setMessage(errorData.message || 'Erro ao cadastrar.');
      }
    } catch {
      setMessage('Erro de conexão com o servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormContainer>
      <FormWrapper onSubmit={handleSubmit}>
        <div style={{ textAlign: 'center' }}>
          <Title>Cadastro</Title>
          <Subtitle>Crie a sua conta</Subtitle>
        </div>

        <InputGroup>
          <Label htmlFor="name">NOME COMPLETO</Label>
          <Input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            required
          />
        </InputGroup>

        <InputGroup>
          <Label htmlFor="email">EMAIL</Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john@gmail.com"
            required
          />
        </InputGroup>

        <InputGroup>
          <Label htmlFor="password">SENHA</Label>
          <Input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="************"
            required
          />
        </InputGroup>

        <InputGroup>
          <Label htmlFor="confirmPassword">CONFIRME SUA SENHA</Label>
          <Input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="************"
            required
          />
        </InputGroup>

        <SelectGroup>
          <Label htmlFor="role">ESCOLHA UM PAPEL</Label>
          <Select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <Option value="aluno">Aluno</Option>
            <Option value="professor">Professor</Option>
          </Select>
        </SelectGroup>

        {message && (
          <p
            style={{
              color: message.startsWith('✅') ? 'green' : 'red',
              textAlign: 'center',
              marginTop: '1rem',
            }}
          >
            {message}
          </p>
        )}

        <Button type="submit" $fullWidth>
          {loading ? 'Cadastrando...' : 'Criar'}
        </Button>

        <StyledLink
          href="/login"
          style={{ display: 'block', textAlign: 'center', marginTop: '15px' }}
        >
          Já tem uma conta? Entrar
        </StyledLink>
      </FormWrapper>
    </FormContainer>
  );
}
