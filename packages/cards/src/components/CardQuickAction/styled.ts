import { styled } from '@linaria/react';

import { PlusInterfaceSVG } from '@sbercloud/uikit-product-icons';
import { PredefinedDecorIconPrivate } from '@sbercloud/uikit-product-predefined-icons-private';
import { TruncateString } from '@sbercloud/uikit-product-truncate-string';

import { CardQuickAction } from './CardQuickAction';
import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './theme';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const LeftSide = styled.div`
  display: flex;
  align-items: center;
  margin-right: 24px;
`;

export const MiddleSide = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  flex-grow: 1;
  margin-right: 16px;
  gap: 4px;
`;

export const RightSide = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Icon = styled(PredefinedDecorIconPrivate)`
  border-radius: 8px;

  &[data-type=${PredefinedDecorIconPrivate.types.Custom}] {
    padding: 12px;
    fill: var(${COLORS.image.primary.icon});
    background-color: var(${COLORS.image.primary.background});
  }
`;

export const PlusIcon = styled(PlusInterfaceSVG)`
  fill: var(${COLORS.plus.primary.default});
`;

export const Title = styled(TruncateString)`
  flex-shrink: 0;
  transition: 0.2s ease-out;
  color: var(${COLORS.title.primary.default});
`;

export const Description = styled(TruncateString)`
  flex-shrink: 0;
  color: var(${COLORS.description.primary});
`;

export const Wrapper = styled.div`
  width: 100%;
  min-width: 285px;
  height: 80px;
  box-sizing: border-box;
  background-color: var(${COLORS.background.primary.default});
  border-radius: 8px;
  display: flex;
  padding: 16px;
  cursor: pointer;
  transition: 0.2s ease-out;
  transition-property: background-color, box-shadow, border;

  &:hover {
    background-color: var(${COLORS.background.primary.hover});
    box-shadow: var(${COLORS.background.primary.shadow.hover});
  }

  &:active {
    background-color: var(${COLORS.background.primary.active});
    box-shadow: var(${COLORS.background.primary.shadow.active});
  }

  &[data-variant=${CardQuickAction.variants.Accent}] {
    background-color: var(${COLORS.background.accent.default});
    box-shadow: none;
  }

  &[data-variant=${CardQuickAction.variants.Accent}]:hover {
    background-color: var(${COLORS.background.accent.hover});
    box-shadow: none;
  }

  &[data-variant=${CardQuickAction.variants.Accent}]:active {
    background-color: var(${COLORS.background.accent.active});
    box-shadow: none;
  }

  // Icon styles
  &&[data-variant=${CardQuickAction.variants.Accent}] ${Icon} {
    fill: var(${COLORS.image.accent.icon});
    background-color: var(${COLORS.image.accent.background});
  }

  // PlusIcon styles
  &&:hover ${PlusIcon} {
    fill: var(${COLORS.plus.primary.hover});
  }

  &&:active ${PlusIcon} {
    fill: var(${COLORS.plus.primary.active});
  }

  &&[data-variant=${CardQuickAction.variants.Accent}] ${PlusIcon} {
    fill: var(${COLORS.plus.accent.default});
  }

  &[data-variant=${CardQuickAction.variants.Accent}]:hover ${PlusIcon} {
    fill: var(${COLORS.plus.accent.hover});
  }

  &[data-variant=${CardQuickAction.variants.Accent}]:active ${PlusIcon} {
    fill: var(${COLORS.plus.accent.active});
  }

  // Title styles
  &&:hover ${Title} {
    color: var(${COLORS.title.primary.hover});
  }

  &&:active ${Title} {
    color: var(${COLORS.title.primary.active});
  }

  &&[data-variant=${CardQuickAction.variants.Accent}] ${Title} {
    color: var(${COLORS.title.accent.default});
  }

  &&[data-variant=${CardQuickAction.variants.Accent}]:hover ${Title} {
    color: var(${COLORS.title.accent.hover});
  }

  &&[data-variant=${CardQuickAction.variants.Accent}]:active ${Title} {
    color: var(${COLORS.title.accent.active});
  }

  // Description styles
  &[data-variant=${CardQuickAction.variants.Accent}] ${Description} {
    color: var(${COLORS.description.accent});
  }
`;
