import { ReactNode } from 'react';

import { SelectChipProps } from '../../types';

export const SET_CHECKED = 'SET_CHECKED';
export const SET_ALL_CHECKED = 'SET_ALL_CHECKED';
export const CLEAR_STATE = 'CLEAR_STATE';
export const SET_DEFAULT_STATE = 'SET_DEFAULT_STATE';

export type FilterChipState = {
  allChecked: {
    value: boolean;
    partially: boolean;
  };
  values: {
    [id: string]: {
      label: ReactNode;
      checked: boolean;
    };
  };
};

type SetCheckedAction = {
  type: typeof SET_CHECKED;
  payload: {
    id: string;
    label: ReactNode;
    checked: boolean;
  };
};

type SetAllCheckedAction = {
  type: typeof SET_ALL_CHECKED;
};

type ClearStateAction = {
  type: typeof CLEAR_STATE;
  payload: SelectChipProps['items'];
};

type DefaultStateAction = {
  type: typeof SET_DEFAULT_STATE;
  payload: SelectChipProps['items'];
};

type Action = SetCheckedAction | SetAllCheckedAction | ClearStateAction | DefaultStateAction;

export const getDefaultState = (items: SelectChipProps['items']): FilterChipState => ({
  allChecked: {
    value: items.every(value => value.checked),
    partially: items.some(value => value.checked),
  },
  values: items.reduce((acc, next) => {
    acc[next.value] = {
      label: next.label,
      checked: next.checked || false,
    };

    return acc;
  }, {}),
});

export const getClearedState = (items: SelectChipProps['items']): FilterChipState => ({
  allChecked: {
    value: false,
    partially: false,
  },
  values: items.reduce((acc, next) => {
    acc[next.value] = {
      label: next.label,
      checked: false,
    };

    return acc;
  }, {}),
});

export const reducer = (state: FilterChipState, action: Action) => {
  const { type } = action;

  switch (type) {
    case SET_CHECKED: {
      const { payload } = action;
      const newValues = {
        ...state.values,
        [payload.id]: {
          label: payload.label,
          checked: payload.checked,
        },
      };

      const valuesArray = Object.values(newValues);

      return {
        allChecked: {
          value: valuesArray.every(value => value.checked),
          partially: valuesArray.some(value => value.checked),
        },
        values: newValues,
      };
    }

    case SET_ALL_CHECKED:
      const newValues = Object.keys(state.values).reduce((acc, next) => {
        acc[next] = {
          ...state.values[next],
          checked: state.allChecked.partially ? false : !state.allChecked.value,
        };
        return acc;
      }, {});

      return {
        allChecked: {
          value: state.allChecked.partially ? false : !state.allChecked.value,
          partially: false,
        },
        values: newValues,
      };
    case CLEAR_STATE:
      return getClearedState(action.payload);
    case SET_DEFAULT_STATE:
      return getDefaultState(action.payload);
    default:
      return state;
  }
};
