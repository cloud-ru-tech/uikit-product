import { css } from '@linaria/core';

import { H5_STYLES, TEXT_2_STYLES } from '@sbercloud/uikit-product-typography';

import { COLORS } from '../themes';

export const tableClassName = css`
  width: 100%;
  border-spacing: 0;

  thead {
    background: var(${COLORS.TABLE.HEADER_BACKGROUND});
    border-radius: 4px;
  }

  th {
    ${H5_STYLES};
    color: var(${COLORS.COLOR_DEFAULT});
    text-align: left;
    padding: 8px 0;

    &:first-child {
      padding-left: 8px;
    }

    &:last-child {
      padding-right: 8px;
    }
  }

  td {
    ${TEXT_2_STYLES};
    padding: 14px 0;
    border-bottom: 1px solid var(${COLORS.TABLE.BORDER_COLOR});

    &:first-child {
      padding-left: 8px;
    }

    &:last-child {
      padding-right: 8px;
    }
  }

  tr {
    &:last-child {
      td {
        border-bottom: none;
      }
    }
  }
`;
