import { ReactNode } from 'react';

import { MobileQuestionTooltip } from '@cloud-ru/uikit-product-mobile-tooltip';
import { WithSupportProps } from '@cloud-ru/uikit-product-utils';
import { Typography } from '@snack-uikit/typography';

import { TEST_IDS } from '../../testIds';
import styles from './styles.module.scss';

export type CollapseBlockHeaderProps = WithSupportProps<{
  title: string;
  description?: string;
  tip?: ReactNode;
}>;

export function CollapseBlockHeader({ title, description, tip }: CollapseBlockHeaderProps) {
  return (
    <>
      <div className={styles.headline}>
        <Typography.SansTitleM className={styles.title} data-test-id={TEST_IDS.title}>
          {title}
        </Typography.SansTitleM>

        {tip && <MobileQuestionTooltip size='s' tip={tip} triggerDataTestId={TEST_IDS.tooltip} tabIndex={-1} />}
      </div>

      {description && (
        <Typography.SansBodyM className={styles.subtitle} data-test-id={TEST_IDS.description}>
          {description}
        </Typography.SansBodyM>
      )}
    </>
  );
}
