import { WithLayoutType } from '@cloud-ru/uikit-product-utils';
import { QuestionTooltip, QuestionTooltipProps, TooltipProps, WithTooltip } from '@snack-uikit/tooltip';

import { MobileQuestionTooltip } from '../MobileQuestionTooltip';
import { WithMobileTooltip } from '../MobileTooltip';

export type AdaptiveTooltipProps = WithLayoutType<TooltipProps>;

export function AdaptiveTooltip({ layoutType, children, ...props }: AdaptiveTooltipProps) {
  const isMobile = layoutType === 'mobile';

  return isMobile ? (
    <WithMobileTooltip tooltip={props}>{children}</WithMobileTooltip>
  ) : (
    <WithTooltip tooltip={props}>{children}</WithTooltip>
  );
}

export type AdaptiveQuestionTooltipProps = WithLayoutType<QuestionTooltipProps>;

export function AdaptiveQuestionTooltip({ layoutType, ...props }: AdaptiveQuestionTooltipProps) {
  const isMobile = layoutType === 'mobile';
  return isMobile ? <MobileQuestionTooltip {...props} /> : <QuestionTooltip {...props} />;
}

export type { TooltipProps, QuestionTooltipProps };
