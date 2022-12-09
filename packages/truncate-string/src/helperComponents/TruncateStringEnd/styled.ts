import { styled } from '@linaria/react';

export const Text = styled.span<{ maxLines: number }>`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin: 0;
  text-overflow: ellipsis;
  word-break: ${({ maxLines }) => (maxLines === 1 ? 'break-all' : 'initial')};
  -webkit-line-clamp: ${({ maxLines }) => maxLines};
`;

export const Wrapper = styled.span``;
