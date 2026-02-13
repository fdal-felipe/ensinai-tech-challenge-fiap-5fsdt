'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import Button from '../../../../components/Button';
import Modal from '../../../../components/Modal';
import ProfessorList from '../../../../components/ProfessorList';
import { InputGroup, Label, Input } from '../../../../components/FormStyles';
import { uploadImage } from '@/services/supabase';


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
  justify-content: space-between;
`;
const ImageUploadContainer = styled.div`
  margin-top: 1.5rem;
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const UploadButton = styled.button`
  background: #111827;
  color: white;
  border: none;
  padding: 0.75rem 1.25rem;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background: #374151;
  }
`;

const ImagePreview = styled.img`
  margin-top: 1rem;
  width: 300px;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
`;

const RemoveImageButton = styled.button`
  margin-top: 0.5rem;
  background: transparent;
  color: #ef4444;
  border: none;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;


//FSEIJI  - criando tipo de modal diferentes para cada um dos casos
type ModalType = 'confirm-post' | 'ai-create' | 'success' | 'error';

type ModalState = {
  isOpen: boolean;
  type?: ModalType;
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
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
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

  //FSEIJI armazenar o prompt que será enviado ao API do Agente
const [aiPrompt, setAiPrompt] = useState('');
const [imageFile, setImageFile] = useState<File | null>(null);
const [imagePreview, setImagePreview] = useState<string | null>(null);



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
      type: 'confirm-post',
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

    let imageUrl = null;

    // upload imagem se existir
    if (imageFile) {
      imageUrl = await uploadImage(imageFile);

      if (!imageUrl) {
        alert('Erro ao fazer upload da imagem');
        return;
      }
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/professor/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        content,
        author_id,
        image_url: imageUrl,
      }),
    });

    if (!res.ok) throw new Error('Erro ao criar post');

    setModalState({
      isOpen: true,
      title: 'Post Criado!',
      message: 'Seu novo post foi criado com sucesso.',
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

const generateContent = async (topic: string): Promise<string> => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ai/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },

         body: JSON.stringify({ topic })
      
    });
    if (!response.ok) {
      throw new Error('Erro na resposta da API');
    }
    const data = await response.json();
    return data.content;
  } catch (error) {
    console.error('Erro ao gerar conteúdo com IA:', error);
    throw new Error('Falha ao gerar conteúdo.');
  }
};

function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, '');
}


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
          onProfessorSelect={handleProfessorSelect}
        />
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
      <ImageUploadContainer>
  <Label>IMAGEM DE CAPA</Label>

  <HiddenFileInput
    id="imageUpload"
    type="file"
    accept="image/*"
    onChange={(e) => {
      const file = e.target.files?.[0];
      if (!file) return;

      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }}
  />

  <UploadButton
    type="button"
    onClick={() => {
      document.getElementById('imageUpload')?.click();
    }}
  >
    Selecionar imagem
  </UploadButton>

  {imagePreview && (
    <>
      <ImagePreview src={imagePreview} />

      <RemoveImageButton
        type="button"
        onClick={() => {
          setImageFile(null);
          setImagePreview(null);
        }}
      >
        Remover imagem
      </RemoveImageButton>
    </>
  )}
</ImageUploadContainer>



      <Actions>
        <Button type='submit' variant='success'>
          Publicar
        </Button>

        <Button
          type='button'
          variant='create'
          onClick={async () => {
            if (!title.trim()) {
              alert('Por favor, digite o nome da matéria primeiro.');
              return;
            }
            try {
              const result = await generateContent(title);
              setContent(stripHtml(result));
            } catch (error) {
              console.error('Erro ao gerar conteúdo:', error);
              alert('Erro ao gerar conteúdo com IA. Tente novamente.');
            }
          }}
        >
          Criar com IA 🤖
        </Button>
      </Actions>
    </Form>

    {/* 🔥 MODAL FUNCIONANDO */}
 <Modal
        isOpen={modalState.isOpen}
        title={modalState.title}
        confirmText={modalState.confirmText}
        cancelText={modalState.cancelText}
        confirmVariant={modalState.confirmVariant}
        onConfirm={modalState.onConfirm}
        onClose={() =>
          setModalState(prev => ({ ...prev, isOpen: false }))
        }
      >
        {modalState.message}
      </Modal>
  </>
);
}
