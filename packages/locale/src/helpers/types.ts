import { additionalTranslationsResources } from '@sbercloud/common-translations';

export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

export type AdditionalTranslations = typeof additionalTranslationsResources;

export type CommonTranslationsKeysType = {
  [key: string]: CommonTranslationsKeysType | string;
};
