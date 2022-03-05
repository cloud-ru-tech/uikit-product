import { styled } from '@linaria/react';
import { VFC } from 'react';

import { ButtonIcon } from '@sbercloud/uikit-react-button';
import { MoreInterfaceSVG } from '@sbercloud/uikit-react-icons';
import { ANIMATIONS } from '@sbercloud/uikit-utils';

import { Sizes } from './constants';
import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';
import { SimpleInputProps } from './types';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

enum SizeInPx {
  Small = '28px',
  Medium = '36px',
  Large = '44px',
}

export const styledSimpleInput = (SimpleInput: VFC<SimpleInputProps>): VFC<SimpleInputProps> => styled(SimpleInput)`
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width: 100%;
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width: 100%;
  transition: color ${ANIMATIONS.TRANSITION}, background-color ${ANIMATIONS.TRANSITION},
    border-color ${ANIMATIONS.TRANSITION};
  box-sizing: border-box;
  padding: 0 7px;

  border: 1px solid var(${COLORS.border.default});
  border-radius: 4px;

  &[data-has-more-button] {
    border-radius: 4px 0 0 4px;
  }

  background-color: var(${COLORS.background.default});

  &:hover {
    border-color: var(${COLORS.border.hover});
    z-index: 1;
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

  &[data-size=${Sizes.Small}] {
    min-height: ${SizeInPx[Sizes.Small]};
    max-height: ${SizeInPx[Sizes.Small]};
  }

  &[data-size=${Sizes.Medium}] {
    min-height: ${SizeInPx[Sizes.Medium]};
    max-height: ${SizeInPx[Sizes.Medium]};
  }

  &[data-size=${Sizes.Large}] {
    min-height: ${SizeInPx[Sizes.Large]};
    max-height: ${SizeInPx[Sizes.Large]};
    padding: 0 11px;
  }
`;

export const PostfixButtonWrapper = styled.div`
  align-self: center;
  padding-left: 4px;
  min-width: 20px;
  max-width: 20px;
  min-height: 20px;
  max-height: 20px;
`;

export const MoreIcon = styled(MoreInterfaceSVG)`
  transform: rotate(90deg);
`;

export const MoreButtonWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  transition: color ${ANIMATIONS.TRANSITION}, background-color ${ANIMATIONS.TRANSITION},
    border-color ${ANIMATIONS.TRANSITION};
  box-sizing: border-box;
  margin-left: -1px;

  border: 1px solid var(${COLORS.border.default});
  border-radius: 0 4px 4px 0;

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
    border-left-color: transparent;
  }

  &[data-size=${Sizes.Small}] {
    min-width: ${SizeInPx[Sizes.Small]};
    max-width: ${SizeInPx[Sizes.Small]};
    min-height: ${SizeInPx[Sizes.Small]};
    max-height: ${SizeInPx[Sizes.Small]};
  }

  &[data-size=${Sizes.Medium}] {
    min-width: ${SizeInPx[Sizes.Medium]};
    max-width: ${SizeInPx[Sizes.Medium]};
    min-height: ${SizeInPx[Sizes.Medium]};
    max-height: ${SizeInPx[Sizes.Medium]};
  }

  &[data-size=${Sizes.Large}] {
    min-width: ${SizeInPx[Sizes.Large]};
    max-width: ${SizeInPx[Sizes.Large]};
    min-height: ${SizeInPx[Sizes.Large]};
    max-height: ${SizeInPx[Sizes.Large]};
  }
`;

export const MoreButton = styled(ButtonIcon)`
  height: 100%;
  width: 100%;

  > button {
    height: 100%;
    width: 100%;
  }
`;
