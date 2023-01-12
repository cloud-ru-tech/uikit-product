import { Dispatch, SetStateAction } from 'react';
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
  setTourStarted: Dispatch<SetStateAction<boolean>>;
  closeButtonText: string;
  primaryButtonText: string;
  backButtonText: string;
};

export function WelcomeTour({
  tourSteps,
  tourStarted,
  setTourStarted,
  closeButtonText,
  primaryButtonText,
  backButtonText,
}: WelcomeTourProps) {
  const stepsWithoutBeacon = tourSteps.map(step => ({ ...step, disableBeacon: true }));
  const checkTourFinish = ({ status }: CallBackProps) => {
    if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
      setTourStarted(false);
    }
  };

  const renderTooltipComponent = (props: TooltipRenderProps) => (
    <Hint
      backButton={{
        ...props.backProps,
        text: backButtonText,
      }}
      closeButton={{
        ...props.closeProps,
        text: closeButtonText,
      }}
      primaryButton={{
        ...props.primaryProps,
        text: primaryButtonText,
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
    />
  );
}
