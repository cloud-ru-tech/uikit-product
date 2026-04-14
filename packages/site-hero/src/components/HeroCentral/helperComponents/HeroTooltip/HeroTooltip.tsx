import { InfoOutlineSVG } from '@cloud-ru/uikit-product-icons';
import { WithLayoutType } from '@cloud-ru/uikit-product-utils';
import { Tooltip, TooltipProps } from '@snack-uikit/tooltip';

import styles from './styles.module.scss';

export type HeroTooltipProps = WithLayoutType<{
  tooltipText?: string;
  tooltipPlacement?: TooltipProps['placement'];
}>;

export function HeroTooltip({ tooltipText, tooltipPlacement, layoutType }: HeroTooltipProps) {
  if (!tooltipText) return null;

  return (
    <div className={styles.tooltipWrapper} data-layout-type={layoutType}>
      <Tooltip placement={tooltipPlacement} trigger='click' tip={tooltipText} className={styles.tooltip}>
        <InfoOutlineSVG />
      </Tooltip>
    </div>
  );
}
