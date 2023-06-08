import { css } from '@linaria/core';
import { styled } from '@linaria/react';

import { PredefinedDecorIconPrivate } from '@sbercloud/uikit-product-predefined-icons-private';
import { TruncateString } from '@sbercloud/uikit-product-truncate-string';

import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './theme';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const Wrapper = styled.div`
  width: 100%;
  min-width: 200px;
  height: 64px;
  box-sizing: border-box;
  background-color: var(${COLORS.background.default});
  border-radius: 8px;
  display: flex;
  align-items: center;
  overflow: hidden;
  padding: 12px;
  cursor: pointer;
  transition: 0.2s ease-out;
  transition-property: background-color, box-shadow;

  &:hover {
    background-color: var(${COLORS.background.hover});
    box-shadow: var(${COLORS.shadow.hover});
  }
`;

export const LeftSide = styled.div`
  display: flex;
  margin-right: 16px;
`;

export const RightSide = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

export const Title = styled(TruncateString)`
  margin: 0 0 4px 0;
  color: var(${COLORS.title});
`;

export const Icon = styled(PredefinedDecorIconPrivate)`
  border-radius: 8px;
`;

export const Pink = css`
  &[data-type=${PredefinedDecorIconPrivate.types.Custom}] {
    fill: var(${COLORS.image.pink.icon});
    background-color: var(${COLORS.image.pink.background});
  }
`;

export const Orange = css`
  &[data-type=${PredefinedDecorIconPrivate.types.Custom}] {
    fill: var(${COLORS.image.orange.icon});
    background-color: var(${COLORS.image.orange.background});
  }
`;

export const Red = css`
  &[data-type=${PredefinedDecorIconPrivate.types.Custom}] {
    fill: var(${COLORS.image.red.icon});
    background-color: var(${COLORS.image.red.background});
  }
`;

export const Violet = css`
  &[data-type=${PredefinedDecorIconPrivate.types.Custom}] {
    fill: var(${COLORS.image.violet.icon});
    background-color: var(${COLORS.image.violet.background});
  }
`;

export const Blue = css`
  &[data-type=${PredefinedDecorIconPrivate.types.Custom}] {
    fill: var(${COLORS.image.blue.icon});
    background-color: var(${COLORS.image.blue.background});
  }
`;

export const Brown = css`
  &[data-type=${PredefinedDecorIconPrivate.types.Custom}] {
    fill: var(${COLORS.image.brown.icon});
    background-color: var(${COLORS.image.brown.background});
  }
`;

export const Green = css`
  &[data-type=${PredefinedDecorIconPrivate.types.Custom}] {
    fill: var(${COLORS.image.green.icon});
    background-color: var(${COLORS.image.green.background});
  }
`;

export const Yellow = css`
  &[data-type=${PredefinedDecorIconPrivate.types.Custom}] {
    fill: var(${COLORS.image.yellow.icon});
    background-color: var(${COLORS.image.yellow.background});
  }
`;

export const SilverGrey = css`
  &[data-type=${PredefinedDecorIconPrivate.types.Custom}] {
    fill: var(${COLORS.image.silver_gray.icon});
    background-color: var(${COLORS.image.silver_gray.background});
  }
`;

export const CharcoalGrey = css`
  &[data-type=${PredefinedDecorIconPrivate.types.Custom}] {
    fill: var(${COLORS.image.charcoal_gray.icon});
    background-color: var(${COLORS.image.charcoal_gray.background});
  }
`;

export const Grass = css`
  &[data-type=${PredefinedDecorIconPrivate.types.Custom}] {
    fill: var(${COLORS.image.grass.icon});
    background-color: var(${COLORS.image.grass.background});
  }
`;

export const Seamount = css`
  &[data-type=${PredefinedDecorIconPrivate.types.Custom}] {
    fill: var(${COLORS.image.seamount.icon});
    background-color: var(${COLORS.image.seamount.background});
  }
`;

export const cursorPointerClassName = css`
  cursor: pointer;
`;
