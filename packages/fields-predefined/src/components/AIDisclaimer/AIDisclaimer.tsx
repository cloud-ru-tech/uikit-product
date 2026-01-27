import { useLocale } from '@cloud-ru/uikit-product-locale';
import { WithLayoutType } from '@cloud-ru/uikit-product-utils';

import styles from './styles.module.scss';

type AIDisclaimerProps = WithLayoutType;

export function AIDisclaimer({ layoutType }: AIDisclaimerProps) {
  const { t } = useLocale('FieldsPredefined');

  return (
    <div className={styles.disclaimer}>
      <span className={styles.hintText} data-layout-type={layoutType}>
        {t('FieldAi.hint.text')}
      </span>
    </div>
  );
}
