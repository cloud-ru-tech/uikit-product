import { css } from '@linaria/core';
import { styled } from '@linaria/react';

import { DEPRECATED_EXPORT_VARS } from '@sbercloud/uikit-theme';

import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

const { COLORS_DRAWER, COLORS_GENERAL } = DEPRECATED_EXPORT_VARS;

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const CloseButtonStyled = styled.div`
  margin: 12px 12px 0 0;
`;

export const LeftIconBoxStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  margin-right: 12px;
  fill: var(${COLORS_GENERAL.TEXT});
`;

export const ContentBoxStyled = styled.div`
  flex-grow: 1;
  z-index: -1;
  position: relative;
  box-sizing: border-box;
  &[data-hasfooter] {
    height: calc(100% - 160px);
    overflow: auto;
  }
`;

export const HeaderTextBoxStyled = styled.div`
  margin-left: 12px;
  display: flex;
  align-items: center;
`;

export const HeaderBoxStyled = styled.div<{ width: string }>`
  top: 0px;
  z-index: 2;
  display: flex;
  position: sticky;
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
  position: sticky;
  width: ${props => props.width};
  bottom: 0;
  box-sizing: border-box;
`;

export const drawerPaddingModeClassName = css`
  position: absolute !important;
`;

export const drawerClassName = css`
  &:focus {
    outline: none;
  }

  .drawer-mask {
    background-color: var(${COLORS.mask});
  }

  &.drawer-open {
    .drawer-mask {
      opacity: 1;
    }
  }
`;

export const drawerWrapperClassName = css`
  .drawer-content-wrapper {
    background: var(${COLORS_DRAWER.BACKGROUND});
  }

  .drawer-content {
    width: 100%;
    background: inherit;
    display: flex;
    flex-direction: column;
  }
`;
