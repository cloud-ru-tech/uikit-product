import { Scroll } from '@snack-uikit/scroll';
import { TruncateString } from '@snack-uikit/truncate-string';

import { QuotaDropdownProps } from '../QuotaDropdown';
import styles from '../styles.module.scss';

export function QuotaDropdownLayout({ title, description, children }: QuotaDropdownProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.titleContainer}>
          <div className={styles.title}>
            <TruncateString text={title} maxLines={1} />
          </div>
        </div>
        {description && (
          <div className={styles.description}>
            <TruncateString text={description} maxLines={2} />
          </div>
        )}
      </div>

      <Scroll className={styles.scroll} barHideStrategy='never'>
        <div className={styles.content}>{children}</div>
      </Scroll>
    </div>
  );
}
