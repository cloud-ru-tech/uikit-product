import { styled } from '@linaria/react';
import { VFC } from 'react';

import { TEXT_2_STYLES } from '@sbercloud/uikit-product-typography';
import { DEFAULT_STYLES } from '@sbercloud/uikit-product-utils';

import {
  DEFAULT_PLACEHOLDER_STYLES,
  DEFAULT_TEXT_STYLES,
  DISABLED_PLACEHOLDER_STYLES,
  DISABLED_TEXT_STYLES,
  themes,
} from '../../styles';
import { InputPrivateProps } from './types';

themes;

export const styledInputPrivate = (InputPrivate: VFC<InputPrivateProps>): VFC<InputPrivateProps> => styled(
  InputPrivate,
)`
  ${DEFAULT_STYLES.COMMON};
  ${DEFAULT_STYLES.BORDERLESS};
  ${TEXT_2_STYLES};
  ${DEFAULT_TEXT_STYLES};

  background-color: transparent;
  width: 100%;
  max-width: 100%;
  font-family:
    SB Sans Interface,
    serif;

  &[disabled] {
    ${DISABLED_TEXT_STYLES};

    background-color: transparent;
  }

  &::placeholder {
    ${DEFAULT_PLACEHOLDER_STYLES};
  }

  &[disabled]::placeholder {
    ${DISABLED_PLACEHOLDER_STYLES};
  }
`;
