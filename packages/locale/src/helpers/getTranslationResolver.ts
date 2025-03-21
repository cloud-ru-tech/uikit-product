import lodashGet from 'lodash.get';
import lodashSet from 'lodash.set';

import { AdditionalTranslations, CommonTranslationsKeysType } from './types';

type CrawlerParams = {
  data: CommonTranslationsKeysType | string;
  handler(path: string, value: string): void;
  prefix?: string;
};

function crawler({ data, prefix = '', handler }: CrawlerParams) {
  if (typeof data === 'string') {
    handler(prefix, data);
  } else {
    for (const key in data) {
      const value = data[key];
      crawler({ data: value, prefix: prefix ? `${prefix}.${key}` : key, handler });
    }
  }
}

export const getTranslationResolver =
  <D extends CommonTranslationsKeysType>(data: D, nameSpace: string) =>
  (additionalTranslations: AdditionalTranslations): CommonTranslationsKeysType => {
    const languages = Object.keys(additionalTranslations);

    const result: CommonTranslationsKeysType = {};

    for (const lang of languages) {
      crawler({
        data,
        handler: (path, value) => {
          const text: string | undefined = lodashGet(additionalTranslations, `${lang}.${nameSpace}.${value}`);
          if (text !== undefined) {
            lodashSet(result, `${lang}.${path}`, text);
          }
        },
      });
    }

    return result;
  };
