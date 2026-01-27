import { ReactNode } from 'react';

import { LazyProductCodeEditor } from '@cloud-ru/uikit-product-code-editor';

import styles from './styles.module.scss';

type CodeProps = {
  inline?: boolean;
  className?: string;
  children: ReactNode & ReactNode[];
  onCopyClick?(): void;
};

export function Code({ inline, className, children, onCopyClick }: CodeProps) {
  const language = /language-(\w+)/.exec(className || '')?.[1];

  if (!inline) {
    return (
      <LazyProductCodeEditor
        className={styles.wrapper}
        height={200}
        hasHeader
        onCopyClick={onCopyClick}
        language={language}
        value={String(children).replace(/\n$/, '')}
        options={{
          readOnly: true,
          minimap: {
            enabled: false,
          },
        }}
      />
    );
  }

  return <code className={styles.code}>{children}</code>;
}
