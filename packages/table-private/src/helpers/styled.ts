import { styled } from '@linaria/react';
import { VFC } from 'react';

import { DEPRECATED_EXPORT_VARS } from '@sbercloud/uikit-product-theme';
import { TABLE_TEXT_STYLES } from '@sbercloud/uikit-product-typography';

import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './theme';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

const { COLORS_TABLE } = DEPRECATED_EXPORT_VARS;

type TableProps = { className?: string };

export const styledTable = <P extends TableProps>(Table: VFC<P>) => styled(Table as VFC<TableProps>)<P>`
  &.ag-theme-alpine {
    width: 100%;
    font-family: inherit;
    border: 1px solid var(${COLORS.border});
    border-radius: 8px;
    overflow: hidden;

    .ag-horizontal-right-spacer:not(.ag-scroller-corner) {
      border-left: unset;
    }

    .ag-root-wrapper {
      border: none;
      background-color: inherit;
      z-index: 0;
    }
    .ag {
      &-row {
        border: 0;
        background-color: var(${COLORS_TABLE.TABLE_ROW_BACKGROUND});
        color: var(${COLORS_TABLE.TABLE_ROW_COLOR});

        &:nth-of-type(2n) {
          background-color: var(${COLORS_TABLE.TABLE_ROW_ODD_BACKGROUND});
        }

        &-hover {
          &:before {
            display: none;
          }
          box-shadow: inset 4px 0 0 var(${COLORS_TABLE.TABLE_ROW_HOVER_SHADOW_LEFT}),
            inset 0px -1px 0px var(${COLORS_TABLE.TABLE_ROW_HOVER_SHADOW_TOP_BOTTOM}),
            inset 0px 1px 0px var(${COLORS_TABLE.TABLE_ROW_HOVER_SHADOW_TOP_BOTTOM});
        }
        &-selected:nth-of-type(n) {
          background-color: var(${COLORS_TABLE.TABLE_ROW_SELECTED_BACKGROUND});
        }
        &-selected:before {
          display: none;
        }
      }

      &-cell {
        &-label-container {
          padding: unset;
        }
        ${TABLE_TEXT_STYLES};
        padding: 12px 8px;
        display: flex;
        flex-direction: row;
        align-items: center;
        .ag-selection-checkbox {
          padding-left: 3px;
          height: auto;
        }

        &-wrapper {
          width: 100%;
        }
      }
      &-header {
        background-color: var(${COLORS_TABLE.TABLE_HEADER_BACKGROUND});
        border: none;
        &-cell {
          ${TABLE_TEXT_STYLES};
          color: var(${COLORS_TABLE.TABLE_HEADER_COLOR});
          padding: 4px 8px;
          &-label {
            display: flex;
            flex-direction: row;
            align-items: center;
          }
          &-resize {
            &:after {
              width: 1px;
              height: 20px;
              top: calc(50% - 20px / 2);
              background-color: var(${COLORS_TABLE.TABLE_HEADER_RESIZE_ICON_COLOR});
            }
          }
        }
        &-icon {
          .ag-icon-asc::before {
            content: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M2.5 5H7.5V6.66667H2.5V5ZM2.5 15V13.3333H17.5V15H2.5ZM2.5 9.16667H12.5V10.8333H2.5V9.16667Z' fill='%23D2D2D2'/%3E%3C/svg%3E%0A");
          }
          .ag-icon-desc::before {
            content: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M2.5 15H7.5V13.3333H2.5V15ZM2.5 5V6.66667H17.5V5H2.5ZM2.5 10.8333H12.5V9.16667H2.5V10.8333Z' fill='%23D2D2D2'/%3E%3C/svg%3E%0A");
          }
          .ag-icon-none::before {
            content: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M2.5 5H8.5V6.66667H2.5V5ZM2.5 15V13.3333H12.5V15H2.5ZM2.5 9.16667H16.5V10.8333H2.5V9.16667Z' fill='%23D2D2D2'/%3E%3C/svg%3E%0A");
          }
        }
      }
      &-checkbox-input {
        cursor: pointer;

        &-wrapper {
          width: 20px;
          height: 20px;
          cursor: pointer;
          background: none;
        }
        &-wrapper:active,
        &-wrapper:focus-within {
          box-shadow: none;
        }
      }
      &-header-checkbox-selection-cell {
        padding: 8px 12px;
      }
    }
  }
`;
