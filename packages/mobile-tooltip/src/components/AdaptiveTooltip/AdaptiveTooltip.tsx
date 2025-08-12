import { WithLayoutType } from '@sbercloud/uikit-product-utils';
import { QuestionTooltip, QuestionTooltipProps, Tooltip, TooltipProps } from '@snack-uikit/tooltip';

import { MobileQuestionTooltip } from '../MobileQuestionTooltip';
import { MobileTooltip } from '../MobileTooltip';

export type AdaptiveTooltipProps = WithLayoutType<TooltipProps>;

export function AdaptiveTooltip({ layoutType, ...props }: AdaptiveTooltipProps) {
  const isMobile = layoutType === 'mobile';
  return isMobile ? <MobileTooltip {...props} /> : <Tooltip {...props} />;
}

export type AdaptiveQuestionTooltipProps = WithLayoutType<QuestionTooltipProps>;

export function AdaptiveQuestionTooltip({ layoutType, ...props }: AdaptiveQuestionTooltipProps) {
  const isMobile = layoutType === 'mobile';
  return isMobile ? <MobileQuestionTooltip {...props} /> : <QuestionTooltip {...props} />;
}

export type { TooltipProps, QuestionTooltipProps };
