import { css } from '@linaria/core';
import { styled } from '@linaria/react';
import { EXPORT_VARS } from '@sbercloud/uikit-theme';

const { COLORS_MODAL } = EXPORT_VARS;

export const closeButtonStyle = css`
  position: absolute;
  top: 16px;
  right: 16px;
`;

export const Title = styled.div`
  color: var(${COLORS_MODAL.TITLE_COLOR});
  font-size: 20px;
  line-height: 26px;
  margin-bottom: 16px;
  word-wrap: break-word;
`;

export const Description = styled.div`
  color: var(${COLORS_MODAL.DESCRIPTION_COLOR});
  word-wrap: break-word;
`;

export const ButtonWrapper = styled.div`
  margin-top: 40px;
`;

export const buttonCSS = css`
  margin-right: 8px;
`;

export const contentClassname = css`
  position: absolute;
  top: 50%;
  left: 50%;
  right: auto;
  bottom: auto;
  margin-right: -50%;
  transform: translate(-50%, -50%);
  width: 316px;
  padding: 32px;
  border: 0;
  outline: none;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  background-color: var(${COLORS_MODAL.BG});
`;

export const overlayClassname = css`
  z-index: 99999;
  background-color: rgba(52, 63, 72, 0.2);
  min-width: 100vw;
  min-height: 100vh;
  top: 0;
  left: 0;
`;
