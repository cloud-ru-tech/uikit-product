import { FormValues } from '../../types';
import { setValue } from '../../utils';
import { CONTROL } from './constants';
import { FormControl } from './types';

export function getDefaultValues(controls: Record<string, FormControl>): FormValues {
  const defaultValue: FormValues = {};

  function internalGetDefaultValues(controls: Record<string, FormControl>) {
    Object.entries(controls).forEach(([key, control]) => {
      if (control) {
        switch (control.type) {
          case CONTROL.Object: {
            if (control.defaultValue !== undefined) {
              setValue(defaultValue, key, JSON.parse(JSON.stringify(control.defaultValue)));
            }

            internalGetDefaultValues(control.controls);

            break;
          }

          case CONTROL.ToggleObject: {
            setValue(defaultValue, control.switchKey, false);
            internalGetDefaultValues({ _: control.control });

            break;
          }

          case CONTROL.Alert: {
            break;
          }

          default: {
            if (control.defaultValue !== undefined) {
              const restedValue = JSON.parse(JSON.stringify(control.defaultValue));

              setValue(defaultValue, control?.accessorKey ?? '', restedValue);
            }
          }
        }
      }
    });
  }

  internalGetDefaultValues(controls);

  return defaultValue;
}
