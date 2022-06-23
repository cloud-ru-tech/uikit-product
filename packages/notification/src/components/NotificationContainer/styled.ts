import 'react-toastify/dist/ReactToastify.css';

import { css } from '@linaria/core';

export const notificationContainerClassName = css`
  && {
    width: 302px;
    padding: 0;
  }

  &.bottom-right {
    bottom: 8px;
    right: 8px;
  }

  &.bottom-center {
    bottom: 8px;
  }

  &.top-right {
    top: 8px;
    right: 8px;
  }
`;

export const notificationClassName = css`
  && {
    padding: 0;
    background-color: transparent;
    min-height: 36px;
    margin-bottom: 4px;
    box-shadow: none;
  }
`;

export const notificationBodyClassName = css`
  && {
    padding: 0;
    margin: 0;
  }
`;
