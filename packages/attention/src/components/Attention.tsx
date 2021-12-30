import { WithSupportProps, extractSupportProps } from '@sbercloud/uikit-utils';

import { Container, Content, Highlighter } from './styled';
import { ImportanceLevels } from './types';

export type AttentionProps = { children: React.ReactNode; importanceLevel?: ImportanceLevels; className?: string };

export function Attention({
  children,
  className,
  importanceLevel = ImportanceLevels.Normal,
  ...rest
}: WithSupportProps<AttentionProps>) {
  return (
    <Container className={className} {...extractSupportProps(rest)}>
      <Highlighter data-importance-level={importanceLevel} />
      <Content>{children}</Content>
    </Container>
  );
}

Attention.importanceLevels = ImportanceLevels;
