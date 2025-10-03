// src/app/(dashboard)/posts/page.tsx
'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import styled from 'styled-components'
import PostListItem from '../../../components/PostListItem'
import Modal from '../../../components/Modal'

// --- Styled Components ---
const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;

  /* Em telas menores, o cabeçalho vira uma coluna */
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.5rem;
  }
`

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem; /* Reduzido o gap para mobile */
`

const Title = styled.h1`
  font-family: var(--font-inter), serif;
  font-size: 2rem; /* Título um pouco menor no mobile */
  font-weight: bold;
  color: #111827;
  margin: 0;
`

const Subtitle = styled.p`
  color: #6b7280;
  margin: 0.25rem 0 0 0;
  /* Oculta o subtítulo em telas muito pequenas para economizar espaço */
  @media (max-width: 480px) {
    display: none;
  }
`

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
  flex-shrink: 0;
  &:hover {
    background: #4b5563;
  }
`

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
)

const PostListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 768px) {
    width: 100%; /* Ocupa a largura toda no mobile */
  }
`

const SearchInput = styled.input`
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid #d1d5db;
  background-color: #ffffff;
  color: #111827;
  font-size: 1rem;
  width: 250px;
  transition: border-color 0.2s, box-shadow 0.2s;

  @media (max-width: 768px) {
    flex-grow: 1; /* Faz o campo de busca crescer e ocupar o espaço */
    width: auto;
  }

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.4);
  }
`

const AddPostButton = styled.button`
  background-color: #16a34a;
  color: white;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  transition: background-color 0.2s, transform 0.2s;
  flex-shrink: 0;

  &:hover {
    background-color: #15803d;
    transform: scale(1.05);
  }
`

const PlusIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    viewBox='0 0 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='3'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <line x1='12' y1='5' x2='12' y2='19'></line>
    <line x1='5' y1='12' x2='19' y2='12'></line>
  </svg>
)

export default function PostsPage () {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [postToDelete, setPostToDelete] = useState<number | null>(null)

  const posts = [
    {
      id: 1,
      title: 'Matemática I - Podcast',
      author: 'Prof. Carlos',
      description:
        'Uma introdução à história da matemática através de um podcast interativo.'
    },
    {
      id: 2,
      title: 'Matemática II - Livro',
      author: 'Prof. Carlos',
      description: 'Leitura e resumo do capítulo 5 do livro-base da disciplina.'
    },
    {
      id: 3,
      title: 'Inglês III - Listening',
      author: 'Prof. Ana',
      description: 'Atividade de escuta e interpretação de diálogos em inglês.'
    },
    {
      id: 4,
      title: 'Física VI - Artigo Científico',
      author: 'Prof. Pedro',
      description: 'Análise e apresentação de um artigo sobre física quântica.'
    }
  ]

  const handleNavigateToPost = (id: number) => router.push(`/posts/${id}`)
  const handleCreate = () => router.push('/posts/new')

  const handleDeleteClick = (id: number) => {
    setPostToDelete(id)
    setIsModalOpen(true)
  }

  const handleConfirmDelete = () => {
    if (postToDelete !== null) {
      console.log(`Excluindo post com ID: ${postToDelete}`)
    }
    setIsModalOpen(false)
    setPostToDelete(null)
  }

  return (
    <>
      <PageHeader>
        <TitleContainer>
          <BackButton type='button' onClick={() => router.push('/home')}>
            <BackIcon />
          </BackButton>
          <div>
            <Title>Posts</Title>
            <Subtitle>Abaixo são mostrados os últimos posts criados</Subtitle>
          </div>
        </TitleContainer>
        <ActionsContainer>
          <SearchInput
            type='text'
            placeholder='Buscar por palavra-chave...'
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          <AddPostButton onClick={handleCreate} aria-label='Criar novo post'>
            <PlusIcon />
          </AddPostButton>
        </ActionsContainer>
      </PageHeader>
      <PostListContainer>
        {posts.map(post => (
          <PostListItem
            key={post.id}
            title={post.title}
            author={post.author}
            description={post.description}
            onClick={() => handleNavigateToPost(post.id)}
            onDelete={() => handleDeleteClick(post.id)}
          />
        ))}
      </PostListContainer>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title='Confirmar Exclusão'
        confirmText='Sim, Excluir'
        cancelText='Cancelar'
        confirmVariant='danger'
      >
        Tem certeza que deseja excluir este post? Esta ação não pode ser
        desfeita.
      </Modal>
    </>
  )
}
