// src/components/WIPPage.tsx
'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import Modal from './Modal';

export default function WIPPage() {
  const router = useRouter();

  return (
    <Modal
      isOpen={true} // O modal sempre estará aberto
      onClose={() => router.push('/home')} // Clicar fora também volta para a home
      onConfirm={() => router.push('/home')}
      title="Em Desenvolvimento"
      confirmText="Voltar para a Página Inicial"
      confirmVariant="primary"
    >
      Esta funcionalidade ainda está sendo construída e estará disponível em breve!
    </Modal>
  );
}