import { css } from '@linaria/core';
import { styled } from '@linaria/react';

import { COLORS_MODAL } from 'theme/color/vars';

export const previewCloseBtn = css`
  position: absolute;
  right: 0px;
  margin-top: 16px;
  margin-right: 28px;
  fill: var(${COLORS_MODAL.PREVIEW_CLOSE_ICON_COLOR}) !important;
  color: var(${COLORS_MODAL.PREVIEW_CLOSE_ICON_COLOR}) !important;
  &:focus,
  &:hover {
    fill: var(${COLORS_MODAL.PREVIEW_CLOSE_ICON_HOVER_COLOR}) !important;
    color: var(${COLORS_MODAL.PREVIEW_CLOSE_ICON_HOVER_COLOR}) !important;
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
  background-color: rgba(52, 63, 72, 0.2);
  top: 44px;
  min-width: 100vw;
  min-height: 100vh;
  left: 0px;
  position: fixed;
`;

export const contentClassname = css`
  position: absolute;
  top: 24px;
  left: 26px;
  right: 26px;
  bottom: 24px;
  padding: 0px;
  border: 0px;
  outline: none;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  background-color: var(${COLORS_MODAL.PREVIEW_BG});
`;
