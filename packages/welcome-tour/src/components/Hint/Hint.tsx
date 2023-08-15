import { MouseEvent } from 'react';
import { TooltipRenderProps } from 'react-joyride';

import { ButtonGhost, ButtonIcon, ButtonRound } from '@sbercloud/uikit-product-button';
import { CloseInterfaceSVG } from '@sbercloud/uikit-product-icons';

import { Steps } from '../Steps';
import { StepWithSubtitle } from '../types';
import * as S from './styled';

type TooltipButtonProps = {
  'aria-label': string;
  'data-action': string;
  onClick: (e: MouseEvent<HTMLElement>) => void;
  role: string;
  title: string;
  text: string;
};

type HintProps = {
  backButton?: TooltipButtonProps;
  closeButton: TooltipButtonProps;
  primaryButton: TooltipButtonProps;
  step: StepWithSubtitle;
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
    <S.HintWrapper {...tooltipProps} data-test-id='welcome-tour-hint'>
      <S.HeadingContainer>
        <S.Heading data-test-id='welcome-tour-hint__title'>{step.title}</S.Heading>
        <ButtonIcon
          data-test-id='welcome-tour-hint__icon-close'
          {...skipProps}
          variant={ButtonIcon.variants.Strong}
          icon={<CloseInterfaceSVG />}
        />
      </S.HeadingContainer>
      <S.SubHeading data-test-id='welcome-tour-hint__subtitle'>{step.subtitle}</S.SubHeading>
      {step.content && <S.Content data-test-id='welcome-tour-hint__content'>{step.content}</S.Content>}
      <S.Footer>
        {step.content && <Steps stepsCount={size} currentStep={index} />}
        <S.StepButtons>
          {backButton && index !== 0 && (
            <ButtonGhost
              data-test-id='welcome-tour-hint__button-back'
              {...backButton}
              variant={ButtonGhost.variants.Primary}
            />
          )}
          {isLastStep ? (
            <ButtonRound
              data-test-id='welcome-tour-hint__button-close'
              {...closeButton}
              variant={ButtonRound.variants.Filled}
            />
          ) : (
            <ButtonRound
              data-test-id='welcome-tour-hint__button-next'
              {...primaryButton}
              variant={ButtonRound.variants.Filled}
            />
          )}
        </S.StepButtons>
      </S.Footer>
    </S.HintWrapper>
  );
}
