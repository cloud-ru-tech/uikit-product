import { styled } from '@linaria/react';

import { H5_STYLES, TEXT_2_STYLES } from '@sbercloud/uikit-product-typography';

import { Alert } from './Alert';
import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const Wrapper = styled.div`
  min-width: fit-content;
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  border-radius: 8px;

  &[data-variant='${Alert.variants.Accent}'] {
    padding: 15px;
    border-width: 1px;
    border-style: solid;
  }

  &[data-variant='${Alert.variants.Primary}'] {
    padding: 16px;
    border-width: 0;
  }

  &[data-type='${Alert.types.Success}'] {
    background-color: var(${COLORS.background.success});
    border-color: var(${COLORS.border.success});
  }
  &[data-type='${Alert.types.Warning}'] {
    background-color: var(${COLORS.background.warning});
    border-color: var(${COLORS.border.warning});
  }
  &[data-type='${Alert.types.Error}'] {
    background-color: var(${COLORS.background.error});
    border-color: var(${COLORS.border.error});
  }
  &[data-type='${Alert.types.Neutral}'] {
    background-color: var(${COLORS.background.neutral});
    border-color: var(${COLORS.border.neutral});
  }
  &[data-type='${Alert.types.Loading}'] {
    background-color: var(${COLORS.background.loading});
    border-color: var(${COLORS.border.loading});
  }
`;

export const Content = styled.div`
  display: flex;
  width: 100%;
  padding: 0 16px;
  flex-direction: column;
  & > * + * {
    padding-top: 4px;
  }
`;

export const Title = styled.span`
  ${H5_STYLES};

  color: var(${COLORS.title});
`;

export const Description = styled.span`
  ${TEXT_2_STYLES};

  color: var(${COLORS.description.default});

  &[data-type='${Alert.types.Loading}'] {
    color: var(${COLORS.description.loading});
  }
`;
