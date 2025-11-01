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

export const getContent = (textContent: ChatStatusAnnouncementProps['content']): TextItem[] => {
  if (isReactNode(textContent))
    return [
      {
        content: textContent,
      },
    ];

  if (textContent.length === 1) return textContent;

  const alertTextElement = textContent.find(item => item.shouldFocusOnHover);

  if (!alertTextElement) return textContent;

  const totalTextItems = [...textContent, { content: alertTextElement.content }];

  return totalTextItems;
};
