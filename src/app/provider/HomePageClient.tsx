'use client'; // must be at the top

import Link from 'next/link';
import React from 'react';
import LinkButton from '../../components/ui/LinkButton';

export default function HomePageClient() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f0f4ff 0%, #e6f7ff 100%)',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <h1
          style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            color: '#1a1a1a',
            marginBottom: '1rem',
          }}
        >
          Welcome to Aidirectory 🚀
        </h1>
        <p
          style={{
            fontSize: '1.25rem',
            color: '#666',
            marginBottom: '2rem',
          }}
        >
          Your AI-powered directory solution
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <LinkButton href="/auth/login" bgColor="#007acc" hoverColor="#005a9e">
            Login
          </LinkButton>
          <LinkButton href="/auth/register" bgColor="#28a745" hoverColor="#1e7e34">
            Register
          </LinkButton>
        </div>
      </div>
    </div>
  );
}


