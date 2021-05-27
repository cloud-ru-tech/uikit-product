import { TState, TTabValue } from './types';

enum actions {
  SET_VALUE = 'SET_VALUE',
}

export type TAction = {
  type: actions.SET_VALUE;
  payload: TTabValue;
};

export const setValue = (value: TTabValue): TAction => ({
  type: actions.SET_VALUE,
  payload: value,
});

export const reducer = (state: TState, action: TAction): TState => {
  if (action.type === actions.SET_VALUE) {
    return { value: action.payload };
  }

  return state;
};
