import { css } from '@linaria/core';
import { styled } from '@linaria/react';

import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const classNameArrow = css`
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
  padding: 20px;
  border-radius: 8px;
  box-sizing: border-box;

  color: var(${COLORS.container.text});
  border: 1px solid var(${COLORS.container.border});
  filter: var(${COLORS.container.shadow});
  background-color: var(${COLORS.container.background});

  &[data-popper-placement*='bottom'] {
    .${classNameArrow} {
      left: 0;
      margin-top: -4px;
      top: 0;

      &::before {
        border-color: transparent transparent var(${COLORS.container.border}) transparent;
        border-width: 0 4px 4px 4px;
        position: absolute;
        top: -1px;
      }
      &::after {
        border-color: transparent transparent var(${COLORS.container.background}) transparent;
        border-width: 0 4px 4px 4px;
      }
    }
  }

  &[data-popper-placement*='top'] {
    .${classNameArrow} {
      bottom: 0;
      left: 0;
      margin-bottom: -8px;

      &::before {
        border-color: var(${COLORS.container.border}) transparent transparent transparent;
        border-width: 4px 4px 0 4px;
        position: absolute;
        top: 1px;
      }

      &::after {
        border-color: var(${COLORS.container.background}) transparent transparent transparent;
        border-width: 4px 4px 0 4px;
      }
    }
  }

  &[data-popper-placement*='right'] {
    .${classNameArrow} {
      left: 0;
      margin-left: -7px;

      &::before {
        border-color: transparent var(${COLORS.container.border}) transparent transparent;
        border-width: 4px 4px 4px 0;
      }

      &::after {
        border-color: transparent var(${COLORS.container.background}) transparent transparent;
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
        border-color: transparent transparent transparent var(${COLORS.container.border});
        border-width: 4px 0 4px 4px;
      }

      &::after {
        border-color: transparent transparent transparent var(${COLORS.container.background});
        border-width: 4px 0 4px 4px;
        left: 1px;
        top: 0;
      }
    }
  }
`;

export const PopoverWrapper = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-word;
  white-space: pre-wrap;
`;
