import { styled } from '@linaria/react';

export const Text = styled.span<{ maxLines: number }>`
  overflow: hidden;
  display: -webkit-box;

  margin: 0;

  text-overflow: ellipsis;
  word-break: ${({ maxLines }) => (maxLines === 1 ? 'break-all' : 'initial')};

  -webkit-box-orient: vertical;
  -webkit-line-clamp: ${({ maxLines }) => maxLines};
`;

export const Wrapper = styled.span``;
