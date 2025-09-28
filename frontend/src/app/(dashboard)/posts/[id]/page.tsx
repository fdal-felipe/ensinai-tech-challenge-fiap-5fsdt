'use client';
import React, { useEffect, useState } from 'react';
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
  const params = useParams();
  const id = params.id as string;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // ✅ Adicione estados para loading e erro
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ Corrija o useEffect com dependências e tratamento de erro
  useEffect(() => {
    const fetchPost = async () => {
      try {
        setFetchLoading(true);
        setError(null);
        
        const res = await fetch(`http://localhost:3000/professor/posts/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
        });
        
        if (!res.ok) {
          throw new Error('Erro ao carregar post');
        }

        const json = await res.json();
        console.log('Dados carregados:', json);
        
        // ✅ Verifique a estrutura real da resposta
        setTitle(json.title || json.nome || '');
        setContent(json.content || json.descricao || json.conteudo || '');
        
      } catch (err) {
        console.error('Erro ao carregar:', err);
        setError('Erro ao carregar post');
      } finally {
        setFetchLoading(false);
      }
    };
    
    if (id) {
      fetchPost();
    }
  }, [id]); // ✅ Adicione id como dependência

  const [modalState, setModalState] = useState<ModalState>({ 
    isOpen: false, 
    title: '', 
    message: '', 
    onConfirm: () => {}, 
  });

  const handleConfirmSave = async () => {
    try {
      setIsLoading(true);
      
      // ✅ Adicione logs para debug
      console.log('Enviando dados:', { title, content });
      
      const res = await fetch(`http://localhost:3000/professor/posts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          title: title,
          content: content,
          author_id: 1,
          status:'ativo'
          // ❌ REMOVA author_id e status se não forem necessários
          // O backend pode não permitir atualizar esses campos
        }),
      });

      console.log('Status da resposta:', res.status);
      
      if (!res.ok) {
        const errorText = await res.text();
        console.error('Erro da API:', errorText);
        throw new Error(`Erro ao atualizar: ${res.status} - ${errorText}`);
      }

      const updated = await res.json();
      console.log("Post atualizado com sucesso:", updated);

      setModalState({
        isOpen: true,
        title: "Post Salvo!",
        message: "As alterações no post foram salvas com sucesso.",
        onConfirm: () => {
          setModalState(prev => ({ ...prev, isOpen: false }));
          router.push("/posts");
        },
        confirmText: "Ok",
        confirmVariant: "success",
      });
    } catch (err: any) {
      console.error('Erro completo:', err);
      setModalState({
        isOpen: true,
        title: "Erro",
        message: `Não foi possível salvar as alterações: ${err.message}`,
        onConfirm: () => setModalState(prev => ({ ...prev, isOpen: false })),
        confirmText: "Fechar",
        confirmVariant: "danger",
      });
    } finally {
      setIsLoading(false);
    }
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
  
    const handleConfirmDelete = async () => {
    try {
      setIsLoading(true);
      
      console.log(`Excluindo post com ID: ${id}`);
      
      const res = await fetch(`http://localhost:3000/professor/posts/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(res)
      console.log('Status da resposta DELETE:', res.status);
      
      if (!res.ok) {
        const errorText = await res.text();
        console.error('Erro na exclusão:', errorText);
        throw new Error(`Erro ao excluir: ${res.status} - ${errorText}`);
      }

      // Tenta obter a resposta como JSON, mas se não houver conteúdo, não faz nada
      let result;
      const contentLength = res.headers.get('content-length');
      if (contentLength && parseInt(contentLength) > 0) {
        result = await res.json();
        console.log("Post excluído com sucesso:", result);
      } else {
        console.log("Post excluído com sucesso (sem conteúdo na resposta)");
      }

      setModalState({
        isOpen: true,
        title: "Post Excluído!",
        message: "O post foi excluído com sucesso.",
        onConfirm: () => {
          setModalState(prev => ({ ...prev, isOpen: false }));
          router.push("/posts");
        },
        confirmText: "Ok",
        confirmVariant: "success",
      });

    } catch (err: any) {
      console.error('Erro na exclusão:', err);
      setModalState({
        isOpen: true,
        title: "Erro na Exclusão",
        message: `Não foi possível excluir o post: ${err.message}`,
        onConfirm: () => setModalState(prev => ({ ...prev, isOpen: false })),
        confirmText: "Fechar",
        confirmVariant: "danger",
      });
    } finally {
      setIsLoading(false);
    }
  };

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

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <PageHeader>
          <BackButton type="button" onClick={() => router.back()}>
            <BackIcon />
          </BackButton>
          <Title>EDITAR POST</Title> {/* ✅ Mudei o título para ficar claro */}
        </PageHeader>
        
        <InputGroup>
          <Label htmlFor="title">TÍTULO</Label>
          <Input 
            type="text"
            id="title" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isLoading}
          /> 
        </InputGroup>

        <InputGroup style={{ marginTop: '1.5rem' }}>
          <Label htmlFor="author">AUTOR</Label>
          <Input type="text" id="author" defaultValue="Prof. Carlos" disabled />
        </InputGroup>

        <InputGroup style={{ marginTop: '1.5rem' }}>
          <Label htmlFor="content">CONTEÚDO</Label>
          <TextArea 
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={isLoading}
          />
        </InputGroup>
        
        <Actions>
          <Button 
            type="button" 
            variant="danger" 
            onClick={handleDelete}
     
          >
            Excluir Post
          </Button>
          
          {/* ✅ Mude para type="submit" e remova o onClick duplicado */}
          <Button 
            type="submit" 
            variant="success" 
          
          >
            {isLoading ? 'Salvando...' : 'Salvar Alterações'}
          </Button>
        </Actions>
      </Form>

      <Modal
        isOpen={modalState.isOpen}
        onClose={() => !isLoading && setModalState(prev => ({ ...prev, isOpen: false }))}
        onConfirm={modalState.onConfirm}
        title={modalState.title}
        confirmText={modalState.confirmText}
        cancelText={modalState.cancelText}
        confirmVariant={modalState.confirmVariant}     >
        {modalState.message}
      </Modal>
    </>
  );
}