'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
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
import OtpInput from '../../components/OtpInput';
import PasswordInput from '../../components/PasswordInput';

const ErrorMessage = styled.p`
  color: #dc2626;
  font-size: 0.875rem;
  text-align: center;
`;

const SuccessContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1.5rem;
`;

// Ícone de sucesso (SVG) - ATUALIZADO
const CheckIcon = () => (
    <svg width="100" height="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" fill="#16a34a" /> 
        <path d="M7.5 12.5L10.5 15.5L16.5 9.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

// Wrapper para adicionar margem superior aos links e botões quando necessário
const SpacedElement = styled.div`
  margin-top: 1rem;
  width: 100%;
  display: flex;
  justify-content: center;
`;


export default function ForgotPasswordPage() {
  const [step, setStep] = useState('email'); // email, otp, reset, success
  const [email, setEmail] = useState('');
  const [otpError, setOtpError] = useState('');
  const router = useRouter();

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Enviando código para:", email);
    // Lógica para chamar a API de envio de código
    setStep('otp'); // Avança para a próxima etapa
  };

  const handleOtpSubmit = (otp: string) => {
    console.log("Verificando OTP:", otp);
    // Lógica para verificar o código na API
    if (otp === '123456') { // Simulação de sucesso
        setOtpError('');
        setStep('reset');
    } else { // Simulação de erro
        setOtpError('Código errado, tente novamente por favor');
    }
  };

  const handleResetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Redefinindo a senha...");
    // Lógica para chamar a API de redefinição
    setStep('success');
  };

  return (
    <FormContainer>
      {step === 'email' && (
        <FormWrapper onSubmit={handleEmailSubmit}>
          <div style={{ textAlign: 'center' }}>
            <Title>Esqueceu a sua senha?</Title>
            <Subtitle>Não se preocupe! Por favor insira seu email abaixo para enviarmos um código de recuperação!</Subtitle>
          </div>
          <InputGroup>
            <Label htmlFor="email">EMAIL</Label>
            <Input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="john@gmail.com" />
          </InputGroup>
          <Button type="submit" $fullWidth>Enviar</Button>
          <SpacedElement>
            <StyledLink href="/login">Lembrou da sua Senha? Entrar</StyledLink>
          </SpacedElement>
        </FormWrapper>
      )}

      {step === 'otp' && (
        <FormWrapper>
          <div style={{ textAlign: 'center' }}>
            <Title>Código OTP</Title>
            <Subtitle>Insira o código OTP enviado no seu email para recuperar a sua conta.</Subtitle>
          </div>
          <OtpInput onComplete={handleOtpSubmit} />
          {otpError && <ErrorMessage>{otpError}</ErrorMessage>}
          <SpacedElement>
            <Button onClick={() => handleOtpSubmit('123456')} $fullWidth>Verificar</Button>
          </SpacedElement>
          <SpacedElement>
            <StyledLink href="#">Não recebeu o código? Reenviar</StyledLink>
          </SpacedElement>
        </FormWrapper>
      )}

      {step === 'reset' && (
        <FormWrapper onSubmit={handleResetSubmit}>
            <div style={{ textAlign: 'center' }}>
                <Title>Criar nova Senha</Title>
                <Subtitle>Sua nova senha deve ser diferente da última usada.</Subtitle>
            </div>
            <InputGroup>
                <Label>SENHA</Label>
                <PasswordInput id="new-password" placeholder="************" />
            </InputGroup>
            <InputGroup>
                <Label>CONFIRMAR SENHA</Label>
                <PasswordInput id="confirm-password" placeholder="************" />
            </InputGroup>
            <Button type="submit" $fullWidth>Mudar senha</Button>
        </FormWrapper>
      )}

      {step === 'success' && (
        <SuccessContainer>
            <CheckIcon />
            <Title>Senha confirmada!</Title>
            <Subtitle>Sua nova senha foi confirmada com sucesso!</Subtitle>
            <Button onClick={() => router.push('/login')}>Voltar ao login</Button>
        </SuccessContainer>
      )}
    </FormContainer>
  );
}

