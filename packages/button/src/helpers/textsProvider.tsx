import { LanguageCodeType, createTextProvider } from '@sbercloud/uikit-utils';

import pkg from '../../package.json';

export enum Texts {
  Copy = 'copy',
  Refresh = 'refresh',
  Play = 'play',
  Stop = 'stop',
  Pause = 'pause',
  View = 'view',
  Loading = 'loading',
}

const Dictionary: Partial<Record<LanguageCodeType, Record<Texts, string>>> = {
  [LanguageCodeType.ruRU]: {
    [Texts.Copy]: 'Копировать',
    [Texts.Refresh]: 'Обновить',
    [Texts.Play]: 'Запустить',
    [Texts.Stop]: 'Остановить',
    [Texts.Pause]: 'Пауза',
    [Texts.View]: 'Посмотреть',
    [Texts.Loading]: 'Загрузка',
  },
  [LanguageCodeType.enGB]: {
    [Texts.Copy]: 'Copy',
    [Texts.Refresh]: 'Refresh',
    [Texts.Play]: 'Play',
    [Texts.Stop]: 'Stop',
    [Texts.Pause]: 'Pause',
    [Texts.View]: 'View',
    [Texts.Loading]: 'Loading',
  },
};

export const textProvider = createTextProvider<Texts>(Dictionary, pkg.name);
