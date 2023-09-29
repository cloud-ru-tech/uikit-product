import { css } from '@linaria/core';
import { styled } from '@linaria/react';

import { H5_STYLES, TEXT_2_STYLES } from '@sbercloud/uikit-product-typography';

import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const classNameArrow = css`
  position: absolute;
  height: 8px;
  width: 8px;
  pointer-events: none;

  &::before {
    border-style: solid;
    content: '';
    display: block;
    height: 0;
    margin: auto;
    width: 0;
  }

  &::after {
    border-style: solid;
    content: '';
    display: block;
    height: 0;
    margin: auto;
    position: absolute;
    width: 0;
  }
`;

export const containerClassName = css`
  z-index: 1;
  max-width: 376px;
  box-sizing: border-box;

  border: 1px solid var(${COLORS.CONTAINER_BORDER_COLOR});
  color: var(${COLORS.CONTAINER_COLOR});
  background-color: var(${COLORS.CONTAINER_BACKGROUND_COLOR});
  border-radius: 8px;
  box-shadow: var(${COLORS.CONTAINER_SHADOW});
  padding: 12px 16px;

  &[data-popper-placement*='bottom'] {
    .${classNameArrow} {
      left: 0;
      margin-top: -4px;
      top: 0;

      &::before {
        border-color: transparent transparent var(${COLORS.CONTAINER_BORDER_COLOR}) transparent;
        border-width: 0 4px 4px;
        position: absolute;
        top: -1px;
      }

      &::after {
        border-color: transparent transparent var(${COLORS.CONTAINER_BACKGROUND_COLOR}) transparent;
        border-width: 0 4px 4px;
      }
    }
  }

  &[data-popper-placement*='top'] {
    .${classNameArrow} {
      bottom: 0;
      left: 0;
      margin-bottom: -8px;

      &::before {
        border-color: var(${COLORS.CONTAINER_BORDER_COLOR}) transparent transparent transparent;
        border-width: 4px 4px 0;
        position: absolute;
        top: 1px;
      }

      &::after {
        border-color: var(${COLORS.CONTAINER_BACKGROUND_COLOR}) transparent transparent transparent;
        border-width: 4px 4px 0;
      }
    }
  }

  &[data-popper-placement*='right'] {
    .${classNameArrow} {
      left: 0;
      margin-left: -7px;

      &::before {
        border-color: transparent var(${COLORS.CONTAINER_BORDER_COLOR}) transparent transparent;
        border-width: 4px 4px 4px 0;
      }

      &::after {
        border-color: transparent var(${COLORS.CONTAINER_BACKGROUND_COLOR}) transparent transparent;
        border-width: 4px 4px 4px 0;
        left: 3px;
        top: 0;
      }
    }
  }

  &[data-popper-placement*='left'] {
    .${classNameArrow} {
      margin-right: -7px;
      right: 0;

      &::before {
        border-color: transparent transparent transparent var(${COLORS.CONTAINER_BORDER_COLOR});
        border-width: 4px 0 4px 4px;
      }

      &::after {
        border-color: transparent transparent transparent var(${COLORS.CONTAINER_BACKGROUND_COLOR});
        border-width: 4px 0 4px 4px;
        left: 1px;
        top: 0;
      }
    }
  }
`;

export const disableContainerMaxWidthClassName = css`
  max-width: none;
`;

export const containerWithIconClassName = css`
  padding-right: 44px;
`;

export const TooltipWrapper = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-word;
  white-space: pre-wrap;
`;

export const IconWrapper = styled.span`
  position: absolute;
  top: 16px;
  right: 16px;
  fill: var(${COLORS.ICON_FILL});
  cursor: pointer;

  &[data-action='true'] {
    cursor: pointer;

    &:focus,
    &:hover {
      fill: var(${COLORS.ICON_HOVER_FILL});
    }

    &:active {
      fill: var(${COLORS.ICON_ACTIVE_FILL});
    }
  }
`;

export const Title = styled.h5`
  ${H5_STYLES};

  &:not(:last-child) {
    margin-bottom: 8px;
  }
`;

export const Text = styled.span`
  ${TEXT_2_STYLES};

  &:not(:last-child) {
    margin-bottom: 12px;
    display: block;
  }
`;
