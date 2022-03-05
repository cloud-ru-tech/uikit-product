import { styled } from '@linaria/react';
import { VFC } from 'react';

import { DEPRECATED_EXPORT_VARS } from '@sbercloud/uikit-theme';

import { Colors, Types } from './constants';
import { TagProps } from './types';

const { COLORS_TAG } = DEPRECATED_EXPORT_VARS;

export const styledTag = (Tag: VFC<TagProps>): VFC<TagProps> => styled(Tag)`
  max-width: 100%;
  min-width: 30px;
  display: inline-block;
  border-radius: 4px;
  padding: 0 8px;
  box-sizing: border-box;
  font-size: 14px;
  line-height: 20px;
  color: ${({ type }) => {
    if (type === Types.Card) {
      return `var(${COLORS_TAG.TAG_TYPE_CARD_COLOR})`;
    }

    return `var(${COLORS_TAG.TAG_TEXT_COLOR})`;
  }};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  background-color: ${({ type }) => {
    if (type === Types.Card) {
      return `var(${COLORS_TAG.TAG_TYPE_CARD_BACKGROUND})`;
    }

    return `var(${COLORS_TAG.TAG_BG_GRAY})`;
  }};

  &[data-tag-color='${Colors.Green}'] {
    background-color: var(${COLORS_TAG.TAG_BG_GREEN});
  }

  &[data-tag-color='${Colors.Blue}'] {
    background-color: var(${COLORS_TAG.TAG_BG_BLUE});
  }

  &[data-tag-color='${Colors.Purple}'] {
    background-color: var(${COLORS_TAG.TAG_BG_PURPLE});
  }

  &[data-tag-color='${Colors.Pink}'] {
    background-color: var(${COLORS_TAG.TAG_BG_PINK});
  }

  &[data-tag-color='${Colors.Red}'] {
    background-color: var(${COLORS_TAG.TAG_BG_RED});
  }

  &[data-tag-color='${Colors.DefaultGray}'] {
    background-color: var(${COLORS_TAG.TAG_BG_GRAY_DEFAULT});
  }

  &[data-tag-color='${Colors.Gray}'] {
    background-color: var(${COLORS_TAG.TAG_BG_GRAY});
  }

  &[data-tag-color='${Colors.Brown}'] {
    background-color: var(${COLORS_TAG.TAG_BG_BROWN});
  }

  &[data-tag-color='${Colors.Orange}'] {
    background-color: var(${COLORS_TAG.TAG_BG_ORANGE});
  }

  &[data-tag-color='${Colors.Yellow}'] {
    background-color: var(${COLORS_TAG.TAG_BG_YELLOW});
  }

  &[data-tag-color='${Colors.YellowGreen}'] {
    background-color: var(${COLORS_TAG.TAG_BG_YELLOW_GREEN});
  }

  &[data-tag-color='${Colors.BlueGreen}'] {
    background-color: var(${COLORS_TAG.TAG_BG_BLUE_GREEN});
  }
`;
