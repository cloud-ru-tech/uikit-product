import { useArgs, useState } from '@storybook/client-api';
import { addons } from '@storybook/preview-api';
import { ArgTypes } from '@storybook/react';
import { useEffect, useMemo } from 'react';
import { UPDATE_DARK_MODE_EVENT_NAME } from 'storybook-dark-mode';

import { DetalisationSVG, MoneySVG, UsersSVG } from '@sbercloud/uikit-product-icons';
import { EmailSVG, FileSVG, PlaceholderSVG, SettingsSVG } from '@snack-uikit/icons';
import { Tooltip } from '@snack-uikit/tooltip';

import { Header, HeaderProps } from '../src';
import {
  AdvancedPlatformLogo,
  EnterprisePlatformLogo,
  EvolutionPlatformLogo,
  MLSpacePlatformLogo,
} from '../src/helperComponents';
import styles from './styles.modules.scss';

export type StoryProps = HeaderProps & {
  showSelect: boolean;
  showWorkspaces: boolean;
  showPagePath: boolean;
  showSettings: boolean;
  showHelpMenu: boolean;
  showNotifications: boolean;
  showUserMenu: boolean;
  showUserMenuManagement: boolean;
  showUserMenuThemeSwitch: boolean;
  showUserMenuLogout: boolean;
  showOrganizationInvite: boolean;
  showOrganizationInvitePopover: boolean;

  showAddOrganization: boolean;

  showPlatformsLoading: boolean;

  showLinks: boolean;
  showFooterLinks: boolean;
  showPinnedCards: boolean;

  showSinglePlatform: boolean;
};

const channel = addons.getChannel();

const DEFAULT_USER = {
  name: 'Юзер Пользователев',
  email: 'почтовый@сервис.ру',
};

const PROJECT_ACTIONS = [{ id: 'test', content: { option: 'test' } }];

const DEFAULT_PROJECT = { id: '1_1', name: 'Проект 1', actions: PROJECT_ACTIONS };
const DEFAULT_PLATFORM = { id: '1', name: 'Evolution', logo: <EvolutionPlatformLogo /> };
const WORKSPACES = {
  selectedWorkspace: { id: '1', name: 'Workspace 1' },
  list: [
    { id: '1', name: 'Workspace 1' },
    { id: '2', name: 'Workspace 2' },
    { id: '3', name: 'Workspace 3' },
    { id: '4', name: 'W'.repeat(16) },
  ],
  onWorkspaceChange: () => {},
  onWorkspaceAdd: () => {},
};
const DEFAULT_PRODUCT = { ...DEFAULT_PLATFORM, category: 'Облачная платформа' };
const ALL_PRODUCTS_MULTI = [
  {
    id: '1',
    heading: 'Облачные платформы',
    items: [
      DEFAULT_PRODUCT,
      { id: '2', name: 'Advanced', logo: <AdvancedPlatformLogo />, category: 'Облачная платформа' },
      { id: '3', name: 'MLSpace', logo: <MLSpacePlatformLogo />, category: 'Облачная платформа' },
      { id: '4', name: 'Enterprise', logo: <EnterprisePlatformLogo />, category: 'Облачная платформа' },
    ],
  },
  {
    id: '2',
    heading: 'Другие продукты',
    items: [
      { id: 'lkp', name: 'Личный кабинет партнера', category: 'Другой продукт' },
      { id: 'admin', name: 'Административная панель', category: 'Другой продукт' },
    ],
  },
];

const ALL_PRODUCTS_SINGLE = [
  {
    id: '1',
    heading: 'Облачные платформы',
    items: [DEFAULT_PRODUCT],
  },
];

const DEFAULT_NOTIFICATION = {
  label: ['Категория', 'Подкатегория'].join('・'),
  appearance: 'neutral' as const,
  title: 'Уведомление',
  content: `Демо-контент.

Вам пришло какое-то уведомление, чтобы посмотреть детали, воспользуйтесь ссылкой ниже.`,
  link: {
    text: 'Ссылка на детальную информацию',
    href: '#',
  },
  date: 'DD.MM.YYYY HH:MM',
  actions: [
    {
      content: { option: 'Действие 1' },
    },
    {
      content: { option: 'Действие 2' },
    },
  ],
};

