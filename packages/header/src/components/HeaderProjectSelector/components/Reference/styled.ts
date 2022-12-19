import { styled } from '@linaria/react';

import { DropdownDownInterfaceSVG } from '@sbercloud/uikit-product-icons';
import { ANIMATIONS } from '@sbercloud/uikit-product-utils';

import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const Wrapper = styled.button`
  cursor: pointer;

  display: flex;
  column-gap: 8px;
  align-items: center;

  width: fit-content;
  margin: 0;
  padding: 4px 8px;

  color: var(${COLORS.text.default});

  background-color: var(${COLORS.background.default});
  border: 1px solid var(${COLORS.border.default});
  border-radius: 28px;
  outline: none;

  transition: border-color ${ANIMATIONS.TRANSITION};

  &:focus-visible,
  &:hover {
    border-color: var(${COLORS.border.hover});
  }

  &[data-open] {
    border-color: var(${COLORS.border.open});
  }

  &[data-mobile] {
    justify-content: space-between;

    width: 100%;
  }
`;

export const Selection = styled.div`
  display: grid;
  grid-auto-columns: 150px;
  grid-auto-flow: column;
  column-gap: inherit;

  width: inherit;
  min-width: 150px;

  &[data-mobile] {
    grid-auto-columns: 1fr;

    min-width: unset;
  }
`;

export const Segment = styled.div`
  overflow: hidden;
  display: flex;
  column-gap: inherit;
`;

export const Arrow = styled(DropdownDownInterfaceSVG)`
  transition: transform ${ANIMATIONS.TRANSITION};

  &[data-open] {
    transform: rotate(180deg);
  }
`;
