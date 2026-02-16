import { ArrowUpSVG } from '@cloud-ru/uikit-product-icons';

import styles from './styles.module.scss';
import { Size } from './types';

type ButtonVmAgentProps = {
  handleClick(): void;
  size: Size;
  disabled?: boolean;
};

export function ButtonVmAgent({ size, handleClick, disabled }: ButtonVmAgentProps) {
  return (
    <button
      className={styles.buttonVmAgent}
      data-size={size || undefined}
      data-disabled={disabled || undefined}
      onClick={handleClick}
      disabled={disabled}
    >
      <ArrowUpSVG />
    </button>
  );
}
