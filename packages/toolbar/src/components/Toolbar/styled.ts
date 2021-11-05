import { styled } from '@linaria/react';

import { DEPRECATED_EXPORT_VARS } from '@sbercloud/uikit-theme';

const { COLORS_TOOLBAR } = DEPRECATED_EXPORT_VARS;

export const ListToolBarStyled = styled.div`
  background-color: var(${COLORS_TOOLBAR.BACKGROUND});
  border: 1px solid var(${COLORS_TOOLBAR.INPUT_BORDER});
  width: 100%;
  border-radius: 4px;
  margin: 20px 0;
  height: 40px;
  display: flex;
  flex-direction: row;
  vertical-align: middle;
  overflow: hidden;
  flex-shrink: 0;
`;
