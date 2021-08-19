import { LanguageCodeType } from '@sbercloud/uikit-utils';

export enum Texts {
  copy = 'copy',
  refresh = 'refresh',
  play = 'play',
  stop = 'stop',
  pause = 'pause',
  view = 'view',
  loading = 'loading',
}

const Dictionary: Partial<Record<LanguageCodeType, Record<Texts, string>>> = {
  [LanguageCodeType.ruRU]: {
    copy: 'Копировать',
    refresh: 'Обновить',
    play: 'Запустить',
    stop: 'Остановить',
    pause: 'Пауза',
    view: 'Посмотреть',
    loading: 'Загрузка',
  },
  [LanguageCodeType.enGB]: {
    copy: 'Copy',
    refresh: 'Refresh',
    play: 'Play',
    stop: 'Stop',
    pause: 'Pause',
    view: 'View',
    loading: 'Loading',
  },
};

export function textProvider(language: LanguageCodeType, entity: Texts): string {
  return Dictionary?.[language]?.[entity] || '';
}
