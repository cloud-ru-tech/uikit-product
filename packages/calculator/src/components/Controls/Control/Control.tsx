import { useCalculatorContext, useProductContext } from '../../../contexts';
import { AnyType, FormValues } from '../../../types';
import { getValue, setValue } from '../../../utils';
import { AlertControlUi } from '../AlertControl';
import { ArrayControlUi } from '../ArrayControl';
import { CarouselControlUi } from '../CarouselControl';
import { CONTROL } from '../constants';
import { ObjectControlUi } from '../ObjectControl';
import { SegmentedControlUi } from '../SegmentedControl';
import { SelectMultipleUi, SelectSingleUi } from '../SelectControl';
import { StepperControlUi } from '../StepperControl';
import { TableControlUi } from '../TableControl';
import { ToggleCardsControlUi } from '../ToggleCardsControl';
import { ToggleControlUi } from '../ToggleControl';
import { ToggleObjectControlUi } from '../ToggleObjectControl';
import { FormControl } from '../types';

type ControlProps = {
  formControl: FormControl & { accessorKey?: string };
};

export function Control({ formControl }: ControlProps) {
  const { calculatorType } = useCalculatorContext();
  const { value: valueProp, onChange: onChangeProp, priceList: priceListProp } = useProductContext();

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

  const accessorKey = formControl?.accessorKey ?? '';

  const value = getValue(valueProp, accessorKey);
  const priceList = getValue(priceListProp, accessorKey);
  let onChange = (newValue: AnyType) => {
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

    onChange = (newValue: AnyType) => {
      formControl?.onChangeFn?.(newValue, setValueFn);
    };
  }

  switch (formControl.type) {
    case CONTROL.Table: {
      return <TableControlUi {...formControl} value={value} onChange={onChange} priceList={priceList} />;
    }
    case CONTROL.Carousel: {
      return <CarouselControlUi {...formControl} value={value} onChange={onChange} watchedValues={watchedValues} />;
    }
    case CONTROL.ToggleCards: {
      return <ToggleCardsControlUi {...formControl} value={value} onChange={onChange} watchedValues={watchedValues} />;
    }
    case CONTROL.SelectSingle: {
      return <SelectSingleUi {...formControl} value={value} onChange={onChange} watchedValues={watchedValues} />;
    }
    case CONTROL.SelectMultiple: {
      return <SelectMultipleUi {...formControl} value={value} onChange={onChange} watchedValues={watchedValues} />;
    }
    case CONTROL.Segmented: {
      return <SegmentedControlUi {...formControl} value={value} onChange={onChange} watchedValues={watchedValues} />;
    }
    case CONTROL.Toggle: {
      return <ToggleControlUi {...formControl} value={value} onChange={onChange} watchedValues={watchedValues} />;
    }
    case CONTROL.Stepper: {
      return <StepperControlUi {...formControl} value={value} onChange={onChange} watchedValues={watchedValues} />;
    }
    case CONTROL.ToggleObject: {
      return <ToggleObjectControlUi {...formControl} value={value} onChange={onChange} watchedValues={watchedValues} />;
    }
    case CONTROL.Alert: {
      return <AlertControlUi {...formControl} watchedValues={watchedValues} />;
    }
    default:
      throw new Error('not reachable');
  }
}
