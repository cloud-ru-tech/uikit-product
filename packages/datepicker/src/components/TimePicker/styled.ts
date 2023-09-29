import { styled } from '@linaria/react';

import { SHADOW } from '@sbercloud/uikit-product-utils';

import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

GREEN_THEME;
GREEN_DARK_THEME;
PURPLE_THEME;
PURPLE_DARK_THEME;

export const Container = styled.div`
  .react-datepicker-popper {
    z-index: 1;
  }

  .react-datepicker__time-container {
    float: right;
    width: 100%;
    box-shadow: ${SHADOW.MEDIUM};

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
          padding-right: 0;
          padding-left: 0;
          width: 100%;
          box-sizing: content-box;

          li.react-datepicker__time-list-item {
            height: 44px;
            padding: 12px;
            white-space: nowrap;
            box-sizing: border-box;
            color: var(${COLORS.SELECT_TEXT});
            background-color: var(${COLORS.SELECT_BACKGROUND});

            &:hover {
              cursor: pointer;
              color: var(${COLORS.SELECT_TEXT_HOVER});
              background-color: var(${COLORS.SELECT_BACKGROUND_HOVER});
            }

            &--selected {
              color: var(${COLORS.SELECT_TEXT_SELECTED});
              background-color: var(${COLORS.SELECT_BACKGROUND_SELECTED});

              &:hover {
                background-color: var(${COLORS.SELECT_BACKGROUND_HOVER});
              }
            }

            &--disabled {
              color: var(${COLORS.SELECT_TEXT_DISABLED});

              &:hover {
                cursor: default;
                color: var(${COLORS.SELECT_TEXT_DISABLED});
                background-color: transparent;
              }
            }
          }
        }
      }
    }
  }
`;
