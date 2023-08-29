import { css } from '@linaria/core';
import { styled } from '@linaria/react';

import { TEXT_2_STYLES } from '@sbercloud/uikit-product-typography';

import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  background: var(${COLORS.BACKGROUND});
  box-sizing: border-box;
  width: 346px;
  padding: 24px;
  border-radius: 8px;
`;

export const InputsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const rangeInputClassName = css`
  width: 100%;
`;

export const Switch = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Label = styled.span`
  ${TEXT_2_STYLES};
`;

export const ChipsWrapper = styled.div`
  display: flex;
  gap: 8px;
`;
