import { css } from '@linaria/core';

// TODO: узнать у дизайнера про темную тему
const wrapperClassName = css`
  width: 319px;
  max-width: 100%;
`;

const inputClassName = css`
  &[data-disabled='true'] {
    background-color: #f5f5f5;
    color: #6c6c6c;
    border-radius: 2px;
  }
`;

const copyButtonClassName = css`
  margin-right: -8px;

  &[data-size='xs'] {
    padding: 7px;
  }

  &[data-variant='transparent'] {
    fill: #d2d2d2;

    &:hover {
      fill: #d2d2d2;
      background: #ededed;
    }
  }
`;

export { wrapperClassName, inputClassName, copyButtonClassName };
