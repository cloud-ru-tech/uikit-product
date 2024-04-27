import { ReactNode } from 'react';

import { CopyLine, CopyLineProps } from '@sbercloud/uikit-product-copy-line';
import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';
import { QuestionTooltip } from '@snack-uikit/tooltip';

import styles from './styles.module.scss';

export type DefaultSubHeaderProps = WithSupportProps<{
  label: string;
  value: CopyLineProps;
  labelTooltip?: ReactNode;
}>;

export function DefaultSubHeader({ label, labelTooltip, value, ...rest }: DefaultSubHeaderProps) {
  return (
    <div className={styles.subheader} {...extractSupportProps(rest)}>
      <div className={styles.label}>
        {label}
        {labelTooltip && <QuestionTooltip tip={labelTooltip} />}
      </div>
      <CopyLine {...value} />
    </div>
  );
}
