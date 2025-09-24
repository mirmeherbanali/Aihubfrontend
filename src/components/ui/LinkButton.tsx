'use client';
import Link from 'next/link';
import React from 'react';

export default function LinkButton({
  href,
  children,
  bgColor,
  hoverColor,
}: {
  href: string;
  children: React.ReactNode;
  bgColor: string;
  hoverColor: string;
}) {
  const [hover, setHover] = React.useState(false);

  return (
    <Link
      href={href}
      style={{
        backgroundColor: hover ? hoverColor : bgColor,
        color: 'white',
        padding: '0.75rem 1.5rem',
        borderRadius: '6px',
        textDecoration: 'none',
        fontWeight: 500,
        transition: 'background-color 0.2s',
      }}
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}
    >
      {children}
    </Link>
  );
}
