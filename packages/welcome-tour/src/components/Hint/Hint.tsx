import { MouseEvent } from 'react';
import { TooltipRenderProps } from 'react-joyride';

import { CloseInterfaceSVG } from '@cloud-ru/uikit-product-icons';
import { ButtonFilled, ButtonSimple } from '@snack-uikit/button';
import { Typography } from '@snack-uikit/typography';

import { Steps } from '../Steps';
import { TourStepExtended } from '../types';
import styles from './styles.module.scss';

type TooltipButtonProps = {
  'aria-label': string;
  'data-action': string;
  onClick: (e: MouseEvent<HTMLElement>) => void;
  role: string;
  title: string;
  label: string;
};

type HintProps = {
  backButton?: TooltipButtonProps;
  closeButton: TooltipButtonProps;
  primaryButton: TooltipButtonProps;
  step: TourStepExtended;
} & Omit<TooltipRenderProps, 'backProps' | 'closeProps' | 'primaryProps'>;

export function Hint({
  backButton,
  closeButton,
  skipProps,
  primaryButton,
  index,
  size,
  isLastStep,
  step,
  tooltipProps,
}: HintProps) {
  return (
    <div className={styles.hintWrapper} {...tooltipProps} data-test-id='welcome-tour-hint'>
      <div className={styles.headingContainer}>
        <Typography tag='h4' family='sans' purpose='title' size='m' data-test-id='welcome-tour-hint__title'>
          {step.title}
        </Typography>
        <ButtonSimple data-test-id='welcome-tour-hint__icon-close' {...skipProps} icon={<CloseInterfaceSVG />} />
      </div>
      {step.subtitle && (
        <Typography
          tag='h4'
          family='light'
          purpose='title'
          size='s'
          className={styles.subHeading}
          data-test-id='welcome-tour-hint__subtitle'
        >
          {step.subtitle}
        </Typography>
      )}
      {step.content && (
        <Typography
          tag='h4'
          family='sans'
          purpose='body'
          size='s'
          className={styles.content}
          data-test-id='welcome-tour-hint__content'
        >
          {step.content}
        </Typography>
      )}
      <div className={styles.footer}>
        {step.content && <Steps stepsCount={size} currentStep={index} />}
        <div className={styles.stepButtons}>
          {backButton && index !== 0 && <ButtonSimple data-test-id='welcome-tour-hint__button-back' {...backButton} />}
          {isLastStep ? (
            <ButtonFilled data-test-id='welcome-tour-hint__button-close' {...closeButton} />
          ) : (
            <ButtonFilled data-test-id='welcome-tour-hint__button-next' {...primaryButton} />
          )}
        </div>
      </div>
    </div>
  );
}
