import { styled } from '@linaria/react';

import { DropdownDownInterfaceSVG, LockInterfaceSVG } from '@sbercloud/uikit-product-icons';
import { ANIMATIONS } from '@sbercloud/uikit-product-utils';

import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

GREEN_DARK_THEME;
GREEN_THEME;
PURPLE_THEME;
PURPLE_DARK_THEME;

export const Elements = styled.div`
  --sidebar-item-postfix__lock-color: var(${COLORS.lock.default});
  --sidebar-item-postfix__arrow-color: var(${COLORS.arrow.default});

  display: flex;
  grid-column: none;
  flex-shrink: 0;
  column-gap: 8px;
  align-items: center;

  padding-left: 8px;

  > * {
    cursor: pointer;
  }

  &[data-disabled] {
    --sidebar-item-postfix__lock-color: var(${COLORS.lock.disabled});
    --sidebar-item-postfix__arrow-color: var(${COLORS.arrow.disabled});

    > * {
      cursor: not-allowed;
    }
  }
`;

export const LockIcon = styled(LockInterfaceSVG)`
  fill: var(--sidebar-item-postfix__lock-color);

  transition: fill ${ANIMATIONS.TRANSITION};
`;

export const AccordionArrowIcon = styled(DropdownDownInterfaceSVG)`
  fill: var(--sidebar-item-postfix__arrow-color);

  transition: ${ANIMATIONS.TRANSITION};
  transition-property: fill, transform;

  &[data-opened] {
    transform: rotate(-180deg);
  }
`;
