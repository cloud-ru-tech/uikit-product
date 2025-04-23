import { ReactNode } from 'react';

import { LazyProductCodeEditor } from '@sbercloud/uikit-product-code-editor';

import styles from './styles.module.scss';

type CodeProps = { inline?: boolean; className?: string; children: ReactNode & ReactNode[] };

export function Code({ inline, className, children }: CodeProps) {
  const language = /language-(\w+)/.exec(className || '')?.[1];

  if (!inline) {
    return (
      <LazyProductCodeEditor
        className={styles.wrapper}
        height={200}
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
