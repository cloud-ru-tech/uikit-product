import { Container, Content, Highlighter } from './styled';
import { ImportanceLevels } from './types';

export type AttentionProps = { children: React.ReactNode; importanceLevel?: ImportanceLevels };

export function Attention({ children, importanceLevel = ImportanceLevels.Normal }: AttentionProps) {
  return (
    <Container>
      <Highlighter data-importance-level={importanceLevel} />
      <Content>{children}</Content>
    </Container>
  );
}

Attention.importanceLevels = ImportanceLevels;
