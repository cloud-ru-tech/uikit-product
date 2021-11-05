import { styled } from '@linaria/react';

import { DEPRECATED_EXPORT_VARS } from '@sbercloud/uikit-theme';

const { COLORS_DATEPICKER } = DEPRECATED_EXPORT_VARS;

export const Container = styled.div`
  .react-datepicker-popper {
    z-index: 1;
  }

  .react-datepicker__time-container {
    float: right;
    width: 100%;

    .react-datepicker__time {
      position: relative;

      .react-datepicker__time-box {
        width: 100%;
        text-align: left;
        overflow-x: hidden;
        margin: 0 auto;
        border-radius: 4px;
        ul.react-datepicker__time-list {
          list-style: none;
          margin: 0;
          height: calc(195px + 18px);
          overflow-y: scroll;
          padding-right: 0px;
          padding-left: 0px;
          width: 100%;
          box-sizing: content-box;

          li.react-datepicker__time-list-item {
            height: 44px;
            padding: 12px;
            white-space: nowrap;
            box-sizing: border-box;
            color: var(${COLORS_DATEPICKER.SELECT_TEXT});
            background-color: var(${COLORS_DATEPICKER.SELECT_BACKGROUND});

            &:hover {
              cursor: pointer;

              color: var(${COLORS_DATEPICKER.SELECT_HOVER_TEXT});
              background-color: var(${COLORS_DATEPICKER.SELECT_HOVER_BACKGROUND});
            }
            &--selected {
              color: var(${COLORS_DATEPICKER.SELECT_SELECTED_TEXT});
              background-color: var(${COLORS_DATEPICKER.SELECT_SELECTED_BACKGROUND});

              &:hover {
                background-color: var(${COLORS_DATEPICKER.SELECT_HOVER_BACKGROUND});
              }
            }
            &--disabled {
              color: var(${COLORS_DATEPICKER.SELECT_DISABLED_TEXT});

              &:hover {
                cursor: default;
                color: var(${COLORS_DATEPICKER.SELECT_DISABLED_TEXT});
                background-color: transparent;
              }
            }
          }
        }
      }
    }
  }
`;
