import { styled } from '@linaria/react';
import { VFC } from 'react';

import { TEXT_2_STYLES } from '@sbercloud/uikit-product-typography';

import { CounterTypes } from '../../helpers/types';
import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';
import { CounterProps } from './types';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const styledCounter = (Counter: VFC<CounterProps>): VFC<CounterProps> => styled(Counter)`
  ${TEXT_2_STYLES};

  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  min-width: 20px;
  box-sizing: border-box;
  padding: 0 4px;

  border-radius: 100px;

  &[data-type='${CounterTypes.Count}'] {
    color: var(${COLORS.text.count});
    background-color: var(${COLORS.background.count});
  }

  &[data-type='${CounterTypes.Notify}'] {
    color: var(${COLORS.text.notify});
    background-color: var(${COLORS.background.notify});
  }
`;
