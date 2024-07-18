import { useMemo, useRef, useState } from 'react';

import { ExitSVG, PlusSVG, SettingsSVG, ThemeContrastSVG } from '@sbercloud/uikit-product-icons';
import { useLanguage } from '@sbercloud/uikit-product-utils';
import { Avatar, AvatarProps } from '@snack-uikit/avatar';
import { Counter } from '@snack-uikit/counter';
import { Droplist, ItemProps } from '@snack-uikit/list';
import { PromoTag } from '@snack-uikit/promo-tag';

import { textProvider, Texts } from '../../helpers';
import { getThemeModeOptions } from '../../helpers/getThemeModeOptions';
import { ThemeMode } from '../../types';
import { InvitePopover, InvitePopoverProps } from '../InvitePopover';
import { SelectProps } from '../SelectMenu';
import styles from './styles.modules.scss';

export type User = {
  name: string;
  email: string;
};

export type UserMenuProps = {
  user: User;
  indicator?: AvatarProps['indicator'];
  onAvatarClick?(): void;
  onProfileManagementClick?(): void;
  onLogout?(): void;
  invites?: {
    count?: number;
    showPopover?: boolean;
  } & Pick<InvitePopoverProps, 'onOpenButtonClick'>;
} & Pick<SelectProps, 'organizations' | 'selectedOrganization' | 'onOrganizationChange' | 'onOrganizationAdd'> & {
    themeMode?: {
      value: ThemeMode;
      onChange(value: ThemeMode): void;
    };
  };

export function UserMenu({
  user,
  indicator,
  onProfileManagementClick,
  onLogout,
  onAvatarClick,
  organizations,
  selectedOrganization,
  onOrganizationChange,
  onOrganizationAdd,
  themeMode,
  invites,
}: UserMenuProps) {
  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const closeUserMenu = () => setIsUserMenuOpen(false);

  const triggerRef = useRef<HTMLDivElement>(null);

  const items = useMemo(() => {
    const items: ItemProps[] = [];

    items.push({
      content: {
        option: user.name,
        description: user.email,
        truncate: {
          description: 1,
        },
      },
      afterContent: <Avatar size='s' name={user.name} showTwoSymbols indicator={indicator} />,
      inactive: true,
      id: 'header__user-menu__button',
      'data-test-id': 'header__user-menu__button',
      className: styles.userMenuInfoItem,
    });

    if (onProfileManagementClick) {
      items.push({
        'data-test-id': 'header__user-menu__manage-profile',
        beforeContent: <SettingsSVG />,
        onClick: () => {
          onProfileManagementClick();
          closeUserMenu();
        },
        content: {
          option: textProvider(languageCode, Texts.ManageProfile),
        },
        id: 'header__user-menu__manage-profile',
      });

      if (themeMode) {
        items.push({
          type: 'next-list',
          content: {
            option: textProvider(languageCode, Texts.ThemeModeLabel),
          },
          placement: 'left-start',
          beforeContent: <ThemeContrastSVG />,
          'data-test-id': 'header__user-menu__theme-mode',
          items: getThemeModeOptions({ themeMode, languageCode }),
        });
      }

      items.push({
        type: 'group',
        divider: true,
        items: [],
      });
    }

    organizations?.forEach(organization =>
      items.push({
        'data-test-id': `header__user-menu__organization-${organization.id}`,
        beforeContent: <Avatar size='xs' name={organization.name} showTwoSymbols shape='square' />,
        afterContent: organization.new && (
          <PromoTag text={textProvider(languageCode, Texts.OrganizationNewBadge)} appearance='green' />
        ),
        content: {
          option: organization.name,
        },
        onClick: () => {
          onOrganizationChange?.(organization, 'user-menu');
          closeUserMenu();
        },
        id: organization.id,
      }),
    );

    if (onOrganizationAdd) {
      items.push({
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

    if ((organizations && organizations.length > 0) || onOrganizationAdd) {
      items.push({
        type: 'group',
        divider: true,
        items: [],
      });
    }

    if (onLogout) {
      items.push({
        content: {
          option: textProvider(languageCode, Texts.Logout),
        },
        beforeContent: <ExitSVG />,
        onClick: () => {
          onLogout();
          closeUserMenu();
        },
        id: 'header__user-menu__logout',
        'data-test-id': 'header__user-menu__logout',
      });
    }

    return items;
  }, [
    indicator,
    languageCode,
    onLogout,
    onOrganizationAdd,
    onOrganizationChange,
    onProfileManagementClick,
    organizations,
    themeMode,
    user.email,
    user.name,
  ]);

  return (
    <div className={styles.userMenuWrap}>
      <Droplist
        size='s'
        open={isUserMenuOpen}
        onOpenChange={setIsUserMenuOpen}
        placement='bottom-end'
        items={items}
        selection={{
          mode: 'single',
          value: selectedOrganization?.id,
        }}
        triggerElemRef={triggerRef}
        trigger='click'
        className={styles.userMenuDroplist}
      >
        <div
          className={styles.userMenu}
          role={'button'}
          tabIndex={0}
          data-test-id='header__user-menu__button'
          ref={triggerRef}
          onClick={onAvatarClick}
        >
          <Avatar size='xs' name={user.name} showTwoSymbols indicator={indicator} />

          {invites?.count && invites.count > 0 && (
            <Counter value={invites.count} appearance='primary' size='s' className={styles.userMenuAvatarCounter} />
          )}
        </div>
      </Droplist>

      {invites?.showPopover && <InvitePopover onOpenButtonClick={invites?.onOpenButtonClick} />}
    </div>
  );
}
