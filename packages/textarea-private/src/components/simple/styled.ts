import { styled } from '@linaria/react';
import { VFC } from 'react';

import { ButtonIcon } from '@sbercloud/uikit-product-button';

import { TextareaPrivate } from '../private';
import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';
import { SimpleTextareaProps } from './types';

GREEN_DARK_THEME;
GREEN_THEME;
PURPLE_THEME;
PURPLE_DARK_THEME;

export const styledSimpleTextarea = (SimpleTextarea: VFC<SimpleTextareaProps>): VFC<SimpleTextareaProps> => styled(
  SimpleTextarea,
)`
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width: 100%;
  transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out, border-color 0.2s ease-in-out;
  box-sizing: border-box;
  padding: 0 11px 11px;
  border: 1px solid var(${COLORS.border.default});
  border-radius: 4px;
  background-color: var(${COLORS.background.default});

  &:hover {
    border-color: var(${COLORS.border.hover});
  }

  &:focus,
  &:active,
  &[data-focused] {
    border-color: var(${COLORS.border.active});
  }

  &[data-error] {
    border-color: var(${COLORS.border.error});
  }

  &[data-disabled] {
    border-color: var(${COLORS.border.disabled});
    background-color: var(${COLORS.background.disabled});
  }

  &:not(&[data-autosize]) {
    height: 100%;
    overflow: hidden;
  }
`;

export const ClearButton = styled(ButtonIcon)`
  align-self: flex-start;
  margin-top: 11px;
`;

export const StyledPrivateTextarea = styled(TextareaPrivate)`
  padding-top: 11px;
  padding-right: 12px;
`;
