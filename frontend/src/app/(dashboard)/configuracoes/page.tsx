'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { PageWrapper, Title as BaseTitle, Section, SectionHeader, SectionTitle, SectionDescription, SectionContent, SectionFooter, FieldRow, Label } from '../../../components/SettingsComponents';
import Button from '../../../components/Button';
import Modal from '../../../components/Modal';

// --- Styled Components ---
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

const DangerZone = styled(Section)`
    border-color: #ef4444;
    & > ${SectionHeader}, & > ${SectionFooter} {
        border-color: #fee2e2;
    }
`;

// Corrigindo a cor do texto do dropdown
const Select = styled.select`
  padding: 0.5rem;
  border-radius: 0.375rem;
  border: 1px solid #d1d5db;
  color: #111827; /* Garante que o texto seja preto */
  background-color: #ffffff;
`;

export default function SettingsPage() {
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <PageWrapper>
            <PageHeader>
                <BackButton type="button" onClick={() => router.back()}><BackIcon /></BackButton>
                <Title>Configurações</Title>
            </PageHeader>

            <Section>
                <SectionHeader>
                    <SectionTitle>Preferência de Idioma</SectionTitle>
                </SectionHeader>
                <SectionContent>
                    <FieldRow>
                        <Label>Idioma</Label>
                        <Select name="language">
                            <option value="pt-br">Português (Brasil)</option>
                            <option value="en">English</option>
                            <option value="es">Español</option>
                        </Select>
                    </FieldRow>
                </SectionContent>
            </Section>

            <Section>
                <SectionHeader>
                    <SectionTitle>Alterar Senha</SectionTitle>
                    <SectionDescription>Para sua segurança, recomendamos o uso de uma senha forte.</SectionDescription>
                </SectionHeader>
                <SectionFooter>
                    <Button variant="primary" $fullWidth={false} onClick={() => router.push('/configuracoes/mudar-senha')}>Mudar Senha</Button>
                </SectionFooter>
            </Section>
            
            <DangerZone>
                <SectionHeader>
                    <SectionTitle>Excluir Conta</SectionTitle>
                    <SectionDescription>Esta ação é irreversível. Todos os seus dados serão permanentemente removidos.</SectionDescription>
                </SectionHeader>
                <SectionFooter>
                    <Button variant="danger" $fullWidth={false} onClick={() => setIsModalOpen(true)}>Excluir minha conta</Button>
                </SectionFooter>
            </DangerZone>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={() => alert("Conta excluída! (Simulação)")}
                title="Confirmar Exclusão de Conta"
                confirmText="Sim, excluir minha conta"
                cancelText="Cancelar"
                confirmVariant="danger"
            >
                Você tem certeza absoluta? Esta ação não pode ser desfeita.
            </Modal>
        </PageWrapper>
    )
}