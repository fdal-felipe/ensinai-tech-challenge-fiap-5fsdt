// src/components/SettingsComponents.tsx
'use client'
import styled from 'styled-components'

export const PageWrapper = styled.div`
  max-width: 800px;s
`

export const Title = styled.h1`
  font-family: var(--font-inter), serif;
  font-size: 2.25rem;
  font-weight: bold;
  color: #111827;
  margin-bottom: 2rem;
`

export const Section = styled.section`
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  margin-bottom: 2rem;
`

export const SectionHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
`

export const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
`

export const SectionDescription = styled.p`
  color: #6b7280;
  margin: 0.25rem 0 0 0;
`

export const SectionContent = styled.div`
  padding: 1.5rem;
`

export const SectionFooter = styled.div`
  padding: 1rem 1.5rem;
  background-color: #f9fafb;
  border-top: 1px solid #e5e7eb;
  display: flex;
  justify-content: flex-end;
  border-bottom-left-radius: 0.75rem;
  border-bottom-right-radius: 0.75rem;
`

export const FieldRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
  border-bottom: 1px solid #f3f4f6;

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
  &:first-child {
    padding-top: 0;
  }
`

export const Label = styled.label`
  font-weight: 500;
  color: #374151;
`
