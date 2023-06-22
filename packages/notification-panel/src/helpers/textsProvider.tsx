import { createTextProvider, LanguageCodeType } from '@sbercloud/uikit-product-utils';

export enum Texts {
  All = 'All',
  New = 'New',
  Notifications = 'Notifications',
  MarkAllAsRead = 'MarkAllAsRead',
  AllEvents = 'AllEvents',
  DeleteNotification = 'DeleteNotification',
  NoNewNotificationsTitle = 'NoNewNotificationsTitle',
  NoNewNotificationsDescription = 'NoNewNotificationsDescription',
  LoadingText = 'LoadingText',
  ErrorTitle = 'ErrorTitle',
  ErrorDescription = 'ErrorDescription',
}

const Dictionary: Partial<Record<LanguageCodeType, Record<Texts, string>>> = {
  [LanguageCodeType.ruRU]: {
    [Texts.All]: 'Все',
    [Texts.New]: 'Новые',
    [Texts.Notifications]: 'Уведомления',
    [Texts.MarkAllAsRead]: 'Отметить все прочитанными',
    [Texts.AllEvents]: 'Все события',
    [Texts.DeleteNotification]: 'Удалить уведомление',
    [Texts.NoNewNotificationsTitle]: 'Нет новых уведомлений',
    [Texts.NoNewNotificationsDescription]: 'Здесь вы увидите уведомления о новых событиях, когда что-то произойдет',
    [Texts.LoadingText]: 'Данные загружаются...',
    [Texts.ErrorTitle]: 'Уже чиним',
    [Texts.ErrorDescription]: 'Скоро здесь появятся ваши уведомления',
  },
  [LanguageCodeType.enGB]: {
    [Texts.All]: 'All',
    [Texts.New]: 'New',
    [Texts.Notifications]: 'Notifications',
    [Texts.MarkAllAsRead]: 'Mark all as read',
    [Texts.AllEvents]: 'All events',
    [Texts.DeleteNotification]: 'Delete notification',
    [Texts.NoNewNotificationsTitle]: 'No new notifications',
    [Texts.NoNewNotificationsDescription]: 'Here you will see notifications of new events when something happens',
    [Texts.LoadingText]: 'Loading...',
    [Texts.ErrorTitle]: "We're already fixing it",
    [Texts.ErrorDescription]: 'Your notifications will appear here soon',
  },
};

export const textProvider = createTextProvider<Texts>(Dictionary, 'notification-panel');
