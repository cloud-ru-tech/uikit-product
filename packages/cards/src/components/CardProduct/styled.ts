import { css } from '@linaria/core';
import { styled } from '@linaria/react';

import { Label as UikitLabel } from '@sbercloud/uikit-product-label';
import { TruncateString } from '@sbercloud/uikit-product-truncate-string';
import { ANIMATIONS } from '@sbercloud/uikit-product-utils';

import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './theme';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const Wrapper = styled.div<{ onClick?: () => void }>`
  display: flex;
  flex-direction: column;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  min-width: 246px;
  height: 180px;
  padding: 20px 20px 18px;
  border-radius: 8px;
  background-color: var(${COLORS.background.default});
  transition: ${ANIMATIONS.TRANSITION};
  transition-property: background-color, box-shadow;
  cursor: default;

  &[data-clickable] {
    cursor: pointer;
  }

  &:hover {
    box-shadow: var(${COLORS.background.shadow});
  }
`;

export const cursorPointerClassName = css`
  cursor: pointer;
`;

export const Heading = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 40px;
  min-height: 40px;
  border-radius: 4px;
  background-color: var(${COLORS.image.background});
  fill: var(${COLORS.image.primary.icon});

  svg {
    width: 24px !important;
    height: 24px !important;
  }
`;

export const Description = styled(TruncateString)`
  margin-top: 16px;
  color: var(${COLORS.description});
`;

export const Footer = styled.div`
  display: flex;
  align-items: center;
  margin-top: auto;
  height: 20px;
`;

export const Label = styled(UikitLabel)`
  margin-left: auto;
`;
