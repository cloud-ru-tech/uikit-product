import { WithLayoutType } from '@sbercloud/uikit-product-utils';
import { QuestionTooltip, QuestionTooltipProps, Tooltip, TooltipProps } from '@snack-uikit/tooltip';

import { MobileQuestionTooltip } from '../MobileQuestionTooltip';
import { MobileTooltip } from '../MobileTooltip';

export function AdaptiveTooltip({ layoutType, ...props }: WithLayoutType<TooltipProps>) {
  const isMobile = layoutType === 'mobile';
  return isMobile ? <MobileTooltip {...props} /> : <Tooltip {...props} />;
}

export function AdaptiveQuestionTooltip({ layoutType, ...props }: WithLayoutType<QuestionTooltipProps>) {
  const isMobile = layoutType === 'mobile';
  return isMobile ? <MobileQuestionTooltip {...props} /> : <QuestionTooltip {...props} />;
}

export type { TooltipProps, QuestionTooltipProps };
