import { css } from '@linaria/core';
import { styled } from '@linaria/react';

export const TextOneLine = styled.span`
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const TextMultiLine = styled.span<{ maxLines: number }>`
  display: -webkit-box;

  margin: 0;
  overflow: hidden;

  text-overflow: ellipsis;
  word-break: initial;

  -webkit-box-orient: vertical;
  -webkit-line-clamp: ${({ maxLines }) => maxLines};
`;

export const tooltipTriggerClassName = css`
  display: grid;
`;
