import { useMemo } from 'react';

import { PlusSVG } from '@sbercloud/uikit-product-icons';
import { useLocale } from '@sbercloud/uikit-product-locale';
import { Avatar } from '@snack-uikit/avatar';
import { GroupItemProps, ItemProps } from '@snack-uikit/list';

import { Organization } from '../../../types';
import { UserMenuItemAfterContent } from '../components';

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
          const dataTestId = `header__user-menu__organization-${organization.id}`;

          acc.push({
            'data-test-id': dataTestId,
            beforeContent: <Avatar size='xs' name={organization.name} showTwoSymbols shape='square' />,
            afterContent: (
              <UserMenuItemAfterContent
                organization={organization}
                dataTestId={dataTestId}
                onItemClick={closeUserMenu}
              />
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
