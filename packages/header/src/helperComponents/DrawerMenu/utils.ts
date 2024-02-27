import { FooterLink, InnerLink, LinksGroup, PinnedCard } from '../../types';

export function filterHidden(item: FooterLink | InnerLink | LinksGroup | PinnedCard) {
  return !item.hidden;
}

export function filterHiddenLinks(links?: LinksGroup[]) {
  if (!links) {
    return undefined;
  }

  return links.reduce<LinksGroup[]>((acc, cur) => {
    if (cur.hidden) {
      return acc;
    }

    const visibleLinks = cur.items.filter(link => !link.hidden);

    if (visibleLinks.length) {
      acc.push({
        ...cur,
        items: visibleLinks,
      });
    }

    return acc;
  }, []);
}
