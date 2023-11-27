import { styled } from '@linaria/react';

import { Counter } from '@sbercloud/uikit-product-counter';
import { H4_STYLES, TEXT_2_STYLES } from '@sbercloud/uikit-product-typography';
import { ANIMATIONS } from '@sbercloud/uikit-product-utils';

import { Sizes } from '../../helpers/types';
import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const Tab = styled.li`
  min-width: fit-content;

  &[data-selected='true'] {
    color: var(${COLORS.text.selected.default});

    &:hover {
      cursor: pointer;
      color: var(${COLORS.text.selected.hover});
    }
  }

  &[data-selected='false'] {
    color: var(${COLORS.text.unselected.default});

    &[data-disabled] {
      color: var(${COLORS.text.unselected.disabled});

      &:hover {
        cursor: not-allowed;
      }
    }

    &:not(&[data-disabled]):hover {
      cursor: pointer;
      color: var(${COLORS.text.unselected.hover});
    }
  }

  &[data-size='${Sizes.Small}'] {
    padding: 0 6px 6px;
  }

  &[data-size='${Sizes.Medium}'] {
    padding: 0 12px 8px;
  }

  &[data-size='${Sizes.Large}'] {
    padding: 0 12px 16px;
  }

  :first-child {
    padding-left: 0;
  }

  :last-child {
    padding-right: 0;
  }
`;

export const Label = styled.span`
  &[data-size='${Sizes.Small}'] {
    ${TEXT_2_STYLES};
  }

  &[data-size='${Sizes.Medium}'],
  &[data-size='${Sizes.Large}'] {
    ${H4_STYLES};
  }

  transition: color ${ANIMATIONS.TRANSITION};
  user-select: none;
`;

export const StyledCounter = styled(Counter)`
  margin-left: 8px;
`;
