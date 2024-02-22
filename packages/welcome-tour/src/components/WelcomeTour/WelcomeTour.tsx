import { forwardRef } from 'react';
import JoyRide, { CallBackProps, STATUS, TooltipRenderProps } from 'react-joyride';

import { themeVars } from '@sbercloud/figma-tokens-cloud-platform';

import { Hint } from '../Hint';
import { TourStepExtended } from '../types';

const customColors = {
  options: {
    arrowColor: themeVars.sys.neutral.background2Level,
    overlayColor: themeVars.sys.blackout,
  },
};

const customArrowSize = {
  styles: {
    arrow: {
      length: 8,
      spread: 16,
    },
  },
};

export type WelcomeTourProps = {
  tourSteps: TourStepExtended[];
  tourStarted: boolean;
  setTourStarted(value: boolean, status: CallBackProps['status']): void;
  closeButtonProps: {
    label: string;
    onClick?(): void;
  };
  primaryButtonProps: {
    label: string;
    onClick?(): void;
  };
  backButtonProps?: {
    label: string;
    onClick?(): void;
  };
  customScrollOffset?: number;
};

const WelcomeTourWithRef = forwardRef<JoyRide, WelcomeTourProps>(
  (
    {
      tourSteps,
      tourStarted,
      setTourStarted,
      closeButtonProps,
      primaryButtonProps,
      backButtonProps,
      customScrollOffset,
    },
    ref,
  ) => {
    const stepsWithoutBeacon = tourSteps.map(step => ({ ...step, disableBeacon: true }));
    const checkTourFinish = ({ status }: CallBackProps) => {
      if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
        setTourStarted(false, status);
      }
    };

    const renderTooltipComponent = (props: TooltipRenderProps) => (
      <Hint
        backButton={
          backButtonProps
            ? {
                ...props.backProps,
                label: backButtonProps.label,
                onClick: e => {
                  backButtonProps.onClick?.();
                  props.backProps.onClick(e);
                },
              }
            : undefined
        }
        closeButton={{
          ...props.closeProps,
          label: closeButtonProps.label,
          onClick: e => {
            closeButtonProps.onClick?.();
            props.closeProps.onClick(e);
          },
        }}
        primaryButton={{
          ...props.primaryProps,
          label: primaryButtonProps.label,
          onClick: e => {
            primaryButtonProps.onClick?.();
            props.primaryProps.onClick(e);
          },
        }}
        {...props}
      />
    );

    return (
      <JoyRide
        tooltipComponent={renderTooltipComponent}
        steps={stepsWithoutBeacon}
        continuous
        styles={customColors}
        run={tourStarted}
        callback={checkTourFinish}
        floaterProps={customArrowSize}
        disableOverlayClose
        scrollOffset={customScrollOffset}
        disableScrollParentFix
        ref={ref}
      />
    );
  },
);

export const WelcomeTour = WelcomeTourWithRef as typeof WelcomeTourWithRef & {
  statuses: typeof STATUS;
};

WelcomeTour.statuses = STATUS;
