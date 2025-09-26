'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { PageWrapper, Title as BaseTitle, Section, SectionContent, FieldRow, Label, SectionDescription } from '../../../components/SettingsComponents';
import Button from '../../../components/Button';

const PageHeader = styled.div`
  display: flex;
  align-items: center; /* Garante o alinhamento vertical */
  gap: 1.5rem;
  margin-bottom: 1rem;
`;

const Title = styled(BaseTitle)`
  margin-bottom: 0; /* Remove a margem para corrigir o alinhamento */
`;

const BackButton = styled.button`
    background: #111827;
    color: #ffffff;
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color 0.2s;
    &:hover { background: #4b5563; }
`;

const BackIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>;

const IconWrapper = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// --- Ícones ---
const GoogleCalendarIcon = () => <IconWrapper><svg width="28" height="28" viewBox="0 0 24 24"><path fill="#34A853" d="M12 2.5a.5.5 0 01.5.5v1a.5.5 0 01-1 0v-1a.5.5 0 01.5-.5zM18.5 4a.5.5 0 01.5.5v1a.5.5 0 01-1 0v-1a.5.5 0 01.5-.5zM5.5 4a.5.5 0 01.5.5v1a.5.5 0 01-1 0v-1a.5.5 0 01.5-.5z"></path><path fill="#EA4335" d="M4.34 7.66A1 1 0 015.75 7h12.5a1 1 0 01.91 1.41L18.25 10H5.75L4.34 7.66z"></path><path fill="#4285F4" d="M19.16 11a1 1 0 01.91 1.41l-1.41 2.34A1 1 0 0117.25 15H6.75a1 1 0 01-.91-1.41l1.41-2.34A1 1 0 018.16 11h11z"></path><path fill="#FBBC04" d="M9.07 16l-1.41 2.34A1 1 0 007.57 20h9.86a1 1 0 00.91-1.41L16.93 16H9.07z"></path></svg></IconWrapper>;
const SlackIcon = () => <IconWrapper><svg width="28" height="28" viewBox="0 0 128 128"><path fill="#36C5F0" d="M84.51 93.38v10.51a10.54 10.54 0 01-10.51 10.51H63.49a10.54 10.54 0 01-10.51-10.51V93.38a10.54 10.54 0 0110.51-10.51h10.51a10.54 10.54 0 0110.51 10.51z"></path><path fill="#2EB67D" d="M93.38 84.51h10.51a10.54 10.54 0 0110.51 10.51v10.51a10.54 10.54 0 01-10.51 10.51H93.38a10.54 10.54 0 01-10.51-10.51V95a10.54 10.54 0 0110.51-10.49z"></path><path fill="#ECB22E" d="M34.62 34.62V24.11A10.54 10.54 0 0145.13 13.6h10.51a10.54 10.54 0 0110.51 10.51v10.51a10.54 10.54 0 01-10.51 10.51H45.13a10.54 10.54 0 01-10.51-10.51z"></path><path fill="#E01E5A" d="M25.75 43.49H15.24a10.54 10.54 0 01-10.51-10.51V22.47a10.54 10.54 0 0110.51-10.51h10.51a10.54 10.54 0 0110.51 10.51V33a10.54 10.54 0 01-10.51 10.49z"></path></svg></IconWrapper>;
const DiscordIcon = () => <IconWrapper><svg width="28" height="28" fill="#5865F2" viewBox="0 0 24 24"><path d="M20.22,4.02A12.08,12.08,0,0,0,12,2a12.08,12.08,0,0,0-8.22,2.02,12.2,12.2,0,0,0-2.31,8,12.35,12.35,0,0,0,3.12,8.14,12.43,12.43,0,0,0,8.34,3.84,12.43,12.43,0,0,0,8.34-3.84,12.35,12.35,0,0,0,3.12-8.14,12.2,12.2,0,0,0-2.31-8ZM8.32,15.31a2.24,2.24,0,0,1-2.22-2.22,2.24,2.24,0,0,1,2.22-2.22,2.26,2.26,0,0,1,2.24,2.22,2.25,2.25,0,0,1-2.24,2.22Zm7.3,0a2.24,2.24,0,0,1-2.22-2.22,2.24,2.24,0,0,1,2.22-2.22A2.26,2.26,0,0,1,18,13.09a2.25,2.25,0,0,1-2.24,2.22Z"></path></svg></IconWrapper>;

export default function IntegrationsPage() {
    const router = useRouter();
    return (
        <PageWrapper>
            <PageHeader>
                <BackButton type="button" onClick={() => router.back()}><BackIcon /></BackButton>
                <Title>Integrações</Title>
            </PageHeader>
            <Section>
                <SectionContent>
                    <FieldRow>
                        <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                            <GoogleCalendarIcon />
                            <div>
                                <Label>Google Agenda</Label>
                                <SectionDescription style={{margin: 0}}>Crie eventos para suas turmas.</SectionDescription>
                            </div>
                        </div>
                        <Button variant="primary" $fullWidth={false}>Conectar</Button>
                    </FieldRow>
                    <FieldRow>
                        <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                            <SlackIcon />
                            <div>
                                <Label>Slack</Label>
                                <SectionDescription style={{margin: 0}}>Envie notificações para canais.</SectionDescription>
                            </div>
                        </div>
                        <Button variant="primary" $fullWidth={false}>Conectar</Button>
                    </FieldRow>
                    <FieldRow>
                        <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                            <DiscordIcon />
                            <div>
                                <Label>Discord</Label>
                                <SectionDescription style={{margin: 0}}>Notifique um servidor do Discord.</SectionDescription>
                            </div>
                        </div>
                        <Button variant="primary" $fullWidth={false}>Conectar</Button>
                    </FieldRow>
                </SectionContent>
            </Section>
        </PageWrapper>
    )
}