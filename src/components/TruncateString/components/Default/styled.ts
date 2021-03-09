import { styled } from '@linaria/react';

export const Wrapper = styled.div`
  position: relative;
  display: block;
  overflow: hidden;
  white-space: nowrap;
`;

export const Display = styled.div`
  position: absolute;
  left: 0;
  top: 0;
`;

export const FullText = styled.div`
  opacity: 0;
`;
