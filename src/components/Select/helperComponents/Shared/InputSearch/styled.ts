import { css } from '@linaria/core';

// TODO: we have to create className instead of wrapping component because of a bug
// https://github.com/NervJS/taro/issues/8325
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
