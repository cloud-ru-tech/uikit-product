import { styled } from '@linaria/react';

export const Wrapper = styled.span`
  display: inline-flex;
  flex-direction: column;
  max-width: 100%;
  position: relative;
  overflow: hidden;
  white-space: nowrap;
`;

export const TruncatedText = styled.span`
  position: absolute;
  left: 0;
  display: -webkit-box;
  margin: 0;
  -webkit-box-orient: vertical;
  width: fit-content;
  max-width: 100%;
`;

export const FullText = styled.span`
  display: -webkit-box;
  margin: 0;
  opacity: 0;
  -webkit-box-orient: vertical;
  width: fit-content;
  max-width: 100%;
`;
