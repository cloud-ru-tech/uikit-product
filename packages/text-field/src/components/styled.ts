import { styled } from '@linaria/react';

import { InputPrivate } from '@sbercloud/uikit-product-input-private';
import { TextareaPrivate } from '@sbercloud/uikit-product-textarea-private';

import { Size } from './constants';
import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

const commonStyles = `
  overflow: hidden;
  text-overflow: ellipsis;

  &[data-has-action-buttons] {
    padding-right: 12px;
  }

  &[disabled] {
    color: var(${COLORS.text});
    -webkit-text-fill-color: var(${COLORS.text});
    opacity: 1;
  }
`;

export const Container = styled.div`
  width: 100%;
  border-radius: 4px;
  padding: 4px 4px 4px 12px;
  box-sizing: border-box;
  background-color: var(${COLORS.background});
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  min-height: 36px;

  &[data-size=${Size.Large}] {
    padding: 8px 4px 8px 12px;
  }
`;

export const StyledInputPrivate = styled(InputPrivate)`
  ${commonStyles};

  pointer-events: none;

  &[data-secured='true'] {
    text-overflow: initial;
    pointer-events: initial;
  }
`;

export const StyledTextareaPrivate = styled(TextareaPrivate)`
  ${commonStyles};

  margin: 4px 0;
  overflow-wrap: break-word;
  white-space: pre-wrap;
`;

export const IconsContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  float: right;

  > * {
    margin-bottom: 0;
    margin-left: 4px;
  }

  &[data-multiline] {
    justify-content: flex-end;
    flex-direction: column-reverse;
    > * {
      margin-bottom: 4px;
      margin-left: 0;
    }
  }
`;
