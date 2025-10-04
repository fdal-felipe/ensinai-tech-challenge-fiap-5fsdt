'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import Button from '../../../../components/Button';
import Modal from '../../../../components/Modal';
import ProfessorList from '../../../../components/ProfessorList';
import { InputGroup, Label, Input } from '../../../../components/FormStyles';

// --- Styled Components ---
const Form = styled.form`
  max-width: 800px;
`;

const PageHeader = styled.div`
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-family: var(--font-inter), serif;
  font-size: 2.25rem;
  font-weight: bold;
  color: #111827;
  margin: 1rem 0 0 0;
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
  &:hover {
    background: #4b5563;
  }
`;

const BackIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    viewBox='0 0 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <line x1='19' y1='12' x2='5' y2='12'></line>
    <polyline points='12 19 5 12 12 5'></polyline>
  </svg>
);

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
  &:focus {
    outline: none;
    border-color: #3b82f6;
  }
`;

const Actions = styled.div`
  margin-top: 2rem;
  display: flex;
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
};


// --- Função auxiliar ---
async function fetchProfessores() {
  const token = localStorage.getItem('token');
  const res = await fetch('http://localhost:3000/users', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  return res.json();
}
type User = {
  id: number;
  name: string;
  email: string;
  password_hash: string;
  role: string;
  created_at: string;
  updated_at: string;
};

// --- Componente ---
export default function NewPostPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author_id, setAuthorId] = useState('');
  const [professores, setProfessores] = useState<User[]>([]);


  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {},
  });

  // Carregar professores ao montar
  useEffect(() => {
    fetchProfessores()
      .then(setProfessores)
      .catch(err => console.error('Erro ao buscar professores:', err));
  }, []);

  const handleProfessorSelect = (id: number) => {
    setAuthorId(String(id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setModalState({
      isOpen: true,
      title: 'Confirmar Publicação',
      message: 'Deseja realmente criar este novo post?',
      onConfirm: handleConfirmCreate,
      confirmText: 'Sim, Publicar',
      cancelText: 'Cancelar',
      confirmVariant: 'success',
    });
  };

  const handleConfirmCreate = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/professor/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content, author_id }),
      });

      if (!res.ok) throw new Error('Erro ao criar post');

      setModalState({
        isOpen: true,
        title: 'Post Criado!',
        message: 'Seu novo post foi criado e publicado com sucesso.',
        onConfirm: () => {
          setModalState({ ...modalState, isOpen: false });
          router.push('/posts');
        },
        confirmText: 'Ok',
        confirmVariant: 'success',
      });
    } catch (err) {
      console.error(err);
      setModalState({
        isOpen: true,
        title: 'Erro',
        message: 'Não foi possível criar o post.',
        onConfirm: () => setModalState({ ...modalState, isOpen: false }),
        confirmText: 'Ok',
        confirmVariant: 'danger',
      });
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <PageHeader>
          <BackButton type='button' onClick={() => router.back()}>
            <BackIcon />
          </BackButton>
          <Title>Criar Novo Post</Title>
        </PageHeader>

        <InputGroup>
          <Label htmlFor='title'>NOME DA MATÉRIA</Label>
          <Input
            type='text'
            id='title'
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder='Ex: Matemática I - Podcast'
          />
        </InputGroup>

<InputGroup style={{ marginTop: '1.5rem' }}>
  <Label htmlFor='author'>AUTOR (Professor)</Label>
  <ProfessorList 
    users={professores} 
    onProfessorSelect={handleProfessorSelect} />
</InputGroup>


        <InputGroup style={{ marginTop: '1.5rem' }}>
          <Label htmlFor='description'>DESCRIÇÃO</Label>
          <TextArea
            id='description'
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder='Descreva a atividade ou o conteúdo do post...'
          />
        </InputGroup>

        <Actions>
          <Button type='submit' variant='success'>
            Publicar
          </Button>
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
