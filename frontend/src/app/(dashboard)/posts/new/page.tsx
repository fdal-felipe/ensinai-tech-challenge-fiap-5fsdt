'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import styled from 'styled-components'
import Button from '../../../../components/Button'
import Modal from '../../../../components/Modal'
import { InputGroup, Label, Input } from '../../../../components/FormStyles'

// --- Styled Components ---
const Form = styled.form`
  max-width: 800px;
`

// Header ajustado para empilhar os elementos
const PageHeader = styled.div`
  margin-bottom: 2rem;
`

const Title = styled.h1`
  font-family: var(--font-inter), serif;
  font-size: 2.25rem;
  font-weight: bold;
  color: #111827;
  margin: 1rem 0 0 0; /* Adiciona margem acima do título */
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
`

const Actions = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: flex-end;
`

type ModalState = {
  isOpen: boolean
  title: string
  message: string
  onConfirm: () => void
  confirmText?: string
  cancelText?: string
  confirmVariant?: 'primary' | 'danger' | 'success'
}

// --- Componente da Página ---
export default function NewPostPage () {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [content, setContent] = useState('')
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {}
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setModalState({
      isOpen: true,
      title: 'Confirmar Publicação',
      message: 'Deseja realmente criar este novo post?',
      onConfirm: handleConfirmCreate,
      confirmText: 'Sim, Publicar',
      cancelText: 'Cancelar',
      confirmVariant: 'success'
    })
  }

  const handleConfirmCreate = () => {
    console.log({ title, author, content })
    setModalState({
      isOpen: true,
      title: 'Post Criado!',
      message: 'Seu novo post foi criado e publicado com sucesso.',
      onConfirm: () => {
        setModalState({
          isOpen: false,
          title: '',
          message: '',
          onConfirm: () => {}
        })
        router.push('/posts')
      },
      confirmText: 'Ok',
      confirmVariant: 'success'
    })
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
          <Label htmlFor='author'>AUTOR</Label>
          <Input
            type='text'
            id='author'
            value={author}
            onChange={e => setAuthor(e.target.value)}
            placeholder='Ex: Prof. Carlos'
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
  )
}
