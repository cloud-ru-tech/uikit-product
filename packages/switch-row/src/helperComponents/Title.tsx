import { MouseEvent } from 'react';

import { QuestionTooltip } from '@snack-uikit/tooltip';
import { TruncateString } from '@snack-uikit/truncate-string';

import { SwitchRowProps } from '../components';
import styles from './styles.module.scss';

const stopPropagation = (e: MouseEvent) => e.stopPropagation();

export function Title({
  title,
  tip,
  disableTitleTruncate,
}: Pick<SwitchRowProps, 'title' | 'disableTitleTruncate' | 'tip'>) {
  if (disableTitleTruncate) {
    return (
      <span>
        {title}
        {tip && (
          // eslint-disable-next-line jsx-a11y/no-static-element-interactions
          <span className={styles.tipWrapperInline} onClick={stopPropagation}>
            <QuestionTooltip data-pointer tip={tip} data-test-id='switch-row__title-tooltip' size='xs' tabIndex={-1} />
          </span>
        )}
      </span>
    );
  }

  return (
    <>
      <TruncateString text={title} />
      {tip && (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <span className={styles.tipWrapper} onClick={stopPropagation}>
          <QuestionTooltip data-pointer tip={tip} data-test-id='switch-row__title-tooltip' size='xs' tabIndex={-1} />
        </span>
      )}
    </>
  );
}
