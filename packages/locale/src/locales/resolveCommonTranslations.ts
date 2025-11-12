import { commonTranslations, I18N_NS } from '@cloud-ru/common-translations';

import { DeepPartial, getTranslationResolver } from '../helpers';
import { en_GB } from './en_GB';

export const resolveCommonTranslations = getTranslationResolver(
  {
    PageLayout: {
      PageForm: {
        continue: commonTranslations.buttons.continue,
        create: commonTranslations.buttons.create,
        save: commonTranslations.buttons.save,
        cancel: commonTranslations.buttons.cancel,
        back: commonTranslations.buttons.back,
        rent: commonTranslations.buttons.rent,
        send: commonTranslations.buttons.send,
        restore: commonTranslations.buttons.restore,
      },
    },
    ModalPredefined: {
      cancel: commonTranslations.buttons.cancel,
    },
  } as const satisfies DeepPartial<typeof en_GB>,
  I18N_NS,
);
