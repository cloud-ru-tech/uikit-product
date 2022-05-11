import { HTMLInputTypeAttribute } from 'react';

import { Mode } from '../constants';
import { Value } from '../types';
import { useToggleGroupMode } from './useToggleGroupMode';
import { useToggleGroupName } from './useToggleGroupName';
import { useToggleGroupOnChange } from './useToggleGroupOnChange';
import { useToggleGroupValue } from './useToggleGroupValue';

export function useToggleState(value: Value) {
  const groupMode = useToggleGroupMode();
  const groupValue = useToggleGroupValue();
  const groupOnChange = useToggleGroupOnChange();
  const groupName = useToggleGroupName();
  const type: HTMLInputTypeAttribute = groupMode ?? 'hidden';
  const checked = groupValue.includes(value);

  return {
    type,
    checked,
    name: groupName,
    onChange() {
      if (groupMode === Mode.Checkbox) {
        groupOnChange(checked ? groupValue.filter(item => item !== value) : [value, ...groupValue]);
        return;
      }

      if (groupMode === Mode.Radio) {
        groupOnChange([value]);
        return;
      }
    },
  };
}
