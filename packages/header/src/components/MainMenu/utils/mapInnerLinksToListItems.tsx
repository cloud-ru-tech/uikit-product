import { BaseItemProps } from '@snack-uikit/list';

import { InnerLink } from '../types';
import { renderLinkBeforeContent } from './getLinkEmblem';

export function mapInnerLinksToListItems(items: InnerLink[]): BaseItemProps[] {
  return items.map(link => ({
    id: link.id,
    content: {
      option: link.label,
    },
    beforeContent: renderLinkBeforeContent(link),
    onClick: link.onClick,
    href: link.href,
    disabled: link.disabled,
  }));
}
