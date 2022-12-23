import { styled } from '@linaria/react';

import { DEPRECATED_EXPORT_VARS } from '@sbercloud/uikit-product-theme';

const { COLORS_DATEPICKER } = DEPRECATED_EXPORT_VARS;

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
    background-color: var(${COLORS_DATEPICKER.BACKGROUND_COLOR});

    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);

    line-height: 24px;
  }

  .react-datepicker__day--today:not(.react-datepicker__day--selected) {
    color: var(${COLORS_DATEPICKER.TODAY_COLOR});
    border: 1px solid var(${COLORS_DATEPICKER.TODAY_BORDER_COLOR});
    border-radius: 4px;
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
  }

  .react-datepicker__year-dropdown-container--select,
  .react-datepicker__month-dropdown-container--select,
  .react-datepicker__month-year-dropdown-container--select,
  .react-datepicker__year-dropdown-container--scroll,
  .react-datepicker__month-dropdown-container--scroll,
  .react-datepicker__month-year-dropdown-container--scroll {
    display: inline-block;
    margin: 0 2px;
  }

  .react-datepicker__current-month,
  .react-datepicker-year-header {
    margin-top: 0;
    font-size: 16px;
  }

  .react-datepicker__month-container {
    margin: 0 12px;
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
      margin: 2px;
    }
  }

  .react-datepicker__month {
    margin: 0;
    text-align: center;
    padding-bottom: 16px;
    .react-datepicker__month-text,
    .react-datepicker__quarter-text {
      display: inline-block;
      margin: 2px;
    }
  }

  .react-datepicker__day-names {
    padding: 6px 0;
  }

  .react-datepicker__day-names,
  .react-datepicker__week {
    white-space: nowrap;
  }

  .react-datepicker__day-name,
  .react-datepicker__day,
  .react-datepicker__time-name {
    color: var(${COLORS_DATEPICKER.DATE_COLOR});
    display: inline-block;
    width: 36px;
    line-height: 36px;
    text-align: center;
    margin: 2px;
    font-size: 16px;
    outline: 0;

    &::first-letter {
      text-transform: uppercase;
    }
  }

  .react-datepicker__day-name {
    color: var(${COLORS_DATEPICKER.DAY_NAME_COLOR});
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
      background-color: var(${COLORS_DATEPICKER.DATE_HOVER_BACKGROUND_COLOR});
    }

    &--selected,
    &--in-selecting-range,
    &--in-range {
      border-radius: 4px;
      background-color: var(${COLORS_DATEPICKER.SELECTED_BACKGROUND_COLOR});
      color: var(${COLORS_DATEPICKER.SELECTED_COLOR});

      &:hover {
        background-color: var(${COLORS_DATEPICKER.SELECTED_BACKGROUND_HOVER_COLOR});
      }
    }

    &--in-range:not(&--in-selecting-range) {
      .react-datepicker__month--selecting-range & {
        background-color: var(${COLORS_DATEPICKER.BACKGROUND_COLOR});
        color: var(${COLORS_DATEPICKER.TEXT_COLOR});
      }
    }

    &--disabled:not(&--selected) {
      cursor: default;
      color: var(${COLORS_DATEPICKER.MUTED_COLOR});

      &:hover {
        background-color: transparent;
      }
    }
  }

  .react-datepicker__day--disabled.react-datepicker__day--selected {
    cursor: default;
  }

  .react-datepicker__input-container {
    position: relative;
    display: inline-block;
    width: 100%;
  }

  .react-datepicker__day--outside-month {
    visibility: hidden;
  }

  .react-datepicker--time-only {
    padding: 0;
    width: 100%;
  }

  .react-datepicker__header {
    text-align: center;
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
`;
