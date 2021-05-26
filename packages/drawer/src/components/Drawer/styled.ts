import { css } from '@linaria/core';
import { styled } from '@linaria/react';

import { EXPORT_VARS } from '@sbercloud/uikit-theme';

const { COLORS_DRAWER, COLORS_GENERAL } = EXPORT_VARS;

export const CloseButtonStyled = styled.div`
  cursor: pointer;
  margin: 12px 12px 0 0;
  fill: var(${COLORS_GENERAL.TEXT});
`;

export const LeftIconBoxStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  margin-right: 12px;
  fill: var(${COLORS_GENERAL.TEXT});
`;

export const ContentBoxStyled = styled.div<{ footerPadding: number }>`
  min-height: 100%;
  z-index: -1;
  position: relative;
  padding-top: 74px;
  padding-bottom: ${props => props.footerPadding}px;
  box-sizing: border-box;
`;

export const HeaderTextBoxStyled = styled.div`
  margin-left: 12px;
  display: flex;
  align-items: center;
`;

export const HeaderBoxStyled = styled.div<{ width: string }>`
  z-index: 2;
  position: fixed;
  display: flex;
  justify-content: space-between;
  width: ${props => props.width};
  background: inherit;
  border-bottom: solid 1px var(${COLORS_DRAWER.BORDER_COLOR});
`;

export const FooterBoxStyled = styled.div<{ width: string }>`
  z-index: 2;
  background: inherit;
  padding: 16px 24px;
  border-top: solid 1px var(${COLORS_DRAWER.BORDER_COLOR});
  position: fixed;
  width: ${props => props.width};
  bottom: 0;
`;

export const drawerPaddingModeClassName = css`
  position: absolute !important;
`;

export const drawerClassName = css`
  &:focus {
    outline: none;
  }
`;

export const drawerWrapperClassName = css`
  .drawer-content-wrapper {
    background: var(${COLORS_DRAWER.BACKGROUND});
  }

  .drawer-content {
    width: 100%;
    background: inherit;
  }
`;
