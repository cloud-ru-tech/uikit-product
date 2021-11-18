import { css } from '@linaria/core';
import { styled } from '@linaria/react';

import { Text2, Text4 } from '@sbercloud/uikit-typography';

import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const wrapClassName = css`
  display: block;
  height: 71px;
  width: 356px;
`;

export const Document = styled.div`
  padding: 16px 16px;
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
    border-color: var(${COLORS.BORDER_ACTIVE});
    color: var(${COLORS.PRIMARY_COLOR_HOVER});
  }

  &:active {
    background-color: var(${COLORS.BG_HOVER});
    border-color: var(${COLORS.BORDER_ACTIVE});
    color: var(${COLORS.PRIMARY_COLOR_ACTIVE});
  }

  &[data-disabled='true'] {
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

export const Content = styled.span`
  width: calc(100% - 44px);
`;

export const Name = styled(Text2)`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
`;

export const Info = styled(Text4)`
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
