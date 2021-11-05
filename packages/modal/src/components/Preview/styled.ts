import { css } from '@linaria/core';
import { styled } from '@linaria/react';

import { DEPRECATED_EXPORT_VARS } from '@sbercloud/uikit-theme';

const { COLORS_MODAL } = DEPRECATED_EXPORT_VARS;

export const previewCloseButton = css`
  position: absolute;
  top: 27px;
  right: 24px;
`;

export const Title = styled.div`
  font-size: 20px;
  line-height: 26px;
`;

export const TitleRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 24px 56px 24px 24px;
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

export const overlayClassName = css`
  z-index: 99999;
  position: fixed;
  top: 0;
  left: 0;
  min-width: 100%;
  min-height: 100%;
  background-color: rgba(52, 63, 72, 0.2);
`;

export const overlayParentClassname = css`
  position: absolute;
`;

export const modalClassName = css`
  position: absolute;
  top: 24px;
  left: 26px;
  right: 26px;
  bottom: 24px;
  padding: 0;
  border: 0;
  outline: none;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  background-color: var(${COLORS_MODAL.PREVIEW_BG});
`;
