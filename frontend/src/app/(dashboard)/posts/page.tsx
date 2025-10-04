'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import PostListItem from '../../../components/PostListItem';
import Modal from '../../../components/Modal';

// --- Styled Components (layout novo) ---
const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.5rem;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Title = styled.h1`
  font-family: var(--font-inter), serif;
  font-size: 2rem;
  font-weight: bold;
  color: #111827;
  margin: 0;
`;

const Subtitle = styled.p`
  color: #6b7280;
  margin: 0.25rem 0 0 0;

  @media (max-width: 480px) {
    display: none;
  }
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
  flex-shrink: 0;

  &:hover {
    background: #4b5563;
  }
`;

const BackIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="19" y1="12" x2="5" y2="12"></line>
    <polyline points="12 19 5 12 12 5"></polyline>
  </svg>
);

const PostListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

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
    flex-grow: 1;
    width: auto;
  }

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.4);
  }
`;

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
`;

const PlusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

// --- Tipagem dos posts ---
interface Post {
  id: number;
  title: string;
  content: string;
  author_id: number;
  authorName: string;
  status: string;
  created_at: string;
  updated_at: string;
}

// --- Página Principal ---
export default function PostsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<number | null>(null);
  const role = localStorage.getItem('role');

  async function fetchProfessorById(id: number) {
    const token = localStorage.getItem('token');
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error("Erro ao buscar professor");
    return await response.json();
  }

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const rota = role == 'professor'
          ? `${process.env.NEXT_PUBLIC_API_URL}/professor/posts`
          : `${process.env.NEXT_PUBLIC_API_URL}/aluno/posts`;

        const res = await fetch(rota, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!res.ok) throw new Error('Erro ao buscar posts');
        const data: Post[] = await res.json();

        const enrichedPosts = await Promise.all(
          data.map(async post => {
            try {
              const authorData = await fetchProfessorById(post.author_id);
              return { ...post, authorName: authorData.name };
            } catch {
              return { ...post, authorName: `Autor #${post.author_id}` };
            }
          })
        );

        setPosts(enrichedPosts);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleNavigateToPost = (id: number) => router.push(`/posts/${id}`);
  const handleCreate = () => router.push('/posts/new');

  const handleDeleteClick = (id: number) => {
    setPostToDelete(id);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (postToDelete !== null) {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${postToDelete}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error('Erro ao excluir post');
        setPosts(prev => prev.filter(p => p.id !== postToDelete));
      } catch (err) {
        console.error(err);
      }
    }
    setIsModalOpen(false);
    setPostToDelete(null);
  };

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <PageHeader>
        <TitleContainer>
          <BackButton type="button" onClick={() => router.push('/home')}>
            <BackIcon />
          </BackButton>
          <div>
            <Title>Posts</Title>
            <Subtitle>Abaixo são mostrados os últimos posts criados</Subtitle>
          </div>
        </TitleContainer>

        <ActionsContainer>
          <SearchInput
            type="text"
            placeholder="Buscar por palavra-chave..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          {role == 'professor' && (
            <AddPostButton onClick={handleCreate} aria-label="Criar novo post">
              <PlusIcon />
            </AddPostButton>
          )}
        </ActionsContainer>
      </PageHeader>

      <PostListContainer>
        {loading ? (
          <p>Carregando posts...</p>
        ) : filteredPosts.length === 0 ? (
          <p>Nenhum post encontrado.</p>
        ) : (
          filteredPosts.map(post => (
            <PostListItem
              key={post.id}
              title={post.title}
              author={post.authorName}
              description={post.content}
              onClick={() => handleNavigateToPost(post.id)}
              //onDelete={() => handleDeleteClick(post.id)}
            />
          ))
        )}
      </PostListContainer>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Confirmar Exclusão"
        confirmText="Sim, Excluir"
        cancelText="Cancelar"
        confirmVariant="danger"
      >
        Tem certeza que deseja excluir este post? Esta ação não pode ser desfeita.
      </Modal>
    </>
  );
}
