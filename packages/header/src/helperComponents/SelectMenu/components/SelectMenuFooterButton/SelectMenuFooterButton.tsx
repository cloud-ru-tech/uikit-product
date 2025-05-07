import { PlusSVG } from '@sbercloud/uikit-product-icons';
import { ButtonFunction } from '@snack-uikit/button';
import { Tooltip } from '@snack-uikit/tooltip';

import styles from './styles.module.scss';

export type SelectMenuFooterButtonProps = {
  label: string;
  onClick(): void;
  tooltip?: string;
  disabled?: boolean;
};

type OwnProps = SelectMenuFooterButtonProps & {
  mobile?: boolean;
};

export function SelectMenuFooterButton({ label, tooltip, disabled, mobile }: OwnProps) {
  const button = (
    <ButtonFunction
      size={mobile ? 'l' : 'm'}
      disabled={disabled}
      icon={<PlusSVG />}
      iconPosition='before'
      label={label}
      data-test-id='header__select-project__add-button'
    />
  );

  return (
    <div className={styles.footerButtonWrap} data-mobile={mobile || undefined}>
      {tooltip ? <Tooltip tip={tooltip}>{button}</Tooltip> : button}
    </div>
  );
}
