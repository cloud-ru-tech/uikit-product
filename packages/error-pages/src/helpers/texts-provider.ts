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
  OfflineTitle = 'OfflineTitle',
  OfflineText = 'OfflineText',
  RedirectTitle = 'RedirectTitle',
  RedirectText = 'RedirectText',
  RedirectButton = 'RedirectButton',
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
    [Texts.OfflineTitle]: 'Нет подключения к Интернету',
    [Texts.OfflineText]: 'Проверьте соединение с интернетом и попробуйте обновить страницу',
    [Texts.RedirectTitle]: 'Ссылка будет удалена',
    [Texts.RedirectText]: 'Эта ссылка устарела и скоро будет удалена. Перейдите по новой ссылке.',
    [Texts.RedirectButton]: 'Перейти',
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
    [Texts.OfflineTitle]: 'No Internet Connection',
    [Texts.OfflineText]: 'Check your internet connection and try refreshing the page',
    [Texts.RedirectTitle]: 'The link will be removed',
    [Texts.RedirectText]: 'The link is obsolete and will be removed soon. Go to the new link',
    [Texts.RedirectButton]: 'Go to',
  },
};

export const textProvider = createTextProvider<Texts>(Dictionary, 'error-pages');
