import { ReactNode } from 'react';
import { PrismLight } from 'react-syntax-highlighter';
import bash from 'react-syntax-highlighter/dist/cjs/languages/prism/bash';
import jsx from 'react-syntax-highlighter/dist/cjs/languages/prism/jsx';
import python from 'react-syntax-highlighter/dist/cjs/languages/prism/python';
import { prism } from 'react-syntax-highlighter/dist/cjs/styles/prism';

PrismLight.registerLanguage('python', python);
PrismLight.registerLanguage('jsx', jsx);
PrismLight.registerLanguage('bash', bash);

import * as S from './styled';

type CodeProps = { className?: string; children: ReactNode & ReactNode[] };

export function Code({ className, children }: CodeProps) {
  const language = /language-(\w+)/.exec(className || '')?.[1];

  return (
    <PrismLight className={S.prismClassName} style={prism} language={language} PreTag='div'>
      {String(children).replace(/\n$/, '')}
    </PrismLight>
  );
}
