import { css } from '@linaria/core';
import { styled } from '@linaria/react';

import { TEXT_2_STYLES, TEXT_4_STYLES } from '@sbercloud/uikit-product-typography';

import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const wrapClassName = css`
  display: block;
`;

export const Document = styled.div`
  padding: 15px 16px 15px 12px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  border: 1px solid var(${COLORS.BORDER});
  color: var(${COLORS.PRIMARY_COLOR});
  background-color: var(${COLORS.BG});
  transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out, border-color 0.2s ease-in-out;
  cursor: pointer;
  box-sizing: border-box;
  position: relative;

  &:hover {
    background-color: var(${COLORS.BG_HOVER});
    border-color: var(${COLORS.BORDER_HOVER});
    color: var(${COLORS.PRIMARY_COLOR_HOVER});
  }

  &:active {
    background-color: var(${COLORS.BG_HOVER});
    border-color: var(${COLORS.BORDER_ACTIVE});
    color: var(${COLORS.PRIMARY_COLOR_ACTIVE});
  }

  &[data-disabled] {
    border-color: var(${COLORS.PRIMARY_COLOR_DISABLED});
    color: var(${COLORS.PRIMARY_COLOR_DISABLED});
    background-color: var(${COLORS.BG});
    cursor: not-allowed;

    * {
      color: var(${COLORS.PRIMARY_COLOR_DISABLED});
    }
  }
`;

export const iconClassName = css`
  margin-right: 12px;
  fill: currentColor;
  flex-shrink: 0;
`;

export const Content = styled.div`
  width: calc(100% - 44px);

  &[data-has-remove] {
    width: calc(100% - 76px);
  }
`;

export const Name = styled.span`
  ${TEXT_2_STYLES};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
`;

export const Info = styled.span`
  ${TEXT_4_STYLES};
  margin-top: 4px;
  color: var(${COLORS.SECONDARY_COLOR});
  display: block;

  span {
    + span {
      &::before {
        content: ' ・ ';
      }
    }
  }
`;

export const removeButtonClassName = css`
  margin-left: 12px;
`;
