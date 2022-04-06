import { styled } from '@linaria/react';
import { PropsWithChildren, VFC } from 'react';

import { ANIMATIONS, DEFAULT_STYLES } from '@sbercloud/uikit-utils';

import { CommonButtonProps } from '../types';

export const styledButtonPrivate = (
  BaseButton: VFC<PropsWithChildren<CommonButtonProps>>,
): VFC<PropsWithChildren<CommonButtonProps>> => styled(BaseButton)`
  ${DEFAULT_STYLES.COMMON};
  ${DEFAULT_STYLES.BORDERLESS};

  cursor: pointer;
  text-transform: none;
  color: inherit;
  background-color: transparent;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: max-content;
  min-width: max-content;
  transition: fill ${ANIMATIONS.TRANSITION}, color ${ANIMATIONS.TRANSITION}, border-color ${ANIMATIONS.TRANSITION},
    background-color ${ANIMATIONS.TRANSITION};
  text-decoration: none;
  font-weight: normal;

  :disabled,
  &[disabled] {
    cursor: not-allowed;

    svg {
      pointer-events: none;
    }
  }

  /* чтобы к иконкам применялся align-items */
  svg {
    display: block;
  }
`;
