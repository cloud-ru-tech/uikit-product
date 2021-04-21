import { css } from '@linaria/core';

import { COLORS_INPUT } from 'theme/color/vars';

// TODO: узнать у дизайнера про темную тему
const wrapperClassName = css`
  width: 319px;
  max-width: 100%;
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

export { wrapperClassName, inputClassName, copyButtonClassName };
