import JoyRide, { CallBackProps, STATUS, TooltipRenderProps } from 'react-joyride';

import { Hint } from '../Hint';
import { COLORS } from '../Hint/themes';
import { StepWithSubtitle } from '../types';

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
  tourSteps: StepWithSubtitle[];
  tourStarted: boolean;
  setTourStarted(value: boolean): void;
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
};

export function WelcomeTour({
  tourSteps,
  tourStarted,
  setTourStarted,
  closeButtonProps,
  primaryButtonProps,
  backButtonProps,
}: WelcomeTourProps) {
  const stepsWithoutBeacon = tourSteps.map(step => ({ ...step, disableBeacon: true }));
  const checkTourFinish = ({ status }: CallBackProps) => {
    if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
      setTourStarted(false);
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
    />
  );
}
