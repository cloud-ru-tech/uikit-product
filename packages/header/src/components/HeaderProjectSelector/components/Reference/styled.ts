import { styled } from '@linaria/react';

import { DropdownDownInterfaceSVG } from '@sbercloud/uikit-product-icons';
import { ANIMATIONS } from '@sbercloud/uikit-product-utils';

import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const Wrapper = styled.button`
  align-items: center;
  background-color: var(${COLORS.background.default});
  border-radius: 28px;
  border: 1px solid var(${COLORS.border.default});
  color: var(${COLORS.text.default});
  column-gap: 8px;
  cursor: pointer;
  display: flex;
  margin: 0;
  outline: none;
  padding: 4px 8px;
  transition: border-color ${ANIMATIONS.TRANSITION};
  width: fit-content;

  &:focus-visible,
  &:hover {
    border-color: var(${COLORS.border.hover});
  }

  &[data-open] {
    border-color: var(${COLORS.border.open});
  }

  &[data-mobile] {
    width: 100%;
    justify-content: space-between;
  }
`;

export const Selection = styled.div`
  column-gap: inherit;
  display: grid;
  grid-auto-columns: 150px;
  min-width: 150px;
  grid-auto-flow: column;
  width: inherit;

  &[data-mobile] {
    grid-auto-columns: 1fr;
    min-width: unset;
  }
`;

export const Segment = styled.div`
  column-gap: inherit;
  display: flex;
  overflow: hidden;
`;

export const Arrow = styled(DropdownDownInterfaceSVG)`
  transition: transform ${ANIMATIONS.TRANSITION};

  &[data-open] {
    transform: rotate(180deg);
  }
`;
