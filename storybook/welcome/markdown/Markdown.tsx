import './theme/style.css';

import { CSSProperties, ReactNode } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

import { Brand, useBrand } from '@sbercloud/uikit-product-utils';

import { dark } from './theme/code/dark';
import { light } from './theme/code/light';

type MarkdownProps = {
  md: string;
};

const BRAND_MAP: Record<Brand, { [key: string]: CSSProperties }> = {
  [Brand.Cloud]: light,
  [Brand.MLSpace]: light,
  [Brand.Admin]: light,
  [Brand.Site]: light,
  [Brand.CloudDark]: dark,
  [Brand.MLSpaceDark]: dark,
  [Brand.AdminDark]: dark,
  [Brand.SiteDark]: dark,
};

export function Markdown(props: MarkdownProps) {
  const { brand } = useBrand();

  return (
    <ReactMarkdown
      className={'markdown-body'}
      components={{
        code({ inline, className, children, ...rest }: { inline?: boolean; className?: string; children?: ReactNode }) {
          const match = /language-(\w+)/.exec(className || '');

          return !inline && match ? (
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            <SyntaxHighlighter style={BRAND_MAP[brand]} language={match[1]} PreTag='div' {...rest}>
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
      }}
    >
      {props.md}
    </ReactMarkdown>
  );
}
