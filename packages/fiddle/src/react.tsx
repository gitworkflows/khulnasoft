import React from 'react';
import './elements';

interface KhulnasoftFiddleElement extends HTMLElement {}

interface KhulnasoftFiddleProps {
  entry?: string;
  onLoad?: () => void;
  ref?: (ref: KhulnasoftFiddleElement | null) => void;
}

const TAG_NAME: string = 'khulnasoft-fiddle';

export const KhulnasoftFiddle = (props: KhulnasoftFiddleProps) => <TAG_NAME {...(props as any)} />;
