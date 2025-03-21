import { describe, expect, it } from 'vitest';

import { AdditionalTranslations } from '../helpers';
import { getTranslationResolver } from '../helpers/getTranslationResolver';

describe('getTranslationResolver', () => {
  const additionalTranslations = {
    'ru-RU': { NameSpace1: { buttons: { save: 'Сохранить', cancel: 'Отмена' } } },
    'en-GB': { NameSpace1: { buttons: { save: 'Save', cancel: 'Cancel' } } },
  } as unknown as AdditionalTranslations;

  it('should create translations locale object', () => {
    const resolveWith = getTranslationResolver(
      {
        PageLayout: {
          PageForm: {
            save: 'buttons.save',
            cancel: 'buttons.cancel',
          },
        },
      },
      'NameSpace1',
    );

    expect(resolveWith(additionalTranslations)).toMatchSnapshot();
  });

  it('should skip undefined key', () => {
    const resolveWith = getTranslationResolver(
      {
        PageLayout: {
          PageForm: {
            save: 'buttons.save',
            ok: 'buttons.undefined_key',
          },
        },
      },
      'NameSpace1',
    );

    expect(resolveWith(additionalTranslations)).toMatchSnapshot();
  });
});
