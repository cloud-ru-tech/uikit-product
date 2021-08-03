import { WithSupportProps, extractSupportProps } from '@sbercloud/uikit-utils';

import { Container, Content, Highlighter } from './styled';
import { ImportanceLevels } from './types';

export type AttentionProps = { children: React.ReactNode; importanceLevel?: ImportanceLevels };

export function Attention({
  children,
  importanceLevel = ImportanceLevels.Normal,
  ...rest
}: WithSupportProps<AttentionProps>) {
  return (
    <Container {...extractSupportProps(rest)}>
      <Highlighter data-importance-level={importanceLevel} />
      <Content>{children}</Content>
    </Container>
  );
}

Attention.importanceLevels = ImportanceLevels;
