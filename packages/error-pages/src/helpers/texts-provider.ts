import { createTextProvider, LanguageCodeType } from '@sbercloud/uikit-product-utils';

export enum Texts {
  FrontendErrorTitle = 'FrontendErrorTitle',
  PageUnavailableTitle = 'PageUnavailableTitle',
  PageNotFoundTitle = 'PageNotFoundTitle',
  RefreshButton = 'RefreshButton',
  ActionRedirectTitle = 'ActionRedirectTitle',
  SupportCenterButton = 'SupportCenterButton',
  MainPageLink = 'MainPageLink',
  BackLink = 'BackLink',
}

const Dictionary: Partial<Record<LanguageCodeType, Record<Texts, string>>> = {
  [LanguageCodeType.ruRU]: {
    [Texts.FrontendErrorTitle]: 'Непредвиденная ошибка',
    [Texts.PageUnavailableTitle]: 'Сервис недоступен',
    [Texts.PageNotFoundTitle]: 'Страница не найдена',
    [Texts.RefreshButton]: 'Обновить страницу',
    [Texts.ActionRedirectTitle]: 'Попробуйте начать с другой страницы',
    [Texts.SupportCenterButton]: 'Служба поддержки',
    [Texts.MainPageLink]: 'На главную',
    [Texts.BackLink]: 'Назад',
  },
  [LanguageCodeType.enGB]: {
    [Texts.FrontendErrorTitle]: 'Unexpected error',
    [Texts.PageUnavailableTitle]: 'Service unavailable',
    [Texts.PageNotFoundTitle]: 'Page not found',
    [Texts.RefreshButton]: 'Refresh the page',
    [Texts.ActionRedirectTitle]: 'Try starting from another page',
    [Texts.SupportCenterButton]: 'Support Service',
    [Texts.MainPageLink]: 'Go to the main page',
    [Texts.BackLink]: 'Go back',
  },
};

export const textProvider = createTextProvider<Texts>(Dictionary, 'error-pages');
