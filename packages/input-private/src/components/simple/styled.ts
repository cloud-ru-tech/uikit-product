import { styled } from '@linaria/react';
import { VFC } from 'react';

import { ButtonIcon } from '@sbercloud/uikit-product-button';
import { MoreInterfaceSVG } from '@sbercloud/uikit-product-icons';
import { ANIMATIONS } from '@sbercloud/uikit-product-utils';

import { DEFAULT_TEXT_STYLES, DISABLED_TEXT_STYLES, themes } from '../../styles';
import { InputPrivate } from '../private';
import { Sizes } from './constants';
import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';
import { SimpleInputProps } from './types';

themes;

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

enum SizeInPx {
  Small = '28px',
  Medium = '36px',
  Large = '44px',
}

enum PaddingInPx {
  Small = '8px',
  Medium = '8px',
  Large = '12px',
}

export const styledSimpleInput = (SimpleInput: VFC<SimpleInputProps>): VFC<SimpleInputProps> => styled(SimpleInput)`
  background-color: var(${COLORS.background.default});
  border-radius: 4px;
  border: 1px solid var(${COLORS.border.default});
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  max-width: 100%;
  transition: ${ANIMATIONS.TRANSITION};
  transition-property: background-color, border-color;
  width: 100%;

  &:hover {
    border-color: var(${COLORS.border.hover});
    z-index: 1;
  }

  &:focus-within {
    border-color: var(${COLORS.border.active});
  }

  &[data-error] {
    border-color: var(${COLORS.border.error});
  }

  &[data-disabled] {
    background-color: var(${COLORS.background.disabled});
    border-color: var(${COLORS.border.disabled});
  }

  &[data-size=${Sizes.Small}] {
    height: ${SizeInPx[Sizes.Small]};
  }

  &[data-size=${Sizes.Medium}] {
    height: ${SizeInPx[Sizes.Medium]};
  }

  &[data-size=${Sizes.Large}] {
    height: ${SizeInPx[Sizes.Large]};
  }
`;

export const Input = styled(InputPrivate)`
  &[data-size=${Sizes.Small}] {
    padding: 0 ${PaddingInPx[Sizes.Small]};
  }

  &[data-size=${Sizes.Medium}] {
    padding: 0 ${PaddingInPx[Sizes.Medium]};
  }

  &[data-size=${Sizes.Large}] {
    padding: 0 ${PaddingInPx[Sizes.Large]};
  }

  &[data-ellipsis]:not(:active) {
    text-overflow: ellipsis;
  }
`;

export const Prefix = styled.div`
  ${DEFAULT_TEXT_STYLES};

  align-items: center;
  border-right: inherit;
  display: flex;

  &[data-disabled] {
    ${DISABLED_TEXT_STYLES};
  }

  &[data-size=${Sizes.Small}] {
    padding: 0 ${PaddingInPx[Sizes.Small]};
  }

  &[data-size=${Sizes.Medium}] {
    padding: 0 ${PaddingInPx[Sizes.Medium]};
  }

  &[data-size=${Sizes.Large}] {
    padding: 0 ${PaddingInPx[Sizes.Large]};
  }
`;

export const Postfix = styled.div`
  align-items: center;
  box-sizing: border-box;
  display: flex;

  &[data-size=${Sizes.Small}] {
    column-gap: 4px;
    padding-right: ${PaddingInPx[Sizes.Small]};
  }

  &[data-size=${Sizes.Medium}] {
    column-gap: 4px;
    padding-right: ${PaddingInPx[Sizes.Medium]};
  }

  &[data-size=${Sizes.Large}] {
    column-gap: 8px;
    padding-right: ${PaddingInPx[Sizes.Large]};
  }
`;

export const PostfixButtonWrapper = styled.div`
  height: 20px;
  width: 20px;
`;

export const MoreIcon = styled(MoreInterfaceSVG)`
  transform: rotate(90deg);
`;

export const MoreButton = styled(ButtonIcon)`
  &&,
  && > button {
    height: 100%;
  }
`;

export const MoreButtonWrapper = styled.div`
  border-left: inherit;
  height: 100%;

  &[data-size=${Sizes.Small}] button {
    padding: 0 4px;
  }

  &[data-size=${Sizes.Medium}] button {
    padding: 0 ${PaddingInPx[Sizes.Medium]};
  }

  &[data-size=${Sizes.Large}] button {
    padding: 0 ${PaddingInPx[Sizes.Large]};
  }
`;
