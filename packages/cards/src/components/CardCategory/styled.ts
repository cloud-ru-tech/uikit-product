import { styled } from '@linaria/react';

import { PredefinedDecorIconPrivate } from '@sbercloud/uikit-product-predefined-icons-private';
import { TruncateString } from '@sbercloud/uikit-product-truncate-string';

import { CardCategory } from './CardCategory';
import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './theme';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const Wrapper = styled.div`
  width: 100%;
  min-width: 300px;
  height: 128px;
  box-sizing: border-box;
  background-color: var(${COLORS.background.default});
  border-radius: 8px;
  display: flex;
  overflow: hidden;
  padding: 24px;
  cursor: pointer;
  transition: 0.2s ease-out;
  transition-property: background-color, box-shadow, border;

  &:hover {
    background-color: var(${COLORS.background.hover});
    box-shadow: var(${COLORS.background.shadow});
  }

  &[data-variant=${CardCategory.variants.Outline}] {
    background-color: transparent;
    border: 1px solid var(${COLORS.border.default});
    box-shadow: none;
  }

  &[data-variant=${CardCategory.variants.Outline}]:hover {
    background-color: transparent;
    border: 1px solid var(${COLORS.border.hover});
    box-shadow: none;
  }
`;

export const LeftSide = styled.div`
  display: flex;
  margin-right: 24px;
`;

export const RightSide = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
`;

export const Icon = styled(PredefinedDecorIconPrivate)`
  border-radius: 8px;
  display: inline-flex;
  align-items: center;

  &[data-type=${PredefinedDecorIconPrivate.types.Custom}] {
    fill: var(${COLORS.image.icon});
    background-color: var(${COLORS.image.background});
  }
`;

export const Title = styled(TruncateString)``;

export const Description = styled(TruncateString)`
  color: var(${COLORS.description});
`;
