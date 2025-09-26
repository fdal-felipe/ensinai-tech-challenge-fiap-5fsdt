'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { PageWrapper, Title as BaseTitle, Section, SectionHeader, SectionTitle, SectionContent, FieldRow, Label } from '../../../components/SettingsComponents';
    
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

const SwitchLabel = styled.label`
    position: relative;
    display: inline-block;
    width: 50px;
    height: 28px;
`;
const SwitchInput = styled.input`
    opacity: 0;
    width: 0;
    height: 0;
    &:checked + span { background-color: #16a34a; }
    &:checked + span:before { transform: translateX(22px); }
`;
const Slider = styled.span`
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: .4s;
    border-radius: 34px;
    &:before {
        position: absolute;
        content: "";
        height: 20px;
        width: 20px;
        left: 4px;
        bottom: 4px;
        background-color: white;
        transition: .4s;
        border-radius: 50%;
    }
`;

export default function NotificationsPage() {
    const router = useRouter();
    return (
        <PageWrapper>
            <PageHeader>
                <BackButton type="button" onClick={() => router.back()}><BackIcon /></BackButton>
                <Title>Notificações</Title>
            </PageHeader>
            <Section>
                <SectionHeader>
                    <SectionTitle>Notificações por E-mail</SectionTitle>
                </SectionHeader>
                <SectionContent>
                    <FieldRow>
                        <Label>Quando um aluno comentar em um post meu</Label>
                        <SwitchLabel><SwitchInput type="checkbox" defaultChecked /><Slider /></SwitchLabel>
                    </FieldRow>
                    <FieldRow>
                        <Label>Novidades e atualizações da plataforma Ensinai</Label>
                        <SwitchLabel><SwitchInput type="checkbox" defaultChecked /><Slider /></SwitchLabel>
                    </FieldRow>
                </SectionContent>
            </Section>
        </PageWrapper>
    )
}