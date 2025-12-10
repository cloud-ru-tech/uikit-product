import { useLocale } from '@sbercloud/uikit-product-locale';
import { WithLayoutType } from '@sbercloud/uikit-product-utils';

import { ValidationState } from '../../types';
import { CheckItem } from '../CheckItem';
import styles from './styles.module.scss';

export type WithPasswordTooltipProps = WithLayoutType<{
  sshValidation: ValidationState | null;
}>;

export function SshValidation({ sshValidation, layoutType }: WithPasswordTooltipProps) {
  const { t } = useLocale('Claudia');

  if (!sshValidation) return null;

  return (
    <div className={styles.validationItemsContainer} data-layout-type={layoutType}>
      <div className={styles.validationList}>
        {sshValidation.fileSize && <CheckItem label={t('SshField.errors.fileSize')} layoutType={layoutType} />}

        {sshValidation.fileType && <CheckItem label={t('SshField.errors.fileType')} layoutType={layoutType} />}

        {sshValidation.binaryData && <CheckItem label={t('SshField.errors.binaryData')} layoutType={layoutType} />}

        {sshValidation.emptyFile && <CheckItem label={t('SshField.errors.emptyFile')} layoutType={layoutType} />}

        {sshValidation.invalidSSHKey && (
          <CheckItem label={t('SshField.errors.invalidSSHKey')} layoutType={layoutType} />
        )}

        {sshValidation.readError && <CheckItem label={t('SshField.errors.readError')} layoutType={layoutType} />}
      </div>
    </div>
  );
}
