'use client';
import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../../../../components/Button';
import Modal from '../../../../components/Modal';
import { InputGroup, Label, Input } from '../../../../components/FormStyles';
// 1. Importe o useParams junto com o useRouter
import { useRouter, useParams } from 'next/navigation';

// --- Styled Components (sem alterações) ---
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
  color: #111827;
  font-size: 1rem;
  font-family: inherit;
  min-height: 200px;
  resize: vertical;
  &:focus { outline: none; border-color: #3b82f6; }
`;
const Actions = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: space-between;
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

// 2. Remova `params` das props da função
export default function EditPostPage() {
  const router = useRouter();
  const params = useParams(); // 3. Use o hook para obter os parâmetros
  const id = params.id as string; // 4. Extraia o id
  
  const [modalState, setModalState] = useState<ModalState>({ 
      isOpen: false, 
      title: '', 
      message: '', 
      onConfirm: () => {}, 
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setModalState({
      isOpen: true,
      title: 'Confirmar Alterações',
      message: 'Deseja realmente salvar as alterações feitas neste post?',
      onConfirm: handleConfirmSave,
      confirmText: 'Sim, Salvar',
      cancelText: 'Cancelar',
      confirmVariant: 'success'
    });
  };
  
  const handleConfirmSave = () => {
    // 5. Agora você pode usar `id` aqui sem problemas
    console.log(`Salvando as alterações do post ${id}...`);
    setModalState({
      isOpen: true,
      title: 'Post Salvo!',
      message: 'As alterações no post foram salvas com sucesso.',
      onConfirm: () => {
        setModalState({ ...modalState, isOpen: false });
        router.push('/posts');
      },
      confirmText: 'Ok',
      confirmVariant: 'success'
    });
  };

  const handleDelete = () => {
    setModalState({
      isOpen: true,
      title: 'Confirmar Exclusão',
      message: 'Tem certeza que deseja excluir este post? Esta ação não pode ser desfeita.',
      onConfirm: handleConfirmDelete,
      confirmText: 'Sim, Excluir',
      cancelText: 'Cancelar',
      confirmVariant: 'danger'
    });
  };
  
  const handleConfirmDelete = () => {
      // E aqui também
      console.log(`Excluindo post com ID: ${id}`);
      setModalState({ ...modalState, isOpen: false });
      router.push('/posts');
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <PageHeader>
          <BackButton type="button" onClick={() => router.back()}>
            <BackIcon />
          </BackButton>
          <Title>Matemática I - Podcast</Title>
        </PageHeader>
        
        <InputGroup>
          <Label htmlFor="title">NOME DA MATÉRIA</Label>
          <Input type="text" id="title" defaultValue="Matemática I - Podcast" />
        </InputGroup>

        <InputGroup style={{ marginTop: '1.5rem' }}>
          <Label htmlFor="author">AUTOR</Label>
          <Input type="text" id="author" defaultValue="Prof. Carlos" />
        </InputGroup>

        <InputGroup style={{ marginTop: '1.5rem' }}>
          <Label htmlFor="description">DESCRIÇÃO</Label>
          <TextArea 
            id="description"
            defaultValue="Nesta atividade os alunos devem ouvir o podcast: Matemática - Sua história desde as origens. Criar uma resenha e entregar a atividade no portal da matéria respectiva."
          />
        </InputGroup>
        
        <Actions>
          <Button type="button" variant="danger" onClick={handleDelete}>Excluir Post</Button>
          <Button type="submit" variant="success">Salvar Alterações</Button>
        </Actions>
      </Form>

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
  );
}