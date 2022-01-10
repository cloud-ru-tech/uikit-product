import { styled } from '@linaria/react';

import { MoreInterfaceSVG } from '@sbercloud/uikit-react-icons';

import { Sizes } from './constants';
import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const Wrapper = styled.div`
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
  transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out, border-color 0.2s ease-in-out;
  box-sizing: border-box;

  border: 1px solid var(${COLORS.border.default});
  border-radius: 4px;

  &[data-has-more-button] {
    border-radius: 4px 0 0 4px;
  }

  background-color: var(${COLORS.background.default});

  &:hover {
    border-color: var(${COLORS.border.hover});
    transform: scaleZ(1.0001);
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
    padding: 4px 8px;
  }

  &[data-size=${Sizes.Medium}] {
    padding: 8px;
  }

  &[data-size=${Sizes.Large}] {
    padding: 12px;
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
  transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out, border-color 0.2s ease-in-out;
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
    padding: 4px;
  }

  &[data-size=${Sizes.Medium}] {
    padding: 8px;
  }

  &[data-size=${Sizes.Large}] {
    padding: 12px;
  }
`;
