// src/components/Header.tsx
'use client';
import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const HeaderWrapper = styled.header`
  width: 100%;
  background-color: #1f2937;
  color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
`;

const Nav = styled.nav`
  a {
    margin: 0 0.5rem;
    color: white;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

export default function Header() {
  return (
    <HeaderWrapper>
      <Logo>Ensinai Blog</Logo>
      <Nav>
        <Link href="/">Home</Link>
        <Link href="/admin">Admin</Link>
        <Link href="/login">Login</Link>
      </Nav>
    </HeaderWrapper>
  );
}