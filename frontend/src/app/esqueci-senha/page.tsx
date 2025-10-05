'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { FormContainer, FormWrapper, Title, Subtitle, InputGroup, Label, Input, StyledLink } from '../../components/FormStyles';
import Button from '../../components/Button';
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

const CheckIcon = () => (
  <svg width="100" height="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill="#16a34a" /> 
    <path d="M7.5 12.5L10.5 15.5L16.5 9.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SpacedElement = styled.div`
  margin-top: 1rem;
  width: 100%;
  display: flex;
  justify-content: center;
`;

type StepType = 'email' | 'otp' | 'reset' | 'success';

interface ApiError {
  message: string;
}

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<StepType>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStep('otp');
      } else {
        const errorData = await response.json() as ApiError;
        setError(errorData.message || 'Erro ao enviar email');
      }
    } catch {
      setError('Erro de conexão');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpComplete = (otpValue: string) => {
    setOtp(otpValue);
    setStep('reset');
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('Senhas não coincidem');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp, newPassword }),
      });

      if (response.ok) {
        setStep('success');
      } else {
        const errorData = await response.json() as ApiError;
        setError(errorData.message || 'Erro ao redefinir senha');
      }
    } catch {
      setError('Erro de conexão');
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormContainer>
      <FormWrapper>
        {step === 'email' && (
          <>
            <Title>Esqueci minha senha</Title>
            <Subtitle>Digite seu email para receber o código de recuperação</Subtitle>
            
            <form onSubmit={handleEmailSubmit} style={{ width: '100%' }}>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              
              {error && <ErrorMessage>{error}</ErrorMessage>}
              
              <SpacedElement>
                <Button type="submit" $fullWidth disabled={loading}>
                  {loading ? 'Enviando...' : 'Enviar código'}
                </Button>
              </SpacedElement>
            </form>
            
            <SpacedElement>
              <Button variant="secondary" onClick={() => router.push('/login')}>
                Voltar ao login
              </Button>
            </SpacedElement>
          </>
        )}

        {step === 'otp' && (
          <>
            <Title>Digite o código</Title>
            <Subtitle>Enviamos um código de 6 dígitos para {email}</Subtitle>
            
            <OtpInput length={6} onComplete={handleOtpComplete} />
            
            {error && <ErrorMessage>{error}</ErrorMessage>}
          </>
        )}

        {step === 'reset' && (
          <>
            <Title>Nova senha</Title>
            <Subtitle>Digite sua nova senha</Subtitle>
            
            <form onSubmit={handlePasswordReset} style={{ width: '100%' }}>
              <Label htmlFor="newPassword">Nova senha</Label>
              <PasswordInput
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              
              <Label htmlFor="confirmPassword">Confirmar senha</Label>
              <PasswordInput
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              
              {error && <ErrorMessage>{error}</ErrorMessage>}
              
              <SpacedElement>
                <Button type="submit" $fullWidth disabled={loading}>
                  {loading ? 'Redefinindo...' : 'Redefinir senha'}
                </Button>
              </SpacedElement>
            </form>
          </>
        )}

        {step === 'success' && (
          <SuccessContainer>
            <CheckIcon />
            <Title>Senha redefinida!</Title>
            <Subtitle>Sua senha foi alterada com sucesso</Subtitle>
            
            <Button onClick={() => router.push('/login')} $fullWidth>
              Fazer login
            </Button>
          </SuccessContainer>
        )}
      </FormWrapper>
    </FormContainer>
  );
}