function generateCards(amount: number, addUnread?: boolean) {
  return Array.from({ length: amount }).map((_, i) => ({
    ...DEFAULT_NOTIFICATION,
    id: `${Date.now()}${i}`,
    unread: addUnread ? i < 3 : undefined,
  }));
}

export function getTemplate({ mobile }: { mobile: boolean }) {
  return function ({
    showSelect,
    showPagePath,
    showSettings,
    showHelpMenu,
    showNotifications,
    showUserMenu,
    showUserMenuManagement,
    showUserMenuThemeSwitch,
    showUserMenuLogout,
    userMenu,
    organizations,
    showAddOrganization,
    showOrganizationInvite,
    showLinks,
    showFooterLinks,
    showPinnedCards,
    showPlatformsLoading,
    showSinglePlatform,
    ...args
  }: StoryProps) {
    const [organization, setOrganization] = useState(args.selectedOrganization);
    const [project, setProject] = useState(args.select?.selectedProject ?? DEFAULT_PROJECT);
    const [platform, setPlatform] = useState(args.select?.selectedPlatform ?? DEFAULT_PLATFORM);
    const [product, setProduct] = useState(args.drawerMenu.selectedProduct);
    const [workspace, setWorkspace] = useState(
      args.select?.workspaces?.selectedWorkspace ?? WORKSPACES.selectedWorkspace,
    );
    const [selectedLink, setSelectedLink] = useState(args.drawerMenu.selectedLink);

    const [notifyCards, setCards] = useState(args.notifications?.items || []);

    const [{ showOrganizationInvitePopover }, setArgs] = useArgs<StoryProps>();

    const closeInvitesPopover = () => setArgs({ showOrganizationInvitePopover: false });

    useEffect(() => {
      if (!showOrganizationInvite && showOrganizationInvitePopover) {
        closeInvitesPopover();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showOrganizationInvite, showOrganizationInvitePopover]);

    if (args.select) {
      args.select.selectedProject = project;
      args.select.onProjectChange = setProject;
      args.select.selectedPlatform = platform;
      args.select.onPlatformChange = setPlatform;
      args.select.platformsLoading = showPlatformsLoading;
      args.select.workspaces = args.showWorkspaces
        ? {
            list: WORKSPACES.list,
            selectedWorkspace: workspace,
            onWorkspaceChange: setWorkspace,
            onWorkspaceAdd: () => {},
          }
        : undefined;
    }

    args.drawerMenu.allProducts = showSinglePlatform ? ALL_PRODUCTS_SINGLE : ALL_PRODUCTS_MULTI;

    const orgs = useMemo(() => {
      if (showOrganizationInvite) {
        return [...(organizations || []), { id: '3', name: 'ООО Инвайт', new: true }];
      }

      return organizations;
    }, [organizations, showOrganizationInvite]);

    return (
      <div className={styles.wrapper}>
        <Header
          {...args}
          mobile={mobile}
          selectedOrganization={organization}
          onOrganizationChange={setOrganization}
          select={showSelect ? args.select : undefined}
          pagePath={showPagePath ? args.pagePath : undefined}
          settings={showSettings ? args.settings : undefined}
          onHelpMenuClick={showHelpMenu ? args.onHelpMenuClick : undefined}
          notifications={
            showNotifications && args.notifications
              ? {
                  ...args.notifications,
                  count: notifyCards.filter(card => card.unread).length,
                  items: notifyCards,
                  loadCards: {
                    fetchMore() {
                      return new Promise(resolve => {
                        setTimeout(() => {
                          setCards(prev => [...prev, ...generateCards(5)]);
                          resolve(true);
                        }, 2000);
                      });
                    },
                    hasMore: true,
                  },
                }
              : undefined
          }
          userMenu={
            showUserMenu && userMenu
              ? {
                  user: userMenu.user ?? DEFAULT_USER,
                  indicator: userMenu.indicator,
                  onProfileManagementClick: showUserMenuManagement ? userMenu.onProfileManagementClick : undefined,
                  onThemeSwitchClick: showUserMenuThemeSwitch ? userMenu.onThemeSwitchClick : undefined,
                  onLogout: showUserMenuLogout ? userMenu.onLogout : undefined,
                  onAvatarClick: closeInvitesPopover,
                  invites: showOrganizationInvite
                    ? {
                        count: 1,
                        showPopover: showOrganizationInvitePopover,
                        onOpenButtonClick: closeInvitesPopover,
                      }
                    : undefined,
                }
              : undefined
          }
          organizations={orgs}
          onOrganizationAdd={showAddOrganization ? args.onOrganizationAdd : undefined}
          drawerMenu={{
            ...args.drawerMenu,
            selectedLink,
            onLinkChange: setSelectedLink,
            links: showLinks ? args.drawerMenu.links : undefined,
            footerLinks: showFooterLinks ? args.drawerMenu.footerLinks : undefined,
            pinnedCards: showPinnedCards ? args.drawerMenu.pinnedCards : undefined,
            selectedProduct: product,
            onProductChange: setProduct,
          }}
        />
      </div>
    );
  };
}

export const ARGS: StoryProps = {
  showSelect: true,
  showWorkspaces: false,
  select: {
    platforms: [
      DEFAULT_PLATFORM,
      { id: '2', name: 'Advanced', logo: <AdvancedPlatformLogo /> },
      { id: '3', name: 'MLSpace', logo: <MLSpacePlatformLogo /> },
      { id: '4', name: 'Enterprise', logo: <EnterprisePlatformLogo /> },
    ],
    selectedPlatform: DEFAULT_PLATFORM,
    projects: [
      {
        id: '1',
        heading: 'Folder 1',
        items: [DEFAULT_PROJECT, { id: '1_2', name: 'Проект 2', onEdit: () => {}, actions: PROJECT_ACTIONS }],
      },
      {
        id: '2',
        heading: 'Folder 2',
        items: [
          { id: '2_1', name: 'Проект 3', actions: PROJECT_ACTIONS },
          { id: '2_2', name: 'W'.repeat(26), actions: PROJECT_ACTIONS, onEdit: () => {} },
        ],
      },
      {
        id: '3',
        heading: 'Long Long Long Long Long Long Long Long Long Long name of the Folder',
        items: [
          { id: '3_1', name: 'Проект 5', actions: PROJECT_ACTIONS },
          { id: '3_2', name: 'Проект 6 с очень очень очень очень длинным названием', actions: PROJECT_ACTIONS },
          { id: '3_3', name: 'Проект 7 с очень длинным названием', actions: PROJECT_ACTIONS },
        ],
      },
    ],
    selectedProject: DEFAULT_PROJECT,
    projectAddButton: {
      onClick: () => {},
    },
  },

  showPagePath: true,
  pagePath: [
    { id: 'home', label: 'Home', onClick: () => {} },
    { id: 'level-2', label: 'Level 2', onClick: () => {} },
    {
      id: 'level-3',
      label: 'Super-puper-duper-hyper-xxl-proMax crumb level 3',
      icon: PlaceholderSVG,
      onClick: () => {},
    },
  ],

  showSettings: true,
  settings: [
    { id: 'settings', label: 'Настройки организации', icon: <SettingsSVG />, onClick: () => {} },
    { id: 'users', label: 'Пользователи', icon: <UsersSVG />, onClick: () => {} },
    { id: 'agreements', label: 'Договоры', icon: <DetalisationSVG />, onClick: () => {} },
    { id: 'billing', label: 'Контроль затрат', icon: <MoneySVG />, onClick: () => {} },
  ],

  showHelpMenu: true,
  onHelpMenuClick: () => {},

  showNotifications: true,

  notifications: {
    count: 0,
    items: generateCards(8, true),
    readAll: () => {},
    loadCards: {
      fetchMore: () => new Promise(resolve => resolve(true)),
      hasMore: true,
    },
    onCardsRead() {},
  },

  showUserMenu: true,
  showUserMenuManagement: true,
  showUserMenuThemeSwitch: true,
  showUserMenuLogout: true,
  showOrganizationInvite: false,
  showOrganizationInvitePopover: false,
  showPlatformsLoading: false,
  userMenu: {
    user: DEFAULT_USER,
    indicator: 'green',
    onProfileManagementClick: () => {},
    onThemeSwitchClick: () => {
      channel.emit(UPDATE_DARK_MODE_EVENT_NAME);
    },
    onLogout: () => {},
  },

  showAddOrganization: true,
  organizations: [
    { id: '1', name: 'Облачные технологии' },
    { id: '2', name: 'ИП Иванов И.И.' },
    { id: '3', name: 'Очень-очень длинное название очень большой организации' },
  ],
  selectedOrganization: { id: '1', name: 'Облачные технологии' },
  onOrganizationAdd: () => {},

  showLinks: true,
  showFooterLinks: true,
  showPinnedCards: true,
  showSinglePlatform: false,
  drawerMenu: {
    allProducts: [
      {
        id: '1',
        heading: 'Облачные платформы',
        items: [
          DEFAULT_PRODUCT,
          { id: '2', name: 'Advanced', logo: <AdvancedPlatformLogo />, category: 'Облачная платформа' },
          { id: '3', name: 'MLSpace', logo: <MLSpacePlatformLogo />, category: 'Облачная платформа' },
          { id: '4', name: 'Enterprise', logo: <EnterprisePlatformLogo />, category: 'Облачная платформа' },
        ],
      },
      {
        id: '2',
        heading: 'Другие продукты',
        items: [
          { id: 'lkp', name: 'Личный кабинет партнера', category: 'Другой продукт' },
          { id: 'admin', name: 'Административная панель', category: 'Другой продукт' },
        ],
      },
    ],
    selectedProduct: DEFAULT_PRODUCT,
    onProductChange: () => {},
    footerLinks: [
      {
        id: 'billing',
        icon: <PlaceholderSVG />,
        label: 'Контроль затрат',
        onClick: () => {},
        hotSpot: {
          enabled: true,
          placement: 'right',
          offsetX: 15,
          dotRender: dot => (
            <Tooltip placement='bottom' tip={'Тут можно передать ReactNode и засунуть любой компонент'} trigger='click'>
              {dot}
            </Tooltip>
          ),
        },
      },
      { id: 'support', icon: <EmailSVG />, label: 'Поддержка', onClick: () => {} },
      { id: 'administration', icon: <SettingsSVG />, label: 'Администрирование', onClick: () => {} },
      { id: 'users', icon: <PlaceholderSVG />, label: 'Пользователи', onClick: () => {} },
      { id: 'documentation', icon: <FileSVG />, label: 'Документация', onClick: () => {} },
    ],
    pinnedCards: [
      {
        id: 'gpt-4',
        title: 'GPT-4 модели',
        description: 'Генерация текста на любые темы, 1,3 млрд параметров',
        onClick: () => {},
      },
      {
        id: 'marketplace',
        title: 'AI Marketplace',
        description: 'Маркетплейс образов, программ, датасетов',
        onClick: () => {},
      },
    ],
    selectedLink: 'vms',
    links: [
      {
        label: 'Инфраструктура',
        id: 'infrastructure',
        items: [
          { id: 'vms', label: 'Виртуальные машины', onClick: () => {}, icon: PlaceholderSVG },
          { id: 'images', label: 'Образы', onClick: () => {}, icon: PlaceholderSVG },
          { id: 'bms', label: 'Bare Metal', onClick: () => {}, icon: PlaceholderSVG },
          { id: 'rcs', label: 'Резервные копии', onClick: () => {}, icon: PlaceholderSVG },
        ],
      },
      {
        label: 'Сеть',
        id: 'network',
        items: [
          { id: 'vpc', label: 'VPC', onClick: () => {}, icon: PlaceholderSVG },
          { id: 'snat', label: 'sNAT-шлюзы', onClick: () => {}, icon: PlaceholderSVG, badge: 'Preview' },
          { id: 'subnets', label: 'Подсети', onClick: () => {}, icon: PlaceholderSVG },
          { id: 'safegroups', label: 'Группы безопасности', onClick: () => {}, icon: PlaceholderSVG },
          { id: 'public-ipis', label: 'Публичные IP-адреса', onClick: () => {}, icon: PlaceholderSVG },
          {
            id: 'load-balancer',
            label: 'Балансировщик нагрузки',
            onClick: () => {},
            icon: PlaceholderSVG,
            badge: { text: 'New', appearance: 'pink' },
          },
        ],
      },
      {
        label: 'Хранение данных',
        id: 'storage',
        items: [
          { id: 'disks', label: 'Диски', onClick: () => {}, icon: PlaceholderSVG },
          { id: 's3', label: 'S3 Objective Storage', onClick: () => {}, icon: PlaceholderSVG },
        ],
      },
      {
        label: 'Контейнеры и оркестрация',
        id: 'containers',
        items: [
          { id: 'con_i1', label: 'Item 1', onClick: () => {}, icon: PlaceholderSVG },
          { id: 'con_i2', label: 'Item 2', onClick: () => {}, icon: PlaceholderSVG },
        ],
      },
      {
        label: 'Мониторинг',
        id: 'monitoring',
        items: [
          { id: 'mon_i1', label: 'Item 1', onClick: () => {}, icon: PlaceholderSVG },
          { id: 'mon_i2', label: 'Item 2', onClick: () => {}, icon: PlaceholderSVG },
        ],
      },
      {
        label: 'Инструменты разработчика',
        id: 'devtools',
        items: [
          { id: 'devtools_i1', label: 'Item 1', onClick: () => {}, icon: PlaceholderSVG },
          { id: 'devtools_i2', label: 'Item 2', onClick: () => {}, icon: PlaceholderSVG },
          { id: 'devtools_i3', label: 'Item 3', onClick: () => {}, icon: PlaceholderSVG },
          { id: 'devtools_i4', label: 'Item 4', onClick: () => {}, icon: PlaceholderSVG },
        ],
      },
    ],
  },

  homePageUrl: 'https://console.cloud.ru',
};

export const ARG_TYPES: Partial<ArgTypes<StoryProps>> = {
  showSelect: { name: '[Story]: show header select', type: 'boolean' },
  select: { table: { disable: true } },

  showPlatformsLoading: { name: '[Story]: show skeleton for platforms', type: 'boolean' },

  showWorkspaces: { name: '[Story]: show workspaces', type: 'boolean' },

  showPagePath: { name: '[Story]: show page path', type: 'boolean' },
  pagePath: { table: { disable: true } },

  showSettings: { name: '[Story]: show settings menu', type: 'boolean' },
  settings: { table: { disable: true } },

  showHelpMenu: { name: '[Story]: show help menu', type: 'boolean' },
  onHelpMenuClick: { table: { disable: true } },

  showNotifications: { name: '[Story]: show notifications', type: 'boolean' },
  notifications: { table: { disable: true } },

  showUserMenu: { name: '[Story]: show user menu', type: 'boolean' },
  userMenu: { table: { disable: true } },
  showUserMenuManagement: {
    name: '[Story]: show user menu -> profile management',
    type: 'boolean',
    if: { arg: 'showUserMenu', eq: true },
  },
  showUserMenuThemeSwitch: {
    name: '[Story]: show user menu -> theme switch',
    type: 'boolean',
    if: { arg: 'showUserMenu', eq: true },
  },
  showUserMenuLogout: {
    name: '[Story]: show user menu -> logout',
    type: 'boolean',
    if: { arg: 'showUserMenu', eq: true },
  },

  showAddOrganization: { name: '[Story]: show add organizations', type: 'boolean' },
  showOrganizationInvite: {
    name: '[Story]: show organization invite badge and counter',
  },
  showOrganizationInvitePopover: {
    name: '[Story]: show organization invite popover',
  },
  organizations: { table: { disable: true } },
  onOrganizationAdd: { table: { disable: true } },
  onOrganizationChange: { table: { disable: true } },
  selectedOrganization: { table: { disable: true } },

  showLinks: { name: '[Story]: show drawer -> links', type: 'boolean' },
  showFooterLinks: { name: '[Story]: show drawer -> footer links', type: 'boolean' },
  showPinnedCards: { name: '[Story]: show drawer -> pinned cards', type: 'boolean' },
  drawerMenu: { table: { disable: true } },
  showSinglePlatform: { name: '[Story]: show drawer -> single platform', type: 'boolean' },
};
