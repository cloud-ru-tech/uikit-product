import { createTextProvider, LanguageCodeType } from '@sbercloud/uikit-product-utils';

export enum Texts {
  HeaderBalanceTooltipBalance = 'header-balance-tooltip-balance',
  HeaderBalanceTooltipLimit = 'header-balance-tooltip-limit',
  HeaderBalanceTooltipBonuses = 'header-balance-tooltip-bonuses',
  HeaderBalanceTooltipRecharge = 'header-balance-tooltip-recharge',

  HeaderProjectSelectorCreateProject = 'header-project-selector-create-project',
  HeaderProjectSelectorCreateWorkspace = 'header-project-selector-create-workspace',
  HeaderProjectSelectorEditOption = 'header-project-selector-edit-option',

  NoDataFound = 'no-data-found',

  // ЛК 2.0
  Menu = 'menu',
  SearchByServices = 'search-by-services',
  NoData = 'no-data',
  Notifications = 'notifications',
  NotificationsAll = 'notifications-all',
  NotificationsUnread = 'notifications-unread',
  NotificationsErrorTitle = 'notifications-error-title',
  NotificationsErrorDescription = 'notifications-error-description',
  MarkAllAsRead = 'mark-all-as-read',
  NotificationsFooterButton = 'notifications-footer-button',
  NoNotifications = 'no-notifications',
  NotificationsDivider = 'notifications-divider',
  Search = 'search',
  Edit = 'edit',
  Organization = 'organization',
  AddOrganization = 'add-organization',
  Project = 'project',
  AddProject = 'add-project',
  Platforms = 'platforms',
  ManageProfile = 'manage-profile',
  SwitchTheme = 'switch-theme',
  Logout = 'logout',
}

const dictionary: Partial<Record<LanguageCodeType, Record<Texts, string>>> = {
  [LanguageCodeType.ruRU]: {
    [Texts.HeaderBalanceTooltipBalance]: 'Баланс',
    [Texts.HeaderBalanceTooltipLimit]: 'Лимит',
    [Texts.HeaderBalanceTooltipBonuses]: 'Бонусы',
    [Texts.HeaderBalanceTooltipRecharge]: 'Пополнить баланс',

    [Texts.HeaderProjectSelectorCreateProject]: 'Создать проект',
    [Texts.HeaderProjectSelectorCreateWorkspace]: 'Создать workspace',
    [Texts.HeaderProjectSelectorEditOption]: 'Редактировать',

    [Texts.NoDataFound]: 'Ничего не найдено',

    // ЛК 2.0
    [Texts.Menu]: 'Меню',
    [Texts.SearchByServices]: 'Поиск по сервисам',
    [Texts.NoData]: 'Нет данных',
    [Texts.Notifications]: 'Уведомления',
    [Texts.NotificationsAll]: 'Все',
    [Texts.NotificationsUnread]: 'Новые',
    [Texts.MarkAllAsRead]: 'Отметить все как прочитанное',
    [Texts.NoNotifications]: 'Нет уведомлений',
    [Texts.NotificationsErrorTitle]: 'Уже чиним',
    [Texts.NotificationsErrorDescription]: 'Скоро здесь появятся ваши уведомления',
    [Texts.NotificationsDivider]: 'Прочитанные',
    [Texts.NotificationsFooterButton]: 'Все события',

    [Texts.Search]: 'Поиск',
    [Texts.Edit]: 'Редактировать',
    [Texts.Organization]: 'Организация',
    [Texts.AddOrganization]: 'Добавить организацию',
    [Texts.Project]: 'Проекты',
    [Texts.AddProject]: 'Добавить проект',
    [Texts.Platforms]: 'Платформы',
    [Texts.ManageProfile]: 'Управление профилем',
    [Texts.SwitchTheme]: 'Переключить тему',
    [Texts.Logout]: 'Выйти из аккаунта',
  },
  [LanguageCodeType.enGB]: {
    [Texts.HeaderBalanceTooltipBalance]: 'Balance',
    [Texts.HeaderBalanceTooltipLimit]: 'Limit',
    [Texts.HeaderBalanceTooltipBonuses]: 'Bonuses',
    [Texts.HeaderBalanceTooltipRecharge]: 'Recharge the balance',

    [Texts.HeaderProjectSelectorCreateProject]: 'Create project',
    [Texts.HeaderProjectSelectorCreateWorkspace]: 'Create workspace',
    [Texts.HeaderProjectSelectorEditOption]: 'Edit',

    [Texts.NoDataFound]: 'Nothing found',

    // ЛК 2.0
    [Texts.Menu]: 'Menu',
    [Texts.SearchByServices]: 'Search by service',
    [Texts.NoData]: 'Nothing found',
    [Texts.Notifications]: 'Notifications',
    [Texts.NotificationsAll]: 'All',
    [Texts.NotificationsUnread]: 'Unread',
    [Texts.MarkAllAsRead]: 'Mark all as read',
    [Texts.NoNotifications]: 'No notifications',
    [Texts.NotificationsErrorTitle]: "We're already fixing it",
    [Texts.NotificationsErrorDescription]: 'Your notifications will appear here soon',
    [Texts.NotificationsDivider]: 'Already read',
    [Texts.NotificationsFooterButton]: 'All events',

    [Texts.Search]: 'Search',
    [Texts.Edit]: 'Edit',
    [Texts.Organization]: 'Organization',
    [Texts.AddOrganization]: 'Add organization',
    [Texts.Project]: 'Projects',
    [Texts.AddProject]: 'Add projects',
    [Texts.Platforms]: "Project's platform",
    [Texts.ManageProfile]: 'Manage profile',
    [Texts.SwitchTheme]: 'Switch theme',
    [Texts.Logout]: 'Logout',
  },
};

export const textProvider = createTextProvider<Texts>(dictionary, 'navigation');
