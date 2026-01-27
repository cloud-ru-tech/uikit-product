import { forwardRef } from 'react';

import { WithLayoutType } from '@cloud-ru/uikit-product-utils';
import {
  FieldColor,
  FieldColorProps,
  FieldDate,
  FieldDateProps,
  FieldSecure,
  FieldSecureProps,
  FieldSelect,
  FieldSelectMultipleProps,
  FieldSelectProps,
  FieldSelectSingleProps,
  FieldSlider,
  FieldSliderProps,
  FieldStepper,
  FieldStepperProps,
  FieldText,
  FieldTextArea,
  FieldTextAreaProps,
  FieldTextProps,
  FieldTime,
  FieldTimeProps,
} from '@snack-uikit/fields';

import { getAdaptiveFieldProps, withAdaptiveField } from '../../utils/adaptiveField';
import { MobileFieldDate } from '../MobileFieldDate';
import { MobileFieldSelect } from '../MobileFieldSelect';

export const AdaptiveFieldSelect = forwardRef<HTMLInputElement, WithLayoutType<FieldSelectProps>>(
  function AdaptiveFieldSelect(props, ref) {
    const isMobile = props.layoutType === 'mobile';

    return isMobile ? (
      <MobileFieldSelect {...props} {...getAdaptiveFieldProps(props)} ref={ref} />
    ) : (
      <FieldSelect {...props} {...getAdaptiveFieldProps(props)} ref={ref} />
    );
  },
);

export const AdaptiveFieldDate = forwardRef<HTMLInputElement, WithLayoutType<FieldDateProps>>(
  function AdaptiveFieldDate(props, ref) {
    const isMobile = props.layoutType === 'mobile';

    return isMobile ? (
      <MobileFieldDate {...props} {...getAdaptiveFieldProps(props)} ref={ref} />
    ) : (
      <FieldDate {...props} {...getAdaptiveFieldProps(props)} ref={ref} />
    );
  },
);

export const AdaptiveFieldColor: ReturnType<typeof withAdaptiveField<FieldColorProps, HTMLInputElement>> =
  withAdaptiveField(FieldColor);

export const AdaptiveFieldSecure: ReturnType<typeof withAdaptiveField<FieldSecureProps, HTMLInputElement>> =
  withAdaptiveField(FieldSecure);

export const AdaptiveFieldSlider: ReturnType<typeof withAdaptiveField<FieldSliderProps, HTMLInputElement>> =
  withAdaptiveField(FieldSlider);

export const AdaptiveFieldStepper: ReturnType<typeof withAdaptiveField<FieldStepperProps, HTMLInputElement>> =
  withAdaptiveField(FieldStepper);

export const AdaptiveFieldText: ReturnType<typeof withAdaptiveField<FieldTextProps, HTMLInputElement>> =
  withAdaptiveField(FieldText);

export const AdaptiveFieldTextArea: ReturnType<typeof withAdaptiveField<FieldTextAreaProps, HTMLTextAreaElement>> =
  withAdaptiveField(FieldTextArea);

export const AdaptiveFieldTime: ReturnType<typeof withAdaptiveField<FieldTimeProps, HTMLInputElement>> =
  withAdaptiveField(FieldTime);

export type {
  FieldColorProps,
  FieldDateProps,
  FieldSecureProps,
  FieldSelectMultipleProps,
  FieldSelectProps,
  FieldSelectSingleProps,
  FieldSliderProps,
  FieldStepperProps,
  FieldTextAreaProps,
  FieldTextProps,
  FieldTimeProps,
};
