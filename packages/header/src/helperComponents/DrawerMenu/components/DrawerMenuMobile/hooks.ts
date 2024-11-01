import throttle from 'lodash.throttle';
import { MouseEvent, useMemo, useRef, useState } from 'react';

import { useEventHandler } from '@sbercloud/uikit-product-utils';
import { isBrowser } from '@snack-uikit/utils';

import { LinksGroup } from '../../../../types';

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
            isBrowser() && document.querySelector(`a[href="#${selectedLink.id}"]`)?.scrollIntoView({ block: 'end' });
          }

          break;
        }
      }
    }, THROTTLE_TIMEOUT),
  );

  const addScrollHandler = () => {
    isBrowser() && scrollRef.current?.addEventListener('scroll', handleScroll);
  };

  const removeScrollHandler = () => {
    isBrowser() && scrollRef.current?.removeEventListener('scroll', handleScroll);
  };

  const handleLinkClick = (link: LinksGroup) => (event: MouseEvent) => {
    event.preventDefault();

    setSelectedLink(link.id);
    setSearchValue('');

    if (isBrowser()) {
      setTimeout(() => {
        document.getElementById(link.id)?.scrollIntoView({ block: 'start', behavior: 'smooth' });
      }, 0);
    }
  };

  const isLinkSelected = (link: LinksGroup) => link.id === selectedLink && !searchValue;

  return { cardsRef, scrollRef, addScrollHandler, removeScrollHandler, handleLinkClick, isLinkSelected };
}
