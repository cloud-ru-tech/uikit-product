import { useCallback, useState } from 'react';

import { useLocale } from '@sbercloud/uikit-product-locale';
import { PromoTag } from '@snack-uikit/promo-tag';

import { Organization } from '../../../types';
import { ItemDroplist, ItemDroplistProps } from '../../ItemDroplist';
import styles from '../styles.module.scss';

type UserMenuItemAfterContentProps = Pick<ItemDroplistProps, 'onItemClick'> & {
  organization: Organization;
  dataTestId: string;
};

export function UserMenuItemAfterContent({ organization, dataTestId, onItemClick }: UserMenuItemAfterContentProps) {
  const { t } = useLocale('Header');

  const [open, setOpen] = useState(false);

  const closeDropdown = useCallback(() => {
    setOpen(false);
    onItemClick?.();
  }, [onItemClick]);

  return (
    <div className={styles.userMenuItemAfterContent}>
      {organization.new && <PromoTag text={t('organizationNewBadge')} appearance='green' />}

      {organization.partner && <PromoTag text={t('partnerOrganizationBadge')} appearance='blue' />}

      {organization.actions && (
        <ItemDroplist
          actions={organization.actions}
          dataTestId={dataTestId}
          onItemClick={closeDropdown}
          open={open}
          onOpenChange={setOpen}
        />
      )}
    </div>
  );
}
