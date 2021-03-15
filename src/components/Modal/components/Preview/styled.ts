import { css } from '@linaria/core';
import { styled } from '@linaria/react';

import { COLORS_MODAL } from 'theme/color/vars';

export const previewCloseBtn = css`
  position: absolute;
  top: 24px;
  right: 24px;
  fill: #d2d2d2;
  &:focus,
  &:hover {
    fill: #343f48;
    background: transparent !important;
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

export const overlayClassname = css`
  z-index: 99999;
  background-color: transparent;
  top: 44px;
`;

export const contentClassname = css`
  top: 24px;
  left: 26px;
  right: 26px;
  bottom: 24px;
  background: #ededed;
  padding: 0px;
  border: 0px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  background-color: var(${COLORS_MODAL.BG});
`;
