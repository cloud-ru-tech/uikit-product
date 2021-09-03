import { css } from '@linaria/core';
import { styled } from '@linaria/react';

export const Wrapper = styled.span`
  display: inline-flex;
  align-items: center;
  position: relative;
`;

export const statusBadgeClassName = css`
  position: absolute;
  right: -1px;
  bottom: -1px;
`;
