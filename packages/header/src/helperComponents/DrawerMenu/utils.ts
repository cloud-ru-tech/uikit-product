import { FooterLink, InnerLink, LinksGroup, ProductOption } from '../../types';
import { ItemsGroup } from '../GroupSection';

export function filterHidden(item: FooterLink | InnerLink | ProductOption) {
  return !item.hidden;
}

export function filterHiddenLinks<T extends LinksGroup | ItemsGroup<ProductOption>>(links?: T[]) {
  if (!links) {
    return undefined;
  }

  return links.reduce<T[]>((acc, cur) => {
    if (cur.hidden) {
      return acc;
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const visibleLinks = cur.items.filter(filterHidden);

    if (visibleLinks.length) {
      acc.push({
        ...cur,
        items: visibleLinks,
      });
    }

    return acc;
  }, []);
}
