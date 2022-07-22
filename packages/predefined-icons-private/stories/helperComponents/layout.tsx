import { styled } from '@linaria/react';

import { EXPORT_VARS, GLOBAL_CSS_COLOR } from '@sbercloud/uikit-product-theme';

export const Block = styled.div`
  margin-bottom: 8px;
`;

export const TableWrapper = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 1fr;
  border-radius: 8px;
  background-color: var(${GLOBAL_CSS_COLOR.BACKGROUND_SECONDARY});
  border: 1px solid var(${EXPORT_VARS.GREY[100]});
  overflow: auto;
  max-width: 500px;
`;

export const COLUMN_STYLE = {
  primary: 'primary',
  onDark: 'onDark',
  onAccent: 'onAccent',
} as const;

const TableColumnBase = styled.div`
  display: grid;
  justify-content: center;
  justify-items: center;
  align-items: center;
  grid-auto-columns: 1fr;
  grid-auto-rows: 1fr;

  &:not(:last-child) {
    border-right: 1px solid var(${EXPORT_VARS.GREY[100]});
  }

  &[data-variant='${COLUMN_STYLE.primary}'] {
    background-color: var(${GLOBAL_CSS_COLOR.BACKGROUND_SECONDARY});
  }

  &[data-variant='${COLUMN_STYLE.onDark}'] {
    color: var(${EXPORT_VARS.GREY[0]});
    background-color: var(${GLOBAL_CSS_COLOR.BACKGROUND_DARK});
  }

  &[data-variant='${COLUMN_STYLE.onAccent}'] {
    color: var(${EXPORT_VARS.GREY[0]});
    background-color: var(${EXPORT_VARS.BERRY_RED[100]});
  }
`;

export const TableColumn = TableColumnBase as typeof TableColumnBase & {
  variants: typeof COLUMN_STYLE;
};

TableColumn.variants = COLUMN_STYLE;

export const TableCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;

  &:not(:last-child) {
    border-bottom: 1px solid var(${EXPORT_VARS.GREY[100]});
  }
`;
