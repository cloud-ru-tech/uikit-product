import { css } from '@linaria/core';
import { styled } from '@linaria/react';

import { Tag } from '@sbercloud/uikit-react-tag';

export const optionClass = css`
  flex-basis: 33.33%;
  background-color: transparent;
  line-height: 0;
  border-radius: 4px;
  box-sizing: border-box;
  padding: 4px !important;

  &:active {
    background: transparent;
  }
`;

export const StyledTag = styled(Tag)`
  padding: 0;
  min-width: 28px;
  width: 28px;
  height: 28px;
  border: 1px solid transparent;
`;
