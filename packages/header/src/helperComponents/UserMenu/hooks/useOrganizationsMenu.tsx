import { useMemo } from 'react';

import { PlusSVG } from '@sbercloud/uikit-product-icons';
import { useLanguage } from '@sbercloud/uikit-product-utils';
import { Avatar } from '@snack-uikit/avatar';
import { GroupItemProps, ItemProps } from '@snack-uikit/list';
import { PromoTag } from '@snack-uikit/promo-tag';

import { textProvider, Texts } from '../../../helpers';
import { Organization } from '../../../types';

type UseOrganizationProps = {
  organizations: Organization[] | undefined;
  onOrganizationChange: ((value: Organization, source: 'user-menu' | 'select') => void) | undefined;
  onOrganizationAdd: (() => void) | undefined;
  closeUserMenu(): void;
};

export function useOrganizationsMenu({
  organizations,
  onOrganizationAdd,
  onOrganizationChange,
  closeUserMenu,
}: UseOrganizationProps): ItemProps[] {
  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });

  return useMemo(() => {
    const groupItem: GroupItemProps = {
      type: 'group',
      items: [],
      divider: true,
      hidden: !(organizations?.length || onOrganizationAdd),
    };

    organizations?.forEach(organization => {
      groupItem.items.push({
        'data-test-id': `header__user-menu__organization-${organization.id}`,
        beforeContent: <Avatar size='xs' name={organization.name} showTwoSymbols shape='square' />,
        afterContent: (
          <>
            {organization.new && (
              <PromoTag text={textProvider(languageCode, Texts.OrganizationNewBadge)} appearance='green' />
            )}

            {organization.partner && (
              <PromoTag text={textProvider(languageCode, Texts.PartnerOrganizationBadge)} appearance='blue' />
            )}
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
    });

    if (onOrganizationAdd) {
      groupItem.items.push({
        content: {
          option: textProvider(languageCode, Texts.AddOrganization),
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
  }, [closeUserMenu, languageCode, onOrganizationAdd, onOrganizationChange, organizations]);
}
