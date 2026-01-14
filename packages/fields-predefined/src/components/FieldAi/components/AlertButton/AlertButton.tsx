import { Typography } from '@snack-uikit/typography';

import styles from './styles.module.scss';

export type AlertButtonProps = {
  label: string;
  onClick?(): void;
};

export function AlertButton({ label, onClick }: AlertButtonProps) {
  return (
    <button onClick={onClick} className={styles.button}>
      <Typography.SansLabelM className={styles.label}>{label}</Typography.SansLabelM>
    </button>
  );
}
