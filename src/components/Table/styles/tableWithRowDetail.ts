import { css } from '@linaria/core';

export const radioStyle = css`
  &.ag-theme-alpine .ag-row-group-leaf-indent {
    margin-left: 0px;
  }

  .custom-radio-checked {
    width: 20px;
    height: 20px;
    background: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='10' cy='10' r='6.25' fill='white' stroke='%23D2D2D2' stroke-width='1.5'/%3E%3C/svg%3E%0A");
  }

  .custom-radio-unchecked {
    width: 20px;
    height: 20px;
    background: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='10' cy='10' r='6.25' fill='white' stroke='%235558FA' stroke-width='1.5'/%3E%3Ccircle cx='10' cy='10' r='4.1016' fill='%235558FA'/%3E%3C/svg%3E");
  }

  .ag-row {
    &-level-0 {
      cursor: not-allowed;
    }
    &-hover.ag-row-disabled {
      box-shadow: none;
    }
    &-group {
      align-items: center !important;
      cursor: pointer !important;
    }
  }
`;
