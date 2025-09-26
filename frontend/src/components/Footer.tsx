// src/components/Footer.tsx
'use client';
import React from 'react';
import styled from 'styled-components';

const FooterWrapper = styled.footer`
  width: 100%;
  background-color: #1f2937;
  color: white;
  padding: 1rem;
  text-align: center;
  margin-top: 2rem;
`;

export default function Footer() {
  return (
    <FooterWrapper>
      <p>&copy; 2025 Ensinai Blog - Tech Challenge FIAP</p>
    </FooterWrapper>
  );
}