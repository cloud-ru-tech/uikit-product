import { css } from '@linaria/core';

export const toastContainerClassName = css`
  width: 304px !important;
`;

export const toastClassName = css`
  .${toastContainerClassName} & {
    padding: 0;
    border-radius: 8px;
    background-color: transparent;
  }
`;

export const toastBodyClassName = css`
  .${toastContainerClassName} & {
    padding: 0;
    margin: 0;
    width: 100%;
  }
`;
