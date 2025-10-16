import { useEffect } from 'react';

import { useCalculatorContext, useProductContext } from '../../../contexts';
import { AnyType, FormValues, PRICE_PERIOD } from '../../../types';
import { getValue, setValue } from '../../../utils';
import { AlertControlUi } from '../AlertControl';
import { ArrayControlUi } from '../ArrayControl';
import { CarouselControlUi } from '../CarouselControl';
import { CONTROL } from '../constants';
import { ObjectControlUi } from '../ObjectControl';
import { SegmentedControlUi } from '../SegmentedControl';
import { SelectMultipleUi, SelectSingleUi } from '../SelectControl';
import { SliderControlUi } from '../SliderControl';
import { StepperControlUi } from '../StepperControl';
import { TableControlUi } from '../TableControl';
import { ToggleCardsControlUi } from '../ToggleCardsControl';
import { ToggleControlUi } from '../ToggleControl';
import { ToggleObjectControlUi } from '../ToggleObjectControl';
import { FormControl } from '../types';

type ControlProps = {
  formControl: FormControl & {
    accessorKey?: string;
    onChangePeriod?: (period: PRICE_PERIOD, setValue: (arr: [string, AnyType][]) => void) => void;
    canChangeWholePricePeriod?: boolean;
  };
};

export function Control({ formControl }: ControlProps) {
  const { calculatorType } = useCalculatorContext();
  const { value: valueProp, onChange: onChangeProp, priceList: priceListProp } = useProductContext();
  const { pricePeriod, setPricePeriod, onAnalyticsClick } = useCalculatorContext();

  const accessorKey = formControl?.accessorKey ?? '';

  useEffect(() => {
    const setValueFn = (arr: [string, AnyType][]) => {
      arr.forEach(([accessorKey, newValue]) => {
        setValue(valueProp, accessorKey, newValue);
      });

      onChangeProp(valueProp);
    };

    // Если в разных продуктах есть поля с одинаковыми названиями ключа,
    // то в formControl может возникнуть конфликт с определением и изменением значений этих полей.
    // Попробуйте поменять название поля на другое уникальное значение.

    formControl?.onChangePeriod?.(pricePeriod, setValueFn);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pricePeriod]);

  const watchedValues = Object.keys(formControl?.watchedControls ?? {})?.reduce((res, fieldName) => {
    const key = formControl?.watchedControls?.[fieldName];

    if (key) {
      res[fieldName] = getValue(valueProp, key);
    }
    return res;
  }, {} as FormValues);

  watchedValues.calculatorType = calculatorType;

  if (formControl.type === CONTROL.Object) {
    return <ObjectControlUi {...formControl} watchedValues={watchedValues} />;
  }

  if (formControl.type === CONTROL.Array) {
    return <ArrayControlUi {...formControl} />;
  }

  const value = getValue(valueProp, accessorKey);
  const priceList = getValue(priceListProp, accessorKey);
  let onChange = (uiType: string) => (newValue: AnyType) => {
    if (formControl?.canChangeWholePricePeriod) {
      setPricePeriod(newValue);
    }
    if (typeof newValue === 'object') {
      onAnalyticsClick(Object.values(newValue).join(' '), `${uiType}-${accessorKey}`);
    } else {
      onAnalyticsClick(String(newValue), `${uiType}-${accessorKey}`);
    }
    setValue(valueProp, accessorKey, newValue);
    onChangeProp(valueProp);
  };

  if (formControl?.onChangeFn) {
    const setValueFn = (arr: [string, AnyType][]) => {
      arr.forEach(([accessorKey, newValue]) => {
        setValue(valueProp, accessorKey, newValue);
      });

      onChangeProp(valueProp);
    };

    onChange = (uiType: string) => (newValue: AnyType) => {
      onAnalyticsClick(String(newValue), `${uiType}-${accessorKey}`);
      formControl?.onChangeFn?.(newValue, setValueFn);
    };
  }

  switch (formControl.type) {
    case CONTROL.Table: {
      return (
        <TableControlUi {...formControl} value={value} onChange={onChange('table-control-ui')} priceList={priceList} />
      );
    }
    case CONTROL.Carousel: {
      return (
        <CarouselControlUi
          {...formControl}
          value={value}
          onChange={onChange('carousel-control-ui')}
          watchedValues={watchedValues}
        />
      );
    }
    case CONTROL.ToggleCards: {
      return (
        <ToggleCardsControlUi
          {...formControl}
          value={value}
          onChange={onChange('toggle-cards-control-ui')}
          watchedValues={watchedValues}
        />
      );
    }
    case CONTROL.SelectSingle: {
      return (
        <SelectSingleUi
          {...formControl}
          value={value}
          onChange={onChange('select-single-ui')}
          watchedValues={watchedValues}
        />
      );
    }
    case CONTROL.SelectMultiple: {
      return (
        <SelectMultipleUi
          {...formControl}
          value={value}
          onChange={onChange('select-multiple-ui')}
          watchedValues={watchedValues}
        />
      );
    }
    case CONTROL.Segmented: {
      return (
        <SegmentedControlUi
          {...formControl}
          value={value}
          onChange={onChange('segment-control-ui')}
          watchedValues={watchedValues}
        />
      );
    }
    case CONTROL.Toggle: {
      return (
        <ToggleControlUi
          {...formControl}
          value={value}
          onChange={onChange('toggle-control-ui')}
          watchedValues={watchedValues}
        />
      );
    }
    case CONTROL.Stepper: {
      return (
        <StepperControlUi
          {...formControl}
          value={value}
          onChange={onChange('stepper-control-ui')}
          watchedValues={watchedValues}
        />
      );
    }
    case CONTROL.ToggleObject: {
      return (
        <ToggleObjectControlUi
          {...formControl}
          value={value}
          onChange={onChange('toggle-object-ui')}
          watchedValues={watchedValues}
        />
      );
    }
    case CONTROL.Alert: {
      return <AlertControlUi {...formControl} watchedValues={watchedValues} />;
    }
    case CONTROL.Slider: {
      return (
        <SliderControlUi
          {...formControl}
          value={value}
          onChange={onChange('slider-control-ui')}
          watchedValues={watchedValues}
        />
      );
    }
    default:
      throw new Error('not reachable');
  }
}
