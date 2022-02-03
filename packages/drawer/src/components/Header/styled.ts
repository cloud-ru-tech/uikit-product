import { styled } from '@linaria/react';

import { DEPRECATED_EXPORT_VARS } from '@sbercloud/uikit-theme';
import { H3_SEMIBOLD_STYLES } from '@sbercloud/uikit-typography';

const { COLORS_DRAWER } = DEPRECATED_EXPORT_VARS;

export const HeaderContainerStyled = styled.h3`
  ${H3_SEMIBOLD_STYLES};
  padding: 24px 0;
  color: var(${COLORS_DRAWER.HEADER_TEXT_COLOR});
`;
