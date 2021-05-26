import { css } from '@linaria/core';

import { EXPORT_VARS } from '@sbercloud/uikit-theme';

const { COLORS_PAGINATE } = EXPORT_VARS;

export const paginationClassName = css`
  list-style-type: none;
  display: flex;
  width: 100%;
  align-items: center;
  padding: 0;
  margin: 0;

  .previous {
    margin-right: 2px;
  }

  .next {
    margin-left: 2px;
  }
`;

export const placementStyle = {
  left: css`
    justify-content: flex-start;
  `,
  center: css`
    justify-content: center;
  `,
  right: css`
    justify-content: flex-end;
  `,
};

export const pageClassName = css`
  margin: 0 2px;
  color: var(${COLORS_PAGINATE.PAGINATE_ACTIVE_COLOR});
  cursor: pointer;
  border: 0;
  outline: 0;
`;

export const pageLinkClassName = css`
  display: inline-block;
  width: 36px;
  height: 36px;
  font-size: 16px;
  line-height: 36px;
  text-align: center;
  border: 0;
  outline: 0;
  border-radius: 4px;

  &:hover {
    background-color: var(${COLORS_PAGINATE.PAGINATE_WHITE_COLOR});
  }
`;

export const pageActiveClassName = css`
  background-color: var(${COLORS_PAGINATE.PAGINATE_ACTIVE_COLOR});
  color: var(${COLORS_PAGINATE.PAGINATE_WHITE_COLOR});

  &:hover {
    background-color: var(${COLORS_PAGINATE.PAGINATE_ACTIVE_COLOR});
  }
`;

export const pageLinkActiveClassName = css`
  &:hover {
    background-color: transparent;
  }
`;

export const iconLinkClassName = css`
  line-height: 0;
  vertical-align: middle;
  fill: var(${COLORS_PAGINATE.PAGINATE_ACTIVE_COLOR});
  cursor: pointer;
  border: 0;
  outline: 0;

  &[aria-disabled='true'] {
    cursor: not-allowed;
    fill: var(${COLORS_PAGINATE.PAGINATE_DISABLED_COLOR});
  }
`;
