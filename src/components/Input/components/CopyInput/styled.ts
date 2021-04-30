import { css } from '@linaria/core';

import { COLORS_INPUT } from 'theme/color/vars';
import { styled } from '@linaria/react';

// TODO: узнать у дизайнера про темную тему
const wrapperClassName = css`
  max-width: 100%;
`;

interface CopyInputWrapperProps {
  width?: string;
}
const CopyInputWrapper = styled.div<CopyInputWrapperProps>`
  width: ${props => props.width || 'auto'};
`;

const inputClassName = css`
  &[data-disabled='true'] {
    background-color: var(${COLORS_INPUT.COPY_INPUT_BACKGROUND});
    color: var(${COLORS_INPUT.COPY_INPUT_COLOR});
    border-radius: 2px;
  }
`;

const copyButtonClassName = css`
  margin-right: -8px;

  &[data-size='xs'] {
    padding: 7px;
  }

  &[data-variant='transparent'] {
    fill: var(${COLORS_INPUT.COPY_INPUT_ICON_COLOR});

    &:hover {
      fill: var(${COLORS_INPUT.COPY_INPUT_ICON_COLOR});
      background: var(${COLORS_INPUT.COPY_INPUT_ICON_BACKGROUND_COLOR});
    }
  }
`;

export {
  wrapperClassName,
  inputClassName,
  copyButtonClassName,
  CopyInputWrapper,
};
