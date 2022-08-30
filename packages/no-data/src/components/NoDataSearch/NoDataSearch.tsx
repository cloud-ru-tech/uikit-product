import { SearchInterfaceSVG } from '@sbercloud/uikit-product-icons';
import { PredefinedDecorIconPrivate } from '@sbercloud/uikit-product-predefined-icons-private';
import {
  createTextProvider,
  extractSupportProps,
  LanguageCodeType,
  useLanguage,
  WithSupportProps,
} from '@sbercloud/uikit-product-utils';

import { NoData } from '../NoData';

enum Texts {
  Title = 'Title',
  Description = 'Description',
}

const Dictionary: Partial<Record<LanguageCodeType, Record<Texts, string>>> = {
  [LanguageCodeType.ruRU]: {
    [Texts.Title]: 'Ничего не найдено',
    [Texts.Description]: 'Попробуйте изменить запрос',
  },
  [LanguageCodeType.enGB]: {
    [Texts.Title]: 'Nothing was found',
    [Texts.Description]: 'Try changing the query',
  },
};

const textProvider = createTextProvider<Texts>(Dictionary, 'no-data');

export function NoDataSearch({ ...rest }: WithSupportProps<object>) {
  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });
  const title = textProvider(languageCode, Texts.Title);
  const description = textProvider(languageCode, Texts.Description);

  return (
    <NoData
      image={
        <PredefinedDecorIconPrivate type={PredefinedDecorIconPrivate.types.Custom} icon={<SearchInterfaceSVG />} />
      }
      title={title}
      description={description}
      {...extractSupportProps(rest)}
    />
  );
}
