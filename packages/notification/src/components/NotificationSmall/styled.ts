import { css } from '@linaria/core';
import { styled } from '@linaria/react';

import { TEXT_2_STYLES } from '@sbercloud/uikit-product-typography';

import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from '../themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  background-color: var(${COLORS.container.background.info});
  border: 1px solid var(${COLORS.container.border.info});
  padding: 7px 11px;
  border-radius: 8px;
  position: relative;
  cursor: default;

  &[data-has-icon] {
    padding-left: 7px;
  }
`;

export const statusIconClassName = css`
  margin-right: 8px;
`;

export const Text = styled.span`
  ${TEXT_2_STYLES};
  color: var(${COLORS.description});
  word-break: break-word;
`;
