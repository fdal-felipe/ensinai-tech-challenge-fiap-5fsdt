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

export default function CadastroPage() {
  // Estados do formulário
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'aluno'
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Atualiza os valores
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
      const res = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role,
        }),
      });

      if (res.ok) {
        setMessage('Cadastro realizado com sucesso!');
        setFormData({ name: '', email: '', password: '', confirmPassword: '', role: 'aluno' });
      } else {
        const errorData = await res.json();
        setMessage(errorData.message || 'Erro ao cadastrar.');
      }
    } catch (error) {
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
          <Label htmlFor="role">Escolha um papel</Label>
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

        <Button type="submit">
          {loading ? 'Cadastrando...' : 'Criar'}
        </Button>

        {message && <p style={{ color: 'red', marginTop: '1rem' }}>{message}</p>}

        <StyledLink href="/login">Já tem uma conta? Entrar</StyledLink>
      </FormWrapper>
    </FormContainer>
  );
}
