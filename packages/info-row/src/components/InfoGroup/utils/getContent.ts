import { LanguageCodeType } from '@sbercloud/uikit-product-utils';

import { textProvider, Texts } from '../../../helpers';
import { NO_DATA_PLACEHOLDER } from '../constants';
import { DataType, InfoGroupItem, InfoGroupProps } from '../types';
import { isArray, isBoolean, isNil, isObject, isString } from './typeGuards';

type Props<T extends DataType> = Pick<InfoGroupProps<T>, 'data'> &
  Pick<InfoGroupItem<T>, 'accessorKey' | 'render'> & { languageCode: LanguageCodeType };

export const getContent = <T extends DataType>({ data, accessorKey, render, languageCode }: Props<T>) => {
  if (!data) {
    return NO_DATA_PLACEHOLDER;
  }

  const value = accessorKey ? data[accessorKey] : undefined;

  if (!isNil(value)) {
    if (isBoolean(value)) {
      const text = value ? Texts.BooleanValueTrue : Texts.BooleanValueFalse;
      return textProvider(languageCode, text);
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
