import { ReactMarkdownProps } from 'react-markdown/lib/ast-to-react';

import { Link as UIKitLink } from '@sbercloud/uikit-product-link';

type LinkProps =
  | (React.ClassAttributes<HTMLAnchorElement> & React.AnchorHTMLAttributes<HTMLAnchorElement> & ReactMarkdownProps)
  | keyof JSX.IntrinsicElements
  | undefined;

export function Link(props: LinkProps) {
  if (typeof props === 'object' && 'children' in props) {
    return <UIKitLink text={String(props.children)} href={props.href || ''} />;
  }
  return <div />;
}
