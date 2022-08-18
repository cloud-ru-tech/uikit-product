import { ReactMarkdownProps } from 'react-markdown/lib/ast-to-react';

import * as S from './styled';

type BlockquoteProps =
  | keyof JSX.IntrinsicElements
  | (React.ClassAttributes<HTMLQuoteElement> & React.BlockquoteHTMLAttributes<HTMLQuoteElement> & ReactMarkdownProps)
  | undefined;

export function Blockquote(props: BlockquoteProps) {
  if (typeof props === 'object' && 'children' in props) {
    return <blockquote className={S.blackQuoteClassName}>{props.children}</blockquote>;
  }
  return <div />;
}
