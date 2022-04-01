import { styled } from '@linaria/react';

import { H4_STYLES } from '@sbercloud/uikit-typography';
import { ANIMATIONS } from '@sbercloud/uikit-utils';

import { Counter } from '../Counter';
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
`;

export const Label = styled.span`
  ${H4_STYLES};
  transition: color ${ANIMATIONS.TRANSITION};
`;

export const StyledCounter = styled(Counter)`
  margin-left: 8px;
`;
