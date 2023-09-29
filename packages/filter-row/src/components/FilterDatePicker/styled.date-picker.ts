import { styled } from '@linaria/react';

import { SHADOW } from '@sbercloud/uikit-product-utils';

import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const Container = styled.div`
  .react-datepicker-wrapper {
    display: block;
    padding: 0;
    border: 0;
  }

  .react-datepicker {
    font-size: 16px;
    border-radius: 4px;
    display: inline-block;
    position: relative;
    background-color: var(${COLORS.BACKGROUND});
    box-shadow: ${SHADOW.MEDIUM};
    line-height: 24px;
  }

  .react-datepicker__triangle {
    position: absolute;
    left: 50px;
  }

  .react-datepicker-popper {
    z-index: 1;
  }

  .react-datepicker__header {
    text-align: center;
    border-top-left-radius: 4px;
    padding-top: 16px;
    position: relative;

    &--time {
      padding: 0;

      &:not(&--only) {
        padding-bottom: 8px;
        padding-left: 5px;
        padding-right: 5px;
        border-top-left-radius: 0;
      }
    }
  }

  .react-datepicker__year-dropdown-container--select,
  .react-datepicker__month-dropdown-container--select,
  .react-datepicker__month-year-dropdown-container--select,
  .react-datepicker__year-dropdown-container--scroll,
  .react-datepicker__month-dropdown-container--scroll,
  .react-datepicker__month-year-dropdown-container--scroll {
    display: inline-block;
  }

  .react-datepicker__current-month,
  .react-datepicker-year-header {
    margin-top: 0;
    font-size: 16px;
  }

  .react-datepicker__day-names {
    display: flex;
    justify-content: space-between;
  }

  .react-datepicker__day-names,
  .react-datepicker__week {
    white-space: nowrap;
  }

  .react-datepicker__week {
    display: flex;
  }

  .react-datepicker__day-name,
  .react-datepicker__day,
  .react-datepicker__time-name {
    color: var(${COLORS.DATE});
    display: inline-block;
    width: 36px;
    height: 36px;
    line-height: 36px;
    text-align: center;
    font-size: 16px;
    outline: 0;

    &::first-letter {
      text-transform: uppercase;
    }
  }

  .react-datepicker__day-name {
    color: var(${COLORS.DAY_NAME});
    font-size: 14px;
    line-height: 20px;
  }

  .react-datepicker__day,
  .react-datepicker__month-text,
  .react-datepicker__quarter-text,
  .react-datepicker__year-text {
    cursor: pointer;

    &:hover {
      border-radius: 4px;
      background-color: var(${COLORS.DATE_BACKGROUND_HOVER});
    }

    &--in-selecting-range,
    &--in-range {
      border-radius: 4px;
      background-color: var(${COLORS.SELECTED_RANGE_BACKGROUND});
      color: var(${COLORS.SELECTED_RANGE});
    }

    &--selected,
    &--range-start,
    &--range-end {
      border-radius: 4px;
      background-color: var(${COLORS.SELECTED_BACKGROUND});
      color: var(${COLORS.SELECTED});

      &:hover {
        background-color: var(${COLORS.SELECTED_BACKGROUND_HOVER});
      }
    }

    &--in-range:not(&--in-selecting-range) {
      .react-datepicker__month--selecting-range & {
        background-color: var(${COLORS.BACKGROUND});
        color: var(${COLORS.TEXT});
      }
    }

    &--disabled:not(&--selected) {
      cursor: default;
      color: var(${COLORS.MUTED});

      &:hover {
        background-color: transparent;
      }
    }
  }

  /* stylelint-disable-next-line no-descending-specificity */
  .react-datepicker__day {
    &--today {
      color: var(${COLORS.TODAY});
      border: 1px solid var(${COLORS.TODAY_BORDER});
      border-radius: 4px;
    }

    &--today.react-datepicker__day--selected,
    &--today.react-datepicker__day--range-start,
    &--today.react-datepicker__day--range-end {
      color: var(${COLORS.SELECTED});
    }

    &--outside-month {
      cursor: not-allowed;
      pointer-events: none;
    }

    &--outside-month:not(&--selected) {
      color: var(${COLORS.MUTED});
    }

    &:active {
      background-color: var(${COLORS.SELECTED_BACKGROUND});
      color: var(${COLORS.SELECTED});
    }
  }

  .react-datepicker__year {
    margin: 0;
    text-align: center;

    &-wrapper {
      display: flex;
      flex-wrap: wrap;
      max-width: 180px;
    }

    .react-datepicker__year-text {
      display: inline-block;
    }
  }

  .react-datepicker__month {
    margin: 0;
    text-align: center;
    padding-bottom: 24px;

    .react-datepicker__month-text,
    .react-datepicker__quarter-text {
      display: inline-block;
    }
  }

  .react-datepicker__day--outside-month.react-datepicker__day--selected,
  .react-datepicker__day--outside-month.react-datepicker__day--range-start,
  .react-datepicker__day--outside-month.react-datepicker__day--range-end {
    background-color: var(${COLORS.SELECTED_RANGE_BACKGROUND});
    color: var(${COLORS.MUTED});
  }

  .react-datepicker__day--disabled.react-datepicker__day--selected {
    cursor: default;
  }

  .react-datepicker__input-container {
    position: relative;
    display: inline-block;
    width: 100%;
  }

  .react-datepicker--time-only {
    padding: 0;
    width: 100%;
  }

  /**
   * Невидимый для пользователей, но видимый для скринридера лейбл
   * оригинал: packages/datepicker/node_modules/react-datepicker/dist/react-datepicker.css
   */
  .react-datepicker__aria-live {
    position: absolute;
    clip-path: circle(0);
    border: 0;
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    width: 1px;
    white-space: nowrap;
  }
`;
