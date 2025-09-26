'use client';
import React, { useRef, useState } from 'react';
import styled from 'styled-components';

const OtpContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const OtpInputField = styled.input`
  width: 45px;
  height: 50px;
  text-align: center;
  font-size: 1.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  color: #111827;
  background-color: #f3f4f6;

  &:focus {
    outline: none;
    border-color: #3b82f6;
  }
`;

interface OtpInputProps {
    length?: number;
    onComplete: (otp: string) => void;
}

export default function OtpInput({ length = 6, onComplete }: OtpInputProps) {
    const [otp, setOtp] = useState(new Array(length).fill(''));
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (isNaN(Number(value))) return;

        const newOtp = [...otp];
        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp);

        const combinedOtp = newOtp.join('');
        if(combinedOtp.length === length) {
            onComplete(combinedOtp);
        }

        if (value && index < length - 1 && inputRefs.current[index + 1]) {
            inputRefs.current[index + 1]?.focus();
        }
    };
    
    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0 && inputRefs.current[index - 1]) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    return (
        <OtpContainer>
            {otp.map((value, index) => (
                <OtpInputField
                    key={index}
                    // A atribuição da ref foi envolvida em chaves para corrigir o erro de tipo
                    ref={el => { inputRefs.current[index] = el; }}
                    type="text"
                    value={value}
                    onChange={e => handleChange(index, e)}
                    onKeyDown={e => handleKeyDown(index, e)}
                    maxLength={1}
                />
            ))}
        </OtpContainer>
    );
}