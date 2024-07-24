import { QuestionTooltip } from '@snack-uikit/tooltip';
import { TruncateString } from '@snack-uikit/truncate-string';

import { SwitchRowProps } from '../components';
import styles from './styles.module.scss';

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
          <span className={styles.tipWrapperInline}>
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
        <span className={styles.tipWrapper}>
          <QuestionTooltip data-pointer tip={tip} data-test-id='switch-row__title-tooltip' size='xs' tabIndex={-1} />
        </span>
      )}
    </>
  );
}
