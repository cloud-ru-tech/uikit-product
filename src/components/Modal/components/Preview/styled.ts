import { css } from '@linaria/core';
import { styled } from '@linaria/react';

export const previewCloseBtn = css`
  position: absolute;
  top: 24px;
  right: 24px;
  fill: #d2d2d2;
  &:focus,
  &:hover {
    fill: #343f48;
  }
`;

export const Title = styled.div`
  font-size: 20px;
  line-height: 26px;
  margin: 24px;
`;

export const Content = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 24px;
  width: calc(100% - 48px);
  box-sizing: border-box;
  overflow: hidden;

  > * {
    max-width: 100%;
    max-height: 100%;
  }
`;
