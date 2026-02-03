'use client'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Button from '../../../../components/Button'
import Modal from '../../../../components/Modal'
import { InputGroup, Label, Input } from '../../../../components/FormStyles'
import { useRouter, useParams } from 'next/navigation'

const Form = styled.form`
  max-width: 800px;
`
const PageHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
`
const Title = styled.h1`
  font-family: var(--font-inter), serif;
  font-size: 1.7rem;
  font-weight: bold;
  color: #111827;
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
    viewBox='0 0 24 24'
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
  justify-content: space-between;
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

// Tipos para melhor tipagem
interface ApiError extends Error {
  message: string;
}

interface PostData {
  title: string;
  content: string;
  author_id: number;
}

interface UserData {
  name: string;
}

export default function EditPostPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  const [role, setRole] = useState<string | null>(null)  // Adicionado: useState para role

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [authorId, setAuthorId] = useState<number | null>(null)
  const [authorName, setAuthorName] = useState('')

  const [isLoading, setIsLoading] = useState(false)
  const [fetchLoading, setFetchLoading] = useState(true)

  // Adicionado: useEffect para acessar localStorage no cliente
  useEffect(() => {
    setRole(localStorage.getItem('role'))
  }, [])


  // --- 🔹 Buscar post existente ---
  useEffect(() => {
    const fetchPost = async () => {
      try {
        setFetchLoading(true)

        const rota =
          role === 'professor'
            ? `${process.env.NEXT_PUBLIC_API_URL}/professor/posts/`
            : `${process.env.NEXT_PUBLIC_API_URL}/aluno/posts/`

        const res = await fetch(`${rota}${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })

        const json: PostData = await res.json()

        setTitle(json.title || '')
        setDescription(json.content || '')
        setAuthorId(json.author_id || null)
      } catch (err) {
        console.error('Erro ao carregar post:', err)
      } finally {
        setFetchLoading(false)
      }
    }

    if (id) fetchPost()
  }, [id, role])

  // --- 🔹 Buscar nome do autor ---
  useEffect(() => {
    const fetchAuthor = async () => {
      if (!authorId) return
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${authorId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        const user: UserData = await res.json()
        setAuthorName(user.name || `Autor #${authorId}`)
      } catch (err) {
        console.error('Erro ao buscar autor:', err)
        setAuthorName(`Autor #${authorId}`)
      }
    }

    fetchAuthor()
  }, [authorId])

  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {}
  })

  // --- 🔹 Salvar post ---
  const handleConfirmSave = async () => {
    try {
      setIsLoading(true)

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/professor/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          title,
          content: description,
          status: 'ativo'
        })
      })

      if (!res.ok) throw new Error('Erro ao salvar post.')

      setModalState({
        isOpen: true,
        title: 'Post Salvo!',
        message: 'As alterações foram salvas com sucesso.',
        onConfirm: () => {
          setModalState(prev => ({ ...prev, isOpen: false }))
          router.push('/posts')
        },
        confirmText: 'Ok',
        confirmVariant: 'success'
      })
    } catch (err) {
      const error = err as ApiError
      setModalState({
        isOpen: true,
        title: 'Erro',
        message: `Não foi possível salvar o post: ${error.message}`,
        onConfirm: () => setModalState(prev => ({ ...prev, isOpen: false })),
        confirmText: 'Fechar',
        confirmVariant: 'danger'
      })
    } finally {
      setIsLoading(false)
    }
  }

  // --- 🔹 Excluir post ---
  const handleConfirmDelete = async () => {
    try {
      setIsLoading(true)
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/professor/posts/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })

      if (!res.ok) throw new Error('Erro ao excluir post.')

      setModalState({
        isOpen: true,
        title: 'Post Excluído!',
        message: 'O post foi excluído com sucesso.',
        onConfirm: () => {
          setModalState(prev => ({ ...prev, isOpen: false }))
          router.push('/posts')
        },
        confirmText: 'Ok',
        confirmVariant: 'success'
      })
    } catch (err) {
      const error = err as ApiError
      setModalState({
        isOpen: true,
        title: 'Erro na Exclusão',
        message: `Não foi possível excluir o post: ${error.message}`,
        onConfirm: () => setModalState(prev => ({ ...prev, isOpen: false })),
        confirmText: 'Fechar',
        confirmVariant: 'danger'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setModalState({
      isOpen: true,
      title: 'Confirmar Alterações',
      message: 'Deseja realmente salvar as alterações neste post?',
      onConfirm: handleConfirmSave,
      confirmText: 'Sim, Salvar',
      cancelText: 'Cancelar',
      confirmVariant: 'success'
    })
  }

  const handleDelete = () => {
    setModalState({
      isOpen: true,
      title: 'Confirmar Exclusão',
      message:
        'Tem certeza que deseja excluir este post? Esta ação não pode ser desfeita.',
      onConfirm: handleConfirmDelete,
      confirmText: 'Sim, Excluir',
      cancelText: 'Cancelar',
      confirmVariant: 'danger'
    })
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <PageHeader>
          <BackButton type='button' onClick={() => router.back()}>
            <BackIcon />
          </BackButton>
          {role == 'professor' ? (
              <Title>Editar Post</Title>
            ) : (
              <Title>Ler Post</Title>
            )}
        </PageHeader>

        <InputGroup>
          <Label htmlFor='title'>NOME DA MATÉRIA</Label>
          <Input
            type='text'
            id='title'
            value={title}
            onChange={e => setTitle(e.target.value)}
            disabled={isLoading || fetchLoading}
          />
        </InputGroup>

        <InputGroup style={{ marginTop: '1.5rem' }}>
          <Label htmlFor='author'>AUTOR</Label>
          <Input
            type='text'
            id='author'
            value={authorName ? `Professor ${authorName}` : 'Carregando...'}
            disabled
          />
        </InputGroup>

        <InputGroup style={{ marginTop: '1.5rem' }}>
          <Label htmlFor='description'>DESCRIÇÃO</Label>
          <TextArea
            id='description'
            value={description}
            onChange={e => setDescription(e.target.value)}
            disabled={isLoading || fetchLoading}
          />
        </InputGroup>

        {role == 'professor' && (
          <Actions>
            <Button
              type='button'
              variant='danger'
              onClick={handleDelete}
              // disabled={isLoading}
            >
              Excluir Post
            </Button>
            <Button type='submit' variant='success'>
              {isLoading ? 'Salvando...' : 'Salvar Alterações'}
            </Button>
          </Actions>
        )}
      </Form>

      <Modal
        isOpen={modalState.isOpen}
        onClose={() =>
          !isLoading && setModalState(prev => ({ ...prev, isOpen: false }))
        }
        onConfirm={modalState.onConfirm}
        title={modalState.title}
        confirmText={modalState.confirmText}
        cancelText={modalState.cancelText}
        confirmVariant={modalState.confirmVariant}
      >
        {modalState.message}
      </Modal>
      <div>
        <p>comemtários </p>
      </div>
    </>
  )
}
