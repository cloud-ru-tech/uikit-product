import { Dispatch, MouseEvent, SetStateAction } from 'react';

import { QuestionSVG } from '@sbercloud/uikit-product-icons';
import { WithLayoutType } from '@sbercloud/uikit-product-utils';
import { QuestionTooltip } from '@snack-uikit/tooltip';

import { TooltipMobile } from '../../types';
import styles from './styles.module.scss';

type TooltipProps = WithLayoutType<{
  tooltipText?: string;
  setTooltipMobile: Dispatch<SetStateAction<TooltipMobile>>;
}>;

export function Tooltip({ layoutType, tooltipText, setTooltipMobile }: TooltipProps) {
  if (!tooltipText) {
    return null;
  }

  if (layoutType !== 'mobile') {
    return <QuestionTooltip className={styles.questionTooltip} tip={tooltipText} />;
  }

  const handleOpen = (event: MouseEvent<SVGElement>) => {
    event.stopPropagation();
    setTooltipMobile({
      open: true,
      text: tooltipText,
    });
  };

  return <QuestionSVG className={styles.icon} onClick={handleOpen} size={16} />;
}
