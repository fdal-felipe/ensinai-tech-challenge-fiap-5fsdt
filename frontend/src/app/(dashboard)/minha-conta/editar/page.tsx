'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import Button from '../../../../components/Button';
import Modal from '../../../../components/Modal';
import UploadModal from '../../../../components/UploadModal';
import { InputGroup, Label, Input } from '../../../../components/FormStyles';

// --- Styled Components ---
const Form = styled.form` max-width: 800px; `;
const PageHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
`;
const Title = styled.h1`
  font-family: var(--font-lora), serif;
  font-size: 2.25rem;
  font-weight: bold;
  color: #111827;
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
const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid #d1d5db;
  background-color: #ffffff;
  min-height: 120px;
  resize: vertical;
  color: #111827;

  &::placeholder {
    color: #4b5563;
    opacity: 1;
  }

  &:focus { outline: none; border-color: #3b82f6; }
`;
const Actions = styled.div`
  margin-top: 2.5rem;
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;
const ProfilePictureContainer = styled.div`
  position: relative;
  width: 140px;
  height: 140px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  margin-bottom: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  &:hover > img {
    filter: brightness(0.7);
  }

  &:hover > div {
    opacity: 1;
  }
`;
const ProfilePicture = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: filter 0.3s ease;
`;
const UploadIconOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  color: white;
  font-size: 2rem;
`;
const CameraIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>;

// A CORREÇÃO ESTÁ AQUI: `confirmText` e `cancelText` são agora opcionais
type ModalState = {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
  confirmVariant?: 'primary' | 'danger' | 'success';
}

export default function EditAccountPage() {
  const router = useRouter();
  const [name, setName] = useState('Nicholas Gerade');
  const [description, setDescription] = useState('Professor de Matemática e entusiasta de novas tecnologias aplicadas à educação. Foco em gamificação e metodologias ativas.');
  const [confirmModalState, setConfirmModalState] = useState<ModalState>({ 
      isOpen: false, 
      title: '', 
      message: '', 
      onConfirm: () => {}, 
  });
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const handlePhotoUploadClick = () => {
    setIsUploadModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setConfirmModalState({
        isOpen: true,
        title: "Confirmar Alterações",
        message: "Deseja salvar as alterações em sua conta?",
        onConfirm: handleConfirmSave,
        confirmText: "Sim, Salvar",
        cancelText: "Cancelar",
        confirmVariant: "success"
    });
  };

  const handleConfirmSave = () => {
    console.log('Salvando dados:', { name, description });
    // Agora isso não dará mais erro, pois `cancelText` é opcional
    setConfirmModalState({
        isOpen: true,
        title: "Conta Atualizada!",
        message: "Suas informações foram salvas com sucesso.",
        onConfirm: () => {
            setConfirmModalState({ ...confirmModalState, isOpen: false });
            router.push('/minha-conta');
        },
        confirmText: "Ok",
        confirmVariant: "success"
    });
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <PageHeader>
          <BackButton type="button" onClick={() => router.back()}>
            <BackIcon />
          </BackButton>
          <Title>Editar Conta</Title>
        </PageHeader>

        <ProfilePictureContainer onClick={handlePhotoUploadClick}>
            <ProfilePicture src="https://i.pravatar.cc/150?u=nicholasgerade" alt="Foto do Perfil" />
            <UploadIconOverlay>
                <CameraIcon />
            </UploadIconOverlay>
        </ProfilePictureContainer>

        <InputGroup>
          <Label htmlFor="name">NOME</Label>
          <Input 
            type="text" 
            id="name" 
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </InputGroup>

        <InputGroup style={{ marginTop: '1.5rem' }}>
          <Label htmlFor="description">DESCRIÇÃO</Label>
          <TextArea 
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descreva sobre você, sua área de atuação, interesses..."
          />
        </InputGroup>

        <Actions>
          <Button type="button" onClick={handleCancel} variant='primary' $fullWidth={false}>Cancelar</Button>
          <Button type="submit" variant="success">Salvar Alterações</Button>
        </Actions>
      </Form>

      <Modal
        isOpen={confirmModalState.isOpen}
        onClose={() => setConfirmModalState({ ...confirmModalState, isOpen: false })}
        onConfirm={confirmModalState.onConfirm}
        title={confirmModalState.title}
        confirmText={confirmModalState.confirmText}
        cancelText={confirmModalState.cancelText}
        confirmVariant={confirmModalState.confirmVariant}
      >
        {confirmModalState.message}
      </Modal>

      <UploadModal 
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
      />
    </>
  );
}