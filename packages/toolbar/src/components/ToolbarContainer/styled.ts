import { styled } from '@linaria/react';

import { DEPRECATED_EXPORT_VARS } from '@sbercloud/uikit-theme';

const { COLORS_TOOLBAR } = DEPRECATED_EXPORT_VARS;

export const ToolbarContainerStyled = styled.div`
  background-color: var(${COLORS_TOOLBAR.BACKGROUND});
  border: 1px solid var(${COLORS_TOOLBAR.INPUT_BORDER});
  border-radius: 4px;
  height: 40px;
  display: flex;
  flex-direction: row;
  vertical-align: middle;
  overflow: hidden;
  flex-shrink: 0;
`;
