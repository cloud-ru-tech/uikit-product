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
  backButton: TooltipButtonProps;
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
    <S.HintWrapper {...tooltipProps}>
      <S.HeadingContainer>
        <S.Heading>{step.title}</S.Heading>
        <ButtonIcon {...skipProps} variant={ButtonIcon.variants.Strong} icon={<CloseInterfaceSVG />} />
      </S.HeadingContainer>
      <S.SubHeading>{step.subtitle}</S.SubHeading>
      <S.Content>{step.content}</S.Content>
      <S.Footer>
        <Steps stepsCount={size} currentStep={index} />
        <S.StepButtons>
          {index !== 0 && <ButtonGhost {...backButton} variant={ButtonGhost.variants.Primary} />}
          {isLastStep ? (
            <ButtonRound {...closeButton} variant={ButtonRound.variants.Filled} />
          ) : (
            <ButtonRound {...primaryButton} variant={ButtonRound.variants.Filled} />
          )}
        </S.StepButtons>
      </S.Footer>
    </S.HintWrapper>
  );
}
