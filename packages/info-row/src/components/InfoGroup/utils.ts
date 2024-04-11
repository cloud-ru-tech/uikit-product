import { LanguageCodeType } from '@sbercloud/uikit-product-utils';

import { textProvider, Texts } from '../../helpers';
import { DataType, InfoGroupItem, InfoGroupProps } from './types';

const isNil = (value: unknown): value is undefined | null => value === undefined || value === null;
const isBoolean = (value: unknown): value is boolean => typeof value === 'boolean';

type Props<T extends DataType> = Pick<InfoGroupProps<T>, 'data'> &
  Pick<InfoGroupItem<T>, 'accessorKey' | 'render'> & { languageCode: LanguageCodeType };

export const getContent = <T extends DataType>({ data, accessorKey, render, languageCode }: Props<T>) => {
  if (!data) {
    return null;
  }

  const value = accessorKey ? data[accessorKey] : undefined;

  if (!isNil(value)) {
    if (isBoolean(value)) {
      const text = value ? Texts.BooleanValueTrue : Texts.BooleanValueFalse;
      return textProvider(languageCode, text);
    }

    return String(value);
  }

  if (render) {
    return render(data);
  }

  return null;
};
