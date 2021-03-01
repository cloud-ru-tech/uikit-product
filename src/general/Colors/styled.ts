import { styled } from '@linaria/react';

export const Wrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
`;

export const Item = styled.div`
  display: flex;
  flex-direction: column;
  margin: 8px;
`;

export const Color = styled.div<{ background: string }>`
  width: 244px;
  height: 120px;
  border-radius: 8px;

  background: ${p => `var(${p.background})`};
`;
