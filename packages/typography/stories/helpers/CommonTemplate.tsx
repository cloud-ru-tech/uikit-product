import { css } from '@linaria/core';
import { styled } from '@linaria/react';
import { FC, PropsWithChildren } from 'react';

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const VariantView = css`
  box-sizing: border-box;
  margin-right: 8px !important;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
export type TypographyStoryConfig = Array<{
  name: string;
  Component: FC<PropsWithChildren<{ className?: string }>>;
  styles: string;
}>;
export const commonTemplate =
  (config: TypographyStoryConfig) =>
  ({ value }: { value: string }) => (
    <Wrapper>
      {config.map(({ name, Component }, index) => (
        <Row key={index}>
          <Component className={VariantView}>{name}:</Component>
          <Component>{value}</Component>
        </Row>
      ))}
    </Wrapper>
  );
