import { css } from '@linaria/core';

export const inputClassName = css`
  flex-grow: 1;

  &[data-has-prev-sibling] {
    border-left: 1px solid var(--listoolbar-border-color);
  }

  &[data-has-next-sibling] {
    border-right: 1px solid var(--listoolbar-border-color);
  }
`;

export const searchIconClassname = css`
  fill: #d2d2d2;
  cursor: pointer;
  &:focus,
  &:hover {
    fill: #343f48;
  }
`;

export const crossIconClassName = css`
  fill: #d2d2d2;
  &:focus,
  &:hover {
    fill: #343f48;
  }
`;
