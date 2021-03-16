import { css } from '@linaria/core';
import { styled } from '@linaria/react';

import { InputSearch } from 'components/Select/helperComponents/Shared/InputSearch';
import { COLORS_SELECT } from 'theme/color/vars';

export const StyledSearchInput = styled(InputSearch)`
  height: 28px;
  padding: 4px 12px;
`;

export const searchInputWrapClassname = css`
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border-bottom: 1px solid #cccccc;
  padding: 4px 0;
  background: var(${COLORS_SELECT.BACKGROUND});
`;
