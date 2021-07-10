import { styled } from '@linaria/react';
import { DEPRECATED_EXPORT_VARS } from '@sbercloud/uikit-theme';
import { H3Semibold } from '@sbercloud/uikit-typography';

const { COLORS_DRAWER } = DEPRECATED_EXPORT_VARS;

export const HeaderContainerStyled = styled(H3Semibold)`
  padding: 24px 0;
  color: var(${COLORS_DRAWER.HEADER_TEXT_COLOR});
`;
