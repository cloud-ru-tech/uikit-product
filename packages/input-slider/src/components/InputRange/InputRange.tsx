import 'rc-slider/assets/index.css';

import { forwardRef } from 'react';

import { InputDecoratorPrivate } from '@sbercloud/uikit-product-input-decorator-private';
import { InputPrivate } from '@sbercloud/uikit-product-input-private';
import { extractSupportProps } from '@sbercloud/uikit-product-utils';

import { getValueInRange } from '../helpers';
import * as S from '../styled';
import { InputRangeProps } from '../types';
import { useFocus } from '../useFocus';
import { useMarks } from '../useMarks';
export type { InputRangeProps };
const ForwarderInputRange = forwardRef<HTMLInputElement, InputRangeProps>(
  (
    {
      disabled = false,
      hint,
      postfix,
      label,
      labelTooltip,
      marks,
      max,
      min,
      optional,
      step,
      value,
      onChange,

      ...rest
    },
    ref,
  ) => {
    const { isFocus, handleFocus, handleBlur } = useFocus();
    const { privateMarks } = useMarks(min, max, marks);

    const changeHandler = (v: number | number[]) => {
      onChange([v[0], v[1]]);
    };

    const firstInputHandler = (v: string) => {
      if (Number(v) > value[1]) {
        return onChange([value[1], value[1]]);
      }

      if (Number(v) < min) {
        return onChange([min, value[1]]);
      }

      onChange([Number(v), value[1]]);
    };

    const secondInputHandler = (v: string) => {
      if (Number(v) < min) {
        return onChange([min, min]);
      }

      if (Number(v) > max) {
        return onChange([value[0], max]);
      }

      if (Number(v) < value[0]) {
        return onChange([Number(v), Number(v)]);
      }

      onChange([value[0], Number(v)]);
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
          <S.ShortBaseInputWrapper width={String(value[0]).length}>
            <S.ShortBaseInput
              ref={ref}
              data-test-id='input-slider__input-min'
              type={InputPrivate.types.Number}
              disabled={disabled}
              value={String(getValueInRange({ value: value[0], min, max, marks: privateMarks }))}
              onChange={firstInputHandler}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </S.ShortBaseInputWrapper>

          <S.DelimiterWrapper data-disabled={disabled}>-</S.DelimiterWrapper>

          <S.BaseInput
            data-test-id={'input-slider__input-max'}
            value={String(getValueInRange({ value: value[1], min, max, marks: privateMarks }))}
            onChange={secondInputHandler}
            disabled={disabled}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />

          {postfix && <S.InputPostfixTextWrapper data-disabled={disabled}>{postfix}</S.InputPostfixTextWrapper>}
        </S.InputWrapper>

        <S.InputRange
          range
          activeDotStyle={S.dotStyle}
          disabled={disabled}
          dotStyle={S.dotStyle}
          handleStyle={[S.handleStyle(disabled), S.handleStyle(disabled)]}
          marks={privateMarks}
          max={max}
          min={min}
          railStyle={S.railStyle(disabled)}
          step={step}
          trackStyle={[S.trackStyle(disabled)]}
          value={value}
          onChange={changeHandler}
        />
      </InputDecoratorPrivate>
    );
  },
);

export const InputRange = ForwarderInputRange;
