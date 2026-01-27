import { useLocale } from '@cloud-ru/uikit-product-locale';

import { NO_DATA_PLACEHOLDER } from '../constants';
import { DataType, MobileInfoGroupItem, MobileInfoGroupProps } from '../types';
import { isArray, isBoolean, isNil, isObject, isString } from './typeGuards';

type Props<T extends DataType> = Pick<MobileInfoGroupProps<T>, 'data'> &
  Pick<MobileInfoGroupItem<T>, 'accessorKey' | 'render'>;

export function useGetContent() {
  const { t } = useLocale('InfoRow');

  return function getContent<T extends DataType>({ data, accessorKey, render }: Props<T>) {
    if (!data) {
      return NO_DATA_PLACEHOLDER;
    }

    const value = accessorKey ? data[accessorKey] : undefined;

    if (!isNil(value)) {
      if (isBoolean(value)) {
        return value ? t('booleanValueTrue') : t('booleanValueFalse');
      }

      if (isString(value)) {
        return value ? value : NO_DATA_PLACEHOLDER;
      }

      if (isArray(value)) {
        return value.length ? value.join(', ') : NO_DATA_PLACEHOLDER;
      }

      if (isObject(value)) {
        return Object.keys(value).length ? JSON.stringify(value) : NO_DATA_PLACEHOLDER;
      }

      return String(value);
    }

    if (render) {
      return render(data, NO_DATA_PLACEHOLDER);
    }

    return NO_DATA_PLACEHOLDER;
  };
}
