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
  },
};

export const textProvider = createTextProvider<Texts>(Dictionary, 'notification-panel');
