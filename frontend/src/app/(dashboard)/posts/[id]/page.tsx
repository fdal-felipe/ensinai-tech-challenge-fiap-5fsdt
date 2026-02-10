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

const CommentsWrapper = styled.div`
  margin-top: 3rem;
`

const CommentBox = styled.div`
  padding: 1rem;
  border-radius: 0.75rem;
  border: 1px solid #e5e7eb;
  margin-bottom: 1rem;
`

const CommentAuthor = styled.div`
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.25rem;
`

const CommentDate = styled.div`
  font-size: 0.75rem;
  color: #6b7280;
  margin-bottom: 0.5rem;
`

const CommentContent = styled.p`
  color: #374151;
  margin: 0;
`

const NewCommentBox = styled.div`
  margin-top: 1.5rem;
`
const CommentTextArea = styled(TextArea)`
  min-height: 80px;
  max-height: 120px;
`;

const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const DeleteCommentButton = styled.button`
  background: transparent;
  border: none;
  color: #ef4444;
  cursor: pointer;
  padding: 0;

  &:hover {
    color: #b91c1c;
  }
`;


const TrashIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14H6L5 6" />
    <path d="M10 11v6" />
    <path d="M14 11v6" />
    <path d="M9 6V4h6v2" />
  </svg>
);


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

interface Comment {
  id: number
  content: string
  post_id: number
  author_id: number
  author_name: string
  author_avatar: string | null
  created_at: string
  updated_at: string | null
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
  const [comments, setComments] = useState<Comment[]>([])
  const [commentsLoading, setCommentsLoading] = useState(true)
  const [newComment, setNewComment] = useState('')
  const [sendingComment, setSendingComment] = useState(false)


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

useEffect(() => {
const fetchComments = async () => {
  try {
    setCommentsLoading(true)

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/posts/${id}/comments`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    )

    if (!res.ok) throw new Error('Erro ao buscar comentários')

    const data: Comment[] = await res.json()
    setComments(data)
  } catch (err) {
    console.error('Erro ao carregar comentários:', err)
  } finally {
    setCommentsLoading(false)
  }
}

if (id) fetchComments()
}, [id])

const handleCreateComment = async () => {
  if (!newComment.trim()) return

  try {
    setSendingComment(true)

    const res = await fetch(
      `https://blog-api-prod-mcw6.onrender.com/posts/${id}/comments`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          content: newComment,
          author_id: `${localStorage.getItem('user_id')}` // 👈 vem do login
        })
      }
    )

    if (!res.ok) {
      throw new Error('Erro ao criar comentário')
    }

    const createdComment = await res.json()

    setComments(prev => [...prev, createdComment])
    setNewComment('')
  } catch (error) {
    console.error('Erro ao criar comentário:', error)
  } finally {
    setSendingComment(false)
  }
}
const [userId, setUserId] = useState<number | null>(null)

useEffect(() => {
  const storedUserId = localStorage.getItem('user_id')
  if (storedUserId) {
    setUserId(Number(storedUserId))
  }
}, [])

const handleDeleteComment = async (commentId: number) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/comments/${commentId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    )
    if (!res.ok) {
      throw new Error('Erro ao excluir comentário')
    }
    // Remove comment from UI
    setComments(prev => prev.filter(c => c.id !== commentId))
  } catch (error) {
    console.error('Erro ao excluir comentário:', error)
  }
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
    <CommentsWrapper>
      <Title>Comentários</Title>

{commentsLoading ? (
  <p>Carregando comentários...</p>
) : comments.length === 0 ? (
  <p>Seja o primeiro a comentar.</p>
) : (
  comments.map(comment => {
    const canDelete =
      comment.author_id === userId || role === 'professor'

    return (
      <CommentBox key={comment.id}>
        <CommentHeader>
          <CommentAuthor>{comment.author_name}</CommentAuthor>

          {canDelete && (
            <DeleteCommentButton
              onClick={() => handleDeleteComment(comment.id)}
              title="Excluir comentário"
            >
              🗑️
            </DeleteCommentButton>
          )}
        </CommentHeader>

        <CommentDate>
          {new Date(comment.created_at).toLocaleString('pt-BR')}
        </CommentDate>

        <CommentContent>{comment.content}</CommentContent>
      </CommentBox>
    )
  })
)}

      <NewCommentBox>
        <CommentTextArea
          placeholder='Escreva um comentário...'
          value={newComment}
          onChange={e => setNewComment(e.target.value)}
          disabled={sendingComment}
        />

        <Actions>
          <Button
            type='button'
            variant='success'
            onClick={handleCreateComment}
            disabled={sendingComment || !newComment.trim()}
          >
            {sendingComment ? 'Enviando...' : 'Comentar'}
          </Button>
        </Actions>
      </NewCommentBox>
    </CommentsWrapper>
    </>
  )
}
