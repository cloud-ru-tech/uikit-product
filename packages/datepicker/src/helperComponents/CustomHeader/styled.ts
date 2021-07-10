import { css } from '@linaria/core';
import { styled } from '@linaria/react';
import { DEPRECATED_EXPORT_VARS } from '@sbercloud/uikit-theme';

const { COLORS_DATEPICKER } = DEPRECATED_EXPORT_VARS;

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 8px 0;
`;

export const Title = styled.div`
  text-align: left;
  flex-grow: 1;
  font-size: 20px;
  line-height: 26px;

  &::first-letter {
    text-transform: uppercase;
  }
`;

export const iconNavClassName = css`
  fill: var(${COLORS_DATEPICKER.NAVIGATION_COLOR});

  &[data-disabled] {
    fill: var(${COLORS_DATEPICKER.NAVIGATION_DISABLED_COLOR});
  }
`;
