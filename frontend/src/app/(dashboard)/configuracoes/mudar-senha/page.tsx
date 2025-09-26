'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { PageWrapper, Title as BaseTitle } from '../../../../components/SettingsComponents';
import { InputGroup, Label as FormLabel, Input } from '../../../../components/FormStyles';
import Button from '../../../../components/Button';
import Modal from '../../../../components/Modal';

const PageHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 1rem;
`;

const Title = styled(BaseTitle)`
  margin-bottom: 0;
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

const Form = styled.form` max-width: 600px; `;
const Actions = styled.div`
    margin-top: 1.5rem;
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
`;

type ModalState = {
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    confirmText?: string;
    cancelText?: string;
    confirmVariant?: 'primary' | 'danger' | 'success';
}

export default function ChangePasswordPage() {
    const router = useRouter();
    const [modalState, setModalState] = useState<ModalState>({ isOpen: false, title: '', message: '', onConfirm: () => {} });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Abre o modal de confirmação primeiro
        setModalState({
            isOpen: true,
            title: "Confirmar Alteração",
            message: "Você tem certeza que deseja alterar sua senha?",
            onConfirm: handleConfirmSave,
            confirmText: "Sim, Alterar",
            cancelText: "Cancelar",
            confirmVariant: "success"
        });
    };

    const handleConfirmSave = () => {
        console.log("Senha alterada (simulação)");
        // Mostra o modal de sucesso
        setModalState({
            isOpen: true,
            title: "Senha Alterada!",
            message: "Sua senha foi atualizada com sucesso.",
            onConfirm: () => {
                setModalState({ ...modalState, isOpen: false });
                router.push('/configuracoes');
            },
            confirmText: "Ok",
            confirmVariant: "success"
        });
    }

    return(
        <>
            <PageWrapper>
                <PageHeader>
                    <BackButton type="button" onClick={() => router.back()}><BackIcon /></BackButton>
                    <Title>Alterar Senha</Title>
                </PageHeader>
                <Form onSubmit={handleSubmit}>
                    <InputGroup style={{ marginBottom: '1rem' }}>
                        <FormLabel htmlFor="current-password">Senha Atual</FormLabel>
                        <Input type="password" id="current-password" />
                    </InputGroup>
                    <InputGroup style={{ marginBottom: '1rem' }}>
                        <FormLabel htmlFor="new-password">Nova Senha</FormLabel>
                        <Input type="password" id="new-password" />
                    </InputGroup>
                    <InputGroup>
                        <FormLabel htmlFor="confirm-password">Confirmar Nova Senha</FormLabel>
                        <Input type="password" id="confirm-password" />
                    </InputGroup>
                    <Actions>
                        <Button type="button" variant="primary" $fullWidth={false} onClick={() => router.back()}>Cancelar</Button>
                        <Button type="submit" variant="success" $fullWidth={false}>Salvar Nova Senha</Button>
                    </Actions>
                </Form>
            </PageWrapper>

            <Modal
                isOpen={modalState.isOpen}
                onClose={() => setModalState({ ...modalState, isOpen: false })}
                onConfirm={modalState.onConfirm}
                title={modalState.title}
                confirmText={modalState.confirmText}
                cancelText={modalState.cancelText}
                confirmVariant={modalState.confirmVariant}
            >
                {modalState.message}
            </Modal>
        </>
    )
}