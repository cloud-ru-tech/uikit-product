import { get, set } from 'lodash';

import { AnyType } from '../types';

export function getValue(obj: AnyType, key: string): AnyType {
  return get(obj, key);
}

export function setValue(obj: AnyType, key: string, value: AnyType): AnyType {
  return set(obj, key, value);
}
