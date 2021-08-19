import { styled } from '@linaria/react';

import { EXPORT_GLOBAL_CSS_VARS, EXPORT_VARS } from '@sbercloud/uikit-theme';

export const SingleWrapper = styled.div`
  padding: 20px;
  border-radius: 8px;
  background-color: var(${EXPORT_GLOBAL_CSS_VARS.BACKGROUND_SECONDARY});
`;

export const CenteredWrapper = styled.div`
  margin: 1rem;
  background-color: var(${EXPORT_GLOBAL_CSS_VARS.BACKGROUND_SECONDARY});
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const TableWrapper = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 1fr;
  border-radius: 8px;
  overflow: hidden;
  background-color: var(${EXPORT_GLOBAL_CSS_VARS.BACKGROUND_SECONDARY});
  border: 1px solid var(${EXPORT_VARS.GREY[100]});
  overflow: auto;
`;

export const COLUMN_ACCENT = 'accent' as const;

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

  &[data-variant='${COLUMN_ACCENT}'] {
    color: var(${EXPORT_VARS.GREY[0]});
    background-color: var(${EXPORT_GLOBAL_CSS_VARS.BACKGROUND_ACCENT});
  }
`;

export const TableColumn = TableColumnBase as typeof TableColumnBase & {
  variants: {
    accent: typeof COLUMN_ACCENT;
  };
};

TableColumn.variants = { accent: COLUMN_ACCENT };

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
