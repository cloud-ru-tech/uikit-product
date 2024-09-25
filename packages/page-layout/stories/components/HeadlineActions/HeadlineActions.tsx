import { ChevronDownSVG, PlaceholderSVG } from '@sbercloud/uikit-product-icons';
import { ButtonFilled, ButtonFunction } from '@snack-uikit/button';

import styles from './styles.module.scss';

export function HeadlineActions() {
  return (
    <div className={styles.wrapper}>
      <ButtonFunction label='Functions' icon={<ChevronDownSVG />} />
      <ButtonFilled label='Primary action' icon={<PlaceholderSVG />} />
    </div>
  );
}
