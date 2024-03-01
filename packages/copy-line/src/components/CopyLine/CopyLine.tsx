import { TruncateString } from '@snack-uikit/truncate-string';

import { CopyButton } from '../CopyButton';
import styles from './styles.module.scss';

export type CopyLineProps = {
  content: string | number;
  valueToCopy?: string | number;
};

export function CopyLine({ content, valueToCopy }: CopyLineProps) {
  return (
    <div className={styles.copyLine}>
      <TruncateString text={String(content)} maxLines={1} />
      <CopyButton valueToCopy={valueToCopy ?? content} size='xs' />
    </div>
  );
}
