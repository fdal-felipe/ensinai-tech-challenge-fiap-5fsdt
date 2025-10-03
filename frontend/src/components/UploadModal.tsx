'use client';
import React from 'react';
import styled from 'styled-components';
import Button from './Button';

// --- Styled Components ---
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  position: relative;
  background-color: white;
  padding: 2rem;
  border-radius: 0.75rem;
  width: 100%;
  max-width: 500px;
  text-align: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  /* AQUI ESTÁ A ALTERAÇÃO: Aumentamos o font-size */
  font-size: 2.5rem; /* Aumentado de 1.5rem para 2.5rem para ficar maior */
  cursor: pointer;
  color: #9ca3af;
  &:hover {
    color: #111827;
  }
`;

const Title = styled.h2`
  font-family: var(--font-inter), serif;
  font-size: 1.5rem;
  color: #111827;
  margin-top: 0;
  margin-bottom: 1.5rem;
`;

const UploadArea = styled.div`
  border: 2px dashed #d1d5db;
  border-radius: 0.5rem;
  padding: 3rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f9fafb;
  margin-bottom: 1.5rem;
`;

const UploadText = styled.p`
  color: #6b7280;
  margin-top: 1rem;
`;

// --- Component Props ---
interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// --- Ícone ---
const UploadCloudIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>;


// --- Component ---
export default function UploadModal({ isOpen, onClose }: UploadModalProps) {
  if (!isOpen) return null;

  const handleFileSelect = () => {
    alert('Arquivo selecionado (simulação)!');
    onClose();
  };
  
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <Title>Alterar Foto do Perfil</Title>
        
        <UploadArea>
          <UploadCloudIcon />
          <UploadText>Arraste e solte uma imagem aqui</UploadText>
          <p style={{ margin: '0.5rem', color: '#9ca3af' }}>ou</p>
          <Button onClick={handleFileSelect} variant="primary" $fullWidth={false}>
            Selecionar do Dispositivo
          </Button>
        </UploadArea>

      </ModalContent>
    </ModalOverlay>
  );
}