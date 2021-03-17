import { styled } from '@linaria/react';

import { COLORS_TAG } from 'theme/color/vars';
import { InputAutosize } from 'components/Input';
import { PRESET_COLORS } from 'components/Tag/helpers/colors';

export const StyledTag = styled.div`
  max-width: 100%;
  min-width: 30px;
  display: inline-block;
  border-radius: 4px;
  padding: 0 8px;
  box-sizing: border-box;
  font-size: 14px;
  line-height: 20px;
  color: var(${COLORS_TAG.TAG_TEXT_COLOR});
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  &[data-tag-color='green'] {
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
`;

export const StyledInputAutosize = styled(InputAutosize)`
  max-width: 100%;
  min-width: 30px;
  display: inline-block;
  border-radius: 4px;
  padding: 0 8px;
  box-sizing: border-box;
  font-size: 14px;
  line-height: 20px;
  color: var(${COLORS_TAG.TAG_TEXT_COLOR});
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  & > input {
    border-style: none;
    background: transparent;
    outline: none;
  }

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
`;
