import throttle from 'lodash.throttle';
import { MouseEvent, useMemo, useRef, useState } from 'react';

import { PlaceholderSVG } from '@sbercloud/uikit-product-icons';
import { useEventHandler, useLanguage } from '@sbercloud/uikit-product-utils';
import { Avatar } from '@snack-uikit/avatar';

import { ProductHeaderProps } from '../components/ProductHeader';
import { textProvider, Texts } from '../helpers';
import { LinksGroup } from '../types';

// TODO: разобраться
export function useUserMenuItems(userMenu?: ProductHeaderProps['userMenu']) {
  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });

  const items = useMemo(() => {
    const items = [];

    if (userMenu) {
      const { user, indicator, onLogout, onProfileManagementClick } = userMenu;

      items.push({
        content: {
          option: userMenu?.user.name,
          description: user.email,
        },
        afterContent: <Avatar size='s' name={user.name} showTwoSymbols indicator={indicator} />,
        inactive: true,
        id: 'header__user-menu-button',
        'data-test-id': 'header__user-menu-button',
      });

      if (onProfileManagementClick) {
        items.push({
          'data-test-id': 'header__user-menu-manage-profile',
          beforeContent: <PlaceholderSVG />,
          onClick: () => {
            onProfileManagementClick();
            // closeUserMenu();
          },
          content: {
            option: textProvider(languageCode, Texts.ManageProfile),
          },
          id: 'header__user-menu-manage-profile',
        });

        items.push({
          divider: true,
          items: [],
        });
      }

      // organizations.forEach(organization =>
      //   items.push({
      //     'data-test-id': 'header__user-menu-organization',
      //     beforeContent: <Avatar size='xs' name={organization.name} showTwoSymbols />,
      //     content: {
      //       option: organization.name,
      //     },
      //     onClick: () => {
      //       onOrganizationChange?.(organization);
      //       // closeUserMenu();s
      //     },
      //     id: organization.id,
      //   }),
      // );

      // if (onOrganizationAdd) {
      //   items.push({
      //     content: {
      //       option: textProvider(languageCode, Texts.AddOrganization),
      //     },
      //     beforeContent: <PlusSVG />,
      //     onClick: () => {
      //       onOrganizationAdd();
      //       // closeUserMenu();
      //     },
      //     id: 'header__user-menu-add-organization',
      //     'data-test-id': 'header__user-menu-add-organization',
      //   });
      // }

      // if (organizations.length > 0 || onOrganizationAdd) {
      //   items.push({
      //     divider: true,
      //     items: [],
      //   });
      // }

      if (onLogout) {
        items.push({
          content: {
            option: textProvider(languageCode, Texts.Logout),
          },
          beforeContent: <PlaceholderSVG />,
          onClick: () => {
            onLogout();
            // closeUserMenu();
          },
          id: 'header__user-menu-logout',
          'data-test-id': 'header__user-menu-logout',
        });
      }
    }
  }, [languageCode, userMenu]);

  return items;
}

type UseSearchProps = {
  links?: LinksGroup[];
};

type UseScrollProps = {
  links?: LinksGroup[];
  searchValue: string;
  setSearchValue(value: string): void;
};

const THROTTLE_TIMEOUT = 100;

function matchSearchString(value: string, search: string) {
  return value.trim().toLowerCase().includes(search.trim().toLowerCase());
}

export function useSearch({ links }: UseSearchProps) {
  const [searchValue, setSearchValue] = useState('');

  const filteredLinks = useMemo(
    () =>
      links && searchValue.length > 0
        ? links.reduce((result, group) => {
            if (group.label && matchSearchString(group.label, searchValue)) {
              result.push(group);
              return result;
            }

            const items = group.items.filter(item => matchSearchString(item.label, searchValue));

            if (items.length > 0) {
              result.push({ ...group, items });
              return result;
            }

            return result;
          }, [] as LinksGroup[])
        : links,
    [links, searchValue],
  );

  return {
    searchValue,
    setSearchValue,
    filteredLinks,
  };
}

export function useLinks({ searchValue, setSearchValue, links }: UseScrollProps) {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const scrollRef = useRef<HTMLElement>(null);
  const [selectedLink, setSelectedLink] = useState(links?.[0].id);

  const handleScroll = useEventHandler(
    throttle(() => {
      if (searchValue.length > 0) return;

      for (const card of cardsRef.current) {
        if (!card) {
          continue;
        }

        const { top } = card.getBoundingClientRect();

        if (top > 0) {
          const selectedLink = links?.find(link => link.id === card.id);

          if (selectedLink) {
            setSelectedLink(selectedLink.id);
            document.querySelector(`a[href="#${selectedLink.id}"]`)?.scrollIntoView({ block: 'end' });
          }

          break;
        }
      }
    }, THROTTLE_TIMEOUT),
  );

  const addScrollHandler = () => {
    scrollRef.current?.addEventListener('scroll', handleScroll);
  };

  const removeScrollHandler = () => {
    scrollRef.current?.removeEventListener('scroll', handleScroll);
  };

  const handleLinkClick = (link: LinksGroup) => (event: MouseEvent) => {
    event.preventDefault();

    setSelectedLink(link.id);
    setSearchValue('');

    setTimeout(() => {
      document.getElementById(link.id)?.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }, 0);
  };

  const isLinkSelected = (link: LinksGroup) => link.id === selectedLink && !searchValue;

  return { cardsRef, scrollRef, addScrollHandler, removeScrollHandler, handleLinkClick, isLinkSelected };
}
