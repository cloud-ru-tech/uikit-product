import 'rc-slider/assets/index.css';

import debounce from 'lodash.debounce';
import { forwardRef, useEffect, useMemo, useState } from 'react';

import { InputDecoratorPrivate } from '@sbercloud/uikit-product-input-decorator-private';
import { InputPrivate } from '@sbercloud/uikit-product-input-private';
import { extractSupportProps } from '@sbercloud/uikit-product-utils';

import { getValueInRange } from '../helpers';
import * as S from '../styled';
import { InputSliderProps, MarkDetail, MarksPlacement } from '../types';
import { useFocus } from '../useFocus';
import { useMarks } from '../useMarks';
export type { InputSliderProps };
export type { MarkDetail };

const ForwarderInputSlider = forwardRef<HTMLInputElement, InputSliderProps>(
  (
    {
      disabled = false,
      hint,
      postfix,
      label,
      labelTooltip,
      onFocus,
      onBlur,
      max,
      min,
      marks,
      marksPlacementType,
      optional,
      selectOnlyMarks,
      step,
      value,
      onChange,

      ...rest
    },
    ref,
  ) => {
    const onlyMarks = marksPlacementType === MarksPlacement.LinearOnlyMarks || selectOnlyMarks;
    const { privateMarks, privateMarksList, privateMarksValuesList } = useMarks(min, max, marks, marksPlacementType);

    const [tempInputValue, setTempInputValue] = useState(
      String(getValueInRange({ value, min, max, marks: privateMarks, marksPlacementType })),
    );
    useEffect(() => setTempInputValue(String(value)), [value]);
    const sliderValue = useMemo(() => {
      if (marksPlacementType !== MarksPlacement.LinearOnlyMarks) {
        return value;
      }

      return Number(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        Object.entries(privateMarks).find(([_valueForSlider, { label: realValue }]) => realValue === value)?.[0],
      );
    }, [marksPlacementType, privateMarks, value]);

    const sliderHandler = (v: number | number[]) => {
      let newValue = typeof v === 'number' ? v : v[0];
      newValue = getValueInRange({ value: newValue, min, max, marks: privateMarks, marksPlacementType });

      onChange(newValue);
    };

    const inputHandlerToClosestStepDebounced = useMemo(
      () =>
        debounce((v: string, onChange: InputSliderProps['onChange']) => {
          if (!privateMarksValuesList.length) {
            return;
          }

          let newValue = getValueInRange({ value: Number(v), min, max, marks: privateMarks, marksPlacementType });
          // find closest to newValue mark
          newValue = privateMarksValuesList.reduce((prev, curr) =>
            Math.abs(curr - newValue) < Math.abs(prev - newValue) ? curr : prev,
          );

          setTempInputValue(String(newValue));
          onChange(newValue);
        }, 500),
      [marksPlacementType, max, min, privateMarks, privateMarksValuesList],
    );

    const inputHandler = (v: string) => {
      if (onlyMarks) {
        setTempInputValue(v);
        inputHandlerToClosestStepDebounced(v, onChange);
      } else {
        const formattedValue = getValueInRange({ value: Number(v), min, max, marks: privateMarks, marksPlacementType });
        setTempInputValue(`${formattedValue}`);
        onChange(formattedValue);
      }
    };

    const { isFocus, handleFocus, handleBlur } = useFocus({ onFocus, onBlur });

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
            ref={ref}
            data-test-id={'input-slider__input'}
            type={InputPrivate.types.Number}
            value={tempInputValue}
            onChange={inputHandler}
            disabled={disabled}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />

          {postfix && (
            <S.InputPostfixTextWrapper data-test-id={'input-slider__postfix'} data-disabled={disabled}>
              {postfix}
            </S.InputPostfixTextWrapper>
          )}
        </S.InputWrapper>

        <S.InputSlider
          disabled={disabled}
          dotStyle={S.dotStyle}
          handleStyle={S.handleStyle(disabled)}
          marks={privateMarks}
          min={privateMarksList[0]}
          max={privateMarksList[privateMarksList.length - 1]}
          railStyle={S.railStyle(disabled)}
          step={onlyMarks ? null : step}
          trackStyle={S.trackStyle(disabled)}
          value={sliderValue}
          onChange={sliderHandler}
        />
      </InputDecoratorPrivate>
    );
  },
);

export const InputSlider = ForwarderInputSlider as typeof ForwarderInputSlider & {
  marksPlacementType: typeof MarksPlacement;
};

InputSlider.marksPlacementType = MarksPlacement;
