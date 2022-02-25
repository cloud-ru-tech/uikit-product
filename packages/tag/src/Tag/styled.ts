import { styled } from '@linaria/react';
import { VFC } from 'react';

import { DEPRECATED_EXPORT_VARS } from '@sbercloud/uikit-theme';

import { PRESET_COLORS } from './constants';
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
    if (type === 'card') {
      return `var(${COLORS_TAG.TAG_TYPE_CARD_COLOR})`;
    }

    return `var(${COLORS_TAG.TAG_TEXT_COLOR})`;
  }};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  background-color: ${({ type }) => {
    if (type === 'card') {
      return `var(${COLORS_TAG.TAG_TYPE_CARD_BACKGROUND})`;
    }

    return `var(${COLORS_TAG.TAG_BG_GRAY})`;
  }};

  &[data-tag-color='${PRESET_COLORS[0]}'] {
    background-color: var(${COLORS_TAG.TAG_BG_GREEN});
  }

  &[data-tag-color='${PRESET_COLORS[1]}'] {
    background-color: var(${COLORS_TAG.TAG_BG_BLUE});
  }

  &[data-tag-color='${PRESET_COLORS[2]}'] {
    background-color: var(${COLORS_TAG.TAG_BG_PURPLE});
  }

  &[data-tag-color='${PRESET_COLORS[3]}'] {
    background-color: var(${COLORS_TAG.TAG_BG_PINK});
  }

  &[data-tag-color='${PRESET_COLORS[4]}'] {
    background-color: var(${COLORS_TAG.TAG_BG_RED});
  }

  &[data-tag-color='${PRESET_COLORS[5]}'] {
    background-color: var(${COLORS_TAG.TAG_BG_GRAY_DEFAULT});
  }

  &[data-tag-color='${PRESET_COLORS[6]}'] {
    background-color: var(${COLORS_TAG.TAG_BG_GRAY});
  }

  &[data-tag-color='${PRESET_COLORS[7]}'] {
    background-color: var(${COLORS_TAG.TAG_BG_BROWN});
  }

  &[data-tag-color='${PRESET_COLORS[8]}'] {
    background-color: var(${COLORS_TAG.TAG_BG_ORANGE});
  }

  &[data-tag-color='${PRESET_COLORS[9]}'] {
    background-color: var(${COLORS_TAG.TAG_BG_YELLOW});
  }

  &[data-tag-color='${PRESET_COLORS[10]}'] {
    background-color: var(${COLORS_TAG.TAG_BG_YELLOW_GREEN});
  }

  &[data-tag-color='${PRESET_COLORS[11]}'] {
    background-color: var(${COLORS_TAG.TAG_BG_BLUE_GREEN});
  }
`;
