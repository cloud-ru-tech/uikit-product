import { ChatStatusAnnouncementProps, TextItem } from '../types';

export const isStringContent = (textContent: ChatStatusAnnouncementProps['content']): textContent is string =>
  typeof textContent === 'string';

export const getContent = (textContent: ChatStatusAnnouncementProps['content']): TextItem[] => {
  if (isStringContent(textContent))
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
