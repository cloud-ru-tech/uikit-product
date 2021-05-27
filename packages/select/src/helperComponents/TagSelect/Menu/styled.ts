import { css } from '@linaria/core';
import { styled } from '@linaria/react';

import { EXPORT_VARS } from '@sbercloud/uikit-theme';

import { InputSearch } from '../../Shared/InputSearch';

const { COLORS_SELECT } = EXPORT_VARS;

export const StyledSearchInput = styled(InputSearch)`
  max-height: 28px;
  padding: 4px 12px;
`;

export const searchInputWrapClassname = css`
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border-bottom: 1px solid #cccccc;
  padding: 4px 0;
  background: var(${COLORS_SELECT.BACKGROUND});
`;
