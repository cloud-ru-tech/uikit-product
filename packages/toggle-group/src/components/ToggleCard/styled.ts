import { styled } from '@linaria/react';

import { H5_STYLES, TEXT_3_STYLES } from '@sbercloud/uikit-product-typography';

import { ToggleCardBox, ToggleCardBoxDescription, ToggleCardBoxTitle } from '../../helperComponents';
import { Alignment } from './constants';

export const Box = styled(ToggleCardBox)`
  display: flex;
  column-gap: 12px;

  &[data-alignment='${Alignment.Center}'] {
    justify-content: center;
  }
`;

export const Text = styled.span`
  display: flex;
  flex-direction: column;
  row-gap: 4px;
`;

export const Title = styled(ToggleCardBoxTitle)`
  ${H5_STYLES};
`;

export const Description = styled(ToggleCardBoxDescription)`
  ${TEXT_3_STYLES};
`;
