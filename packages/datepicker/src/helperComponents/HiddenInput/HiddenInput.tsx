import isEqual from 'lodash.isequal';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRifm } from 'rifm';

import { useLanguage } from '@sbercloud/uikit-product-utils';

import { INPUT_PLACEHOLDER } from '../../helpers/constants';
import { parseDigits } from '../../helpers/parseDigits';
import { splitDateFormatter } from '../../helpers/splitDateFormatter';
import { TSplitDateType, TimeInputProps } from '../../helpers/types';
import { InputAutosize } from '../InputAutosize';
import * as S from './styled';

interface IHiddenInputProps {
  valueProp: TimeInputProps;
  date: TSplitDateType;
  propName?: string;
  minWidth?: number;
  onChange: (date: TSplitDateType) => void;
}

export const HiddenInput: React.FC<IHiddenInputProps> = ({ valueProp, date, onChange }) => {
  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });
  const [value, setValue] = useState(date[valueProp]);
  const [ref, setRef] = useState<HTMLInputElement | null>();

  const inputPlaceholder = useMemo(() => INPUT_PLACEHOLDER(languageCode), [languageCode]);

  useEffect(() => {
    if (value === date[valueProp]) return;
    setValue(date[valueProp]);
  }, [date, value, valueProp]);

  const setToTheEnd = useCallback(() => {
    ref?.setSelectionRange(value.length, value.length);
  }, [value.length]);

  useEffect(() => {
    const nextSplitDate = { ...date, [valueProp]: value };
    if (isEqual(nextSplitDate, date)) return;

    onChange(nextSplitDate);
    setToTheEnd();
  }, [value]);

  const rifm = useRifm({
    value,
    onChange: setValue,
    format: str => {
      const int = parseDigits(str);
      const isPlaceholder = value === inputPlaceholder[valueProp];
      const isDeleted = int.length < value.length;
      const deletedVal = isDeleted ? '' : int;
      const replaceVal = isPlaceholder ? int : deletedVal;
      return splitDateFormatter(valueProp, replaceVal, inputPlaceholder);
    },
    mask: true,
  });

  const handleClick = useCallback(() => {
    setToTheEnd();
  }, [setToTheEnd]);

  return (
    <InputAutosize
      onClick={handleClick}
      inputClassName={S.hiddenInputClassName}
      value={rifm.value}
      onChange={rifm.onChange}
      inputRef={setRef}
    />
  );
};
