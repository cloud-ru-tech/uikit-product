import { styled } from '@linaria/react';

import { DEPRECATED_EXPORT_VARS, EXPORT_VARS } from '@sbercloud/uikit-product-theme';
import { TEXT_3_STYLES } from '@sbercloud/uikit-product-typography';

const { COLORS_SELECT } = DEPRECATED_EXPORT_VARS;

export const CustomOption = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  &:hover {
    cursor: pointer;
    background-color: var(${COLORS_SELECT.DROPDOWN_HOVER_BACKGROUND});
  }
`;

export const CustomOptionWithCheckbox = styled(CustomOption)`
  justify-content: flex-start;
  column-gap: 6px;
`;

export const Amount = styled.span`
  ${TEXT_3_STYLES};
  display: inline-block;
  color: var(${EXPORT_VARS.GREY[600]});
`;

export const Label = styled.div`
  font-size: 14px;
`;
