import { styled } from '@linaria/react';

export const Container = styled.span`
  position: relative;

  overflow: hidden;

  white-space: nowrap;
`;

export const Wrapper = styled.span`
  overflow: hidden;
`;

export const Display = styled.span`
  position: absolute;
  left: 0;

  display: -webkit-box;

  margin: 0;

  -webkit-box-orient: vertical;
`;

export const FullText = styled.span`
  display: -webkit-box;

  margin: 0;

  opacity: 0;

  -webkit-box-orient: vertical;
`;
