import { css } from '@linaria/core';
import { styled } from '@linaria/react';

import { Tag } from '@sbercloud/uikit-react-tag';

export const StyledTag = styled(Tag)`
  padding: 0 8px;
  margin: 0;
  display: block;
  text-overflow: clip;
`;

export const tagInputClassName = css`
  line-height: 20px;
  font-size: 14px;
`;
