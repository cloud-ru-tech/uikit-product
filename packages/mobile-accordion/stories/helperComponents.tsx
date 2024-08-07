import { ReactNode } from 'react';

import { MobileQuestionTooltip } from '@sbercloud/uikit-product-mobile-tooltip';
import { Avatar } from '@snack-uikit/avatar';
import { Typography } from '@snack-uikit/typography';

import styles from './styles.module.scss';

type ContentProps = {
  'data-test-id'?: string;
};

export function Content(props: ContentProps) {
  return (
    <div className={styles.content} {...props}>
      <Typography.SansBodyM>Demo content, for replacement, use the property: ◆ Slot...</Typography.SansBodyM>
      <Typography.SansBodyM>Connect your local component with unique content to this property</Typography.SansBodyM>
    </div>
  );
}

export type CustomHeaderProps = {
  name?: string;
  metadata?: string;
  tip?: ReactNode;
};

export function CustomHeader({ tip, name = 'Ivan Petrov', metadata }: CustomHeaderProps) {
  return (
    <div className={styles.content}>
      <div className={styles.headline}>
        <Avatar name={name} showTwoSymbols />
        <Typography.SansHeadlineS>{name}</Typography.SansHeadlineS>
        {tip && <MobileQuestionTooltip tip={tip} size='s' />}
      </div>

      {metadata && <Typography.SansLabelM>{metadata}</Typography.SansLabelM>}
    </div>
  );
}
