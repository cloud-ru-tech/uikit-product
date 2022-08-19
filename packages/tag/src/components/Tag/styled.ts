import { styled } from '@linaria/react';
import { VFC } from 'react';

import { ButtonIcon } from '@sbercloud/uikit-product-button';
import { TEXT_2_STYLES } from '@sbercloud/uikit-product-typography';

import { Colors, Sizes } from '../../constants';
import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';
import { TagProps } from './types';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const styledTag = (Tag: VFC<TagProps>): VFC<TagProps> => styled(Tag)`
  align-items: center;
  border-radius: 4px;
  box-sizing: border-box;
  column-gap: 4px;
  display: inline-flex;
  flex-shrink: 0;
  max-width: 100%;
  overflow: hidden;

  & span {
    max-width: 100%;
    overflow: hidden;
  }

  &[data-size='${Sizes.Small}'] {
    padding: 0 8px;
  }

  &[data-size='${Sizes.Medium}'] {
    padding: 4px 8px;
  }

  &[data-removable] {
    padding-right: 4px;
  }

  &[data-color='${Colors.Green}'] {
    background-color: var(${COLORS.background.green});
  }

  &[data-color='${Colors.Blue}'] {
    background-color: var(${COLORS.background.blue});
  }

  &[data-color='${Colors.Purple}'] {
    background-color: var(${COLORS.background.purple});
  }

  &[data-color='${Colors.Pink}'] {
    background-color: var(${COLORS.background.pink});
  }

  &[data-color='${Colors.Red}'] {
    background-color: var(${COLORS.background.red});
  }

  &[data-color='${Colors.Gray}'] {
    background-color: var(${COLORS.background.gray});
  }

  &[data-color='${Colors.Brown}'] {
    background-color: var(${COLORS.background.brown});
  }

  &[data-color='${Colors.Orange}'] {
    background-color: var(${COLORS.background.orange});
  }

  &[data-color='${Colors.Yellow}'] {
    background-color: var(${COLORS.background.yellow});
  }
`;

export const RemoveButton = styled(ButtonIcon)`
  flex-shrink: 0;
`;

export const Text = styled.span`
  ${TEXT_2_STYLES};

  color: var(${COLORS.text.default});
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
