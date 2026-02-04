import { isValidElement, ReactElement, ReactNode } from 'react';

import { ChatStatusAnnouncementProps, TextItem } from '../types';

export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

export function isReactNode(value: unknown): value is ReactNode {
  if (
    value === null ||
    value === undefined ||
    typeof value === 'boolean' ||
    typeof value === 'string' ||
    typeof value === 'number'
  ) {
    return true;
  }

  if (isValidElement(value)) {
    return true;
  }

  if (Array.isArray(value)) {
    return value.every(item => isReactNode(item));
  }

  if (value && typeof value === 'object' && 'key' in value && 'props' in value && 'type' in value) {
    return isValidElement(value as ReactElement);
  }

  return false;
}

const isContentType = (
  value: ChatStatusAnnouncementProps['items'] | ChatStatusAnnouncementProps['content'],
): value is ChatStatusAnnouncementProps['content'] => isReactNode(value);

export const getContent = (
  items: ChatStatusAnnouncementProps['items'] | ChatStatusAnnouncementProps['content'],
): TextItem[] => {
  if (isContentType(items))
    return [
      {
        content: items,
      },
    ];

  if (items.length === 1) return items;

  const alertTextElement = items.find(item => item.shouldFocusOnHover);

  if (!alertTextElement) return items;

  const totalTextItems = [...items, { content: alertTextElement.content }];

  return totalTextItems;
};
