'use client';
import { KhulnasoftComponent, useIsPreviewing } from '@khulnasoft.com/react';
import DefaultErrorPage from 'next/error';

interface KhulnasoftPageProps {
  content: any;
}

export function RenderKhulnasoftContent({ content }: KhulnasoftPageProps) {
  const isPreviewing = useIsPreviewing();

  if (content || isPreviewing) {
    return <KhulnasoftComponent content={content} model="page" />;
  }

  return <DefaultErrorPage statusCode={404} />;
}
