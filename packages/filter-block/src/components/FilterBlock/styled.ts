import { styled } from '@linaria/react';

import { themeVars } from '@sbercloud/figma-tokens-cloud-platform';
import { Button } from '@sbercloud/uikit-product-button';
import { TEXT_1_STYLES } from '@sbercloud/uikit-product-typography';

export const FilterWrap = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 24px;

  width: 240px;
  border-radius: 8px;
  padding: 16px;
  background-color: var(${themeVars.sys.neutral.background2Level});
`;

export const FiltersBlock = styled.div``;

export const Title = styled.span`
  ${TEXT_1_STYLES};
  display: inline-block;
  font-weight: 600;
  margin-bottom: 16px;
`;

export const FilterOptions = styled.div``;

export const StyledButton = styled(Button)`
  display: flex;
  width: 100% !important;
`;
