import { ReactNode } from 'react';

import { PlusSVG } from '@sbercloud/uikit-product-icons';
import { ButtonTonal } from '@snack-uikit/button';
import { QuestionTooltip } from '@snack-uikit/tooltip';

import styles from './styles.module.scss';

export type PopoverRowProps = {
  label: string;
  description?: string;
  tip?: ReactNode;
  value: string;
  onAddClick(): void;
  status?: 'default' | 'attention';
};

export function PopoverRow({ label, description, tip, value, onAddClick, status = 'default' }: PopoverRowProps) {
  return (
    <div className={styles.rowWrapper}>
      <div className={styles.row}>
        <div className={styles.titleWrapper}>
          <span className={styles.title}>{label}</span>

          {tip && <QuestionTooltip tip={tip} placement='top' />}
        </div>

        <div className={styles.contentWrapper}>
          <span className={styles.content} data-status={status}>
            {value}
          </span>

          <ButtonTonal size='xs' icon={<PlusSVG />} appearance='primary' onClick={onAddClick} />
        </div>
      </div>
      {description && <div className={styles.description}>{description}</div>}
    </div>
  );
}
