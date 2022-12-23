import isEqual from 'lodash.isequal';
import { ChangeEvent, KeyboardEvent, useEffect, useMemo, useState } from 'react';

import { useLanguage } from '@sbercloud/uikit-product-utils';

import { INPUT_PLACEHOLDER } from '../../helpers/constants';
import { splitDateFormatter } from '../../helpers/splitDateFormatter';
import { TimeInputProps, TSplitDateType } from '../../helpers/types';
import { InputAutosize } from '../InputAutosize';
import * as S from './styled';

type HiddenInputProps = {
  valueProp: TimeInputProps;
  date: TSplitDateType;
  propName?: string;
  minWidth?: number;
  onChange: (date: TSplitDateType) => void;
  handleCalendarClose(): void;
};

export function HiddenInput({ valueProp, date, onChange, handleCalendarClose }: HiddenInputProps) {
  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });
  const [value, setValue] = useState(date[valueProp]);
  const [ref, setRef] = useState<HTMLInputElement | null>();

  const inputPlaceholder = useMemo(() => INPUT_PLACEHOLDER(languageCode), [languageCode]);

  useEffect(() => {
    setValue(date[valueProp]);
  }, [date, valueProp]);

  useEffect(() => {
    const nextSplitDate = { ...date, [valueProp]: value };
    if (isEqual(nextSplitDate, date)) return;

    onChange(nextSplitDate);
    ref?.setSelectionRange(value.length, value.length);
  }, [value]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (Number.isNaN(Number(value))) return;

    const v = splitDateFormatter(valueProp, value, inputPlaceholder);
    setValue(v);
  };

  const handleClick = () => {
    ref?.setSelectionRange(0, value.length);
  };

  const handleKeyDownClick = (e: KeyboardEvent<HTMLInputElement>) => {
    if (['Enter', 'Escape'].includes(e.key)) {
      handleCalendarClose();
    }
  };

  return (
    <InputAutosize
      onClick={handleClick}
      onKeyDown={handleKeyDownClick}
      inputClassName={S.hiddenInputClassName}
      value={value}
      onChange={handleChange}
      inputRef={setRef}
    />
  );
}
