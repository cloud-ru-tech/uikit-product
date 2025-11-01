import { ReactNode } from 'react';

import { Typography } from '@snack-uikit/typography';

import { isReactNode } from '../../utils';

type TextContent = {
  content: ReactNode;
  className?: string;
};

export function TextContent({ content, className }: TextContent) {
  if (isReactNode(content)) {
    return content;
  }

  return <Typography.SansBodyS className={className}>{content}</Typography.SansBodyS>;
}
