import { styled } from '@linaria/react';
import { EXPORT_VARS } from '@sbercloud/uikit-theme';

const { COLORS_HIERARCHY_MENU } = EXPORT_VARS;

export const Wrapper = styled.div<{ height?: string | number; width?: string | number }>`
  background-color: var(${COLORS_HIERARCHY_MENU.MENU_BACKGROUND});
  border-radius: 8px;
  height: ${({ height }) => (height ? `${parseInt(height as string)}px` : '100%')};
  width: ${({ width }) => (width ? `${parseInt(width as string)}px` : '100%')};
  overflow: auto;
  padding: 8px 0;
`;
