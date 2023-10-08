import { forwardRef } from 'react';
import JoyRide, { CallBackProps, STATUS, TooltipRenderProps } from 'react-joyride';

import { Hint } from '../Hint';
import { COLORS } from '../Hint/themes';
import { TourStepExtended } from '../types';

const customColors = {
  options: {
    arrowColor: `var(${COLORS.container.background})`,
    overlayColor: `var(${COLORS.container.overlay})`,
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
    text: string;
    onClick?(): void;
  };
  primaryButtonProps: {
    text: string;
    onClick?(): void;
  };
  backButtonProps?: {
    text: string;
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
                text: backButtonProps.text,
                onClick: e => {
                  backButtonProps.onClick?.();
                  props.backProps.onClick(e);
                },
              }
            : undefined
        }
        closeButton={{
          ...props.closeProps,
          text: closeButtonProps.text,
          onClick: e => {
            closeButtonProps.onClick?.();
            props.closeProps.onClick(e);
          },
        }}
        primaryButton={{
          ...props.primaryProps,
          text: primaryButtonProps.text,
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
