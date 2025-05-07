import { useMemo } from 'react';

import { PlusSVG } from '@sbercloud/uikit-product-icons';
import { useLocale } from '@sbercloud/uikit-product-locale';
import { Avatar } from '@snack-uikit/avatar';
import { GroupItemProps, ItemProps } from '@snack-uikit/list';
import { PromoTag } from '@snack-uikit/promo-tag';

import { Organization } from '../../../types';

type UseOrganizationProps = {
  organizations: Organization[] | undefined;
  onOrganizationChange?: (value: Organization, source: 'user-menu' | 'select') => void;
  onOrganizationAdd?(): void;
  closeUserMenu(): void;
};

export function useOrganizationsMenu({
  organizations,
  onOrganizationAdd,
  onOrganizationChange,
  closeUserMenu,
}: UseOrganizationProps): ItemProps[] {
  const { t } = useLocale('Header');

  return useMemo(() => {
    const groupItem: GroupItemProps = {
      type: 'group',
      label: t('organizations'),
      divider: true,
      hidden: !(organizations?.length || onOrganizationAdd),
      items:
        organizations?.reduce<GroupItemProps['items']>((acc, organization) => {
          acc.push({
            'data-test-id': `header__user-menu__organization-${organization.id}`,
            beforeContent: <Avatar size='xs' name={organization.name} showTwoSymbols shape='square' />,
            afterContent: (
              <>
                {organization.new && <PromoTag text={t('organizationNewBadge')} appearance='green' />}

                {organization.partner && <PromoTag text={t('partnerOrganizationBadge')} appearance='blue' />}
              </>
            ),
            content: {
              option: organization.name,
            },
            onClick: () => {
              onOrganizationChange?.(organization, 'user-menu');
              closeUserMenu();
            },
            id: organization.id,
          });

          return acc;
        }, []) ?? [],
    };

    if (onOrganizationAdd) {
      groupItem.items.push({
        content: {
          option: t('addOrganization'),
        },
        beforeContent: <PlusSVG />,
        onClick: () => {
          onOrganizationAdd();
          closeUserMenu();
        },
        id: 'header__user-menu__add-organization',
        'data-test-id': 'header__user-menu__add-organization',
      });
    }

    return [groupItem];
  }, [closeUserMenu, t, onOrganizationAdd, onOrganizationChange, organizations]);
}
