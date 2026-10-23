import { CompanySuggestion } from '../../../../types';
import { DropListItemSpark } from './types';

export const suggestionToDropListItem = ({ id, company, inn, address }: CompanySuggestion): DropListItemSpark => ({
  id,
  inn,
  company,
  content: {
    option: company,
    description: `ИНН: ${inn}, ${address}`,
  },
});
