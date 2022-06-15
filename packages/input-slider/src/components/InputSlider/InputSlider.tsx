import 'rc-slider/assets/index.css';

import { InputDecoratorPrivate } from '@sbercloud/uikit-product-input-decorator-private';
import { InputPrivate } from '@sbercloud/uikit-product-input-private';
import { extractSupportProps } from '@sbercloud/uikit-product-utils';

import { getValueInRange } from '../helpers';
import * as S from '../styled';
import { InputSliderProps } from '../types';
import { useFocus } from '../useFocus';
import { useMarks } from '../useMarks';

export function InputSlider({
  disabled = false,
  hint,
  postfix,
  label,
  labelTooltip,
  max,
  min,
  marks,
  optional,
  step,
  value,
  onChange,

  ...rest
}: InputSliderProps) {
  const { isFocus, onFocus, onBluer } = useFocus();
  const { privateMarks } = useMarks(min, max, marks);

  const sliderHandler = (v: number | number[]) => {
    if (typeof v === 'number') {
      return onChange(v);
    }

    onChange(v[0]);
  };

  const inputHandler = (v: string) => {
    onChange(getValueInRange(Number(v), min, max));
  };

  return (
    <InputDecoratorPrivate
      hint={hint}
      label={label}
      labelTooltip={labelTooltip}
      optional={optional}
      {...extractSupportProps(rest)}
    >
      <S.InputWrapper data-focus={isFocus} data-disabled={disabled}>
        <S.BaseInput
          data-test-id={'input-slider__input'}
          type={InputPrivate.types.Number}
          value={String(getValueInRange(value, min, max))}
          onChange={inputHandler}
          disabled={disabled}
          onFocus={onFocus}
          onBlur={onBluer}
        />

        {postfix && <S.InputPostfixTextWrapper data-disabled={disabled}>{postfix}</S.InputPostfixTextWrapper>}
      </S.InputWrapper>

      <S.InputSlider
        disabled={disabled}
        dotStyle={S.dotStyle}
        handleStyle={S.handleStyle(disabled)}
        marks={privateMarks}
        max={max}
        min={min}
        railStyle={S.railStyle(disabled)}
        step={step}
        trackStyle={S.trackStyle(disabled)}
        value={Number(value)}
        onChange={sliderHandler}
      />
    </InputDecoratorPrivate>
  );
}
