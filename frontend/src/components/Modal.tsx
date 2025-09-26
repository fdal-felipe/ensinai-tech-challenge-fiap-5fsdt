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
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 0.75rem;
  box-shadow: 0 10px 25px -5px rgb(0 0 0 / 0.1);
  width: 100%;
  max-width: 500px;
  text-align: center;
`;

const ModalTitle = styled.h2`
  font-family: var(--font-lora), serif;
  font-size: 1.5rem;
  color: #111827;
  margin-top: 0;
  margin-bottom: 1rem;
`;

const ModalMessage = styled.p`
  color: #4b5563;
  margin-bottom: 2rem;
  line-height: 1.5;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

// --- Component Props ---
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  title: string;
  children: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  confirmVariant?: 'primary' | 'danger' | 'success';
}

// --- Component ---
export default function Modal({ 
    isOpen, 
    onClose, 
    onConfirm, 
    title, 
    children, 
    confirmText, 
    cancelText, 
    confirmVariant = 'primary'
}: ModalProps) {
  if (!isOpen) return null;

  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={handleContentClick}>
        <ModalTitle>{title}</ModalTitle>
        <ModalMessage>{children}</ModalMessage>
        <ModalFooter>
          {/* A prop $fullWidth foi movida para o lugar correto */}
          {cancelText && <Button onClick={onClose} variant="primary" $fullWidth={false}>{cancelText}</Button>}
          {confirmText && <Button onClick={onConfirm} variant={confirmVariant}> {confirmText} </Button>}
        </ModalFooter>
      </ModalContent>
    </ModalOverlay>
  );
}