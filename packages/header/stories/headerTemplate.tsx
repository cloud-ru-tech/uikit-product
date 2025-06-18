import { useArgs, useState } from '@storybook/preview-api';
import { ArgTypes } from '@storybook/react';
import { useCallback, useEffect, useMemo } from 'react';

import {
  AdvancedSVG,
  CostControlSVG,
  DetalisationSVG,
  EmailSVG,
  EvolutionSVG,
  FileSVG,
  MlSpaceSVG,
  PlaceholderSVG,
  SettingsSVG,
  UsersSVG,
  VmwareSVG,
} from '@sbercloud/uikit-product-icons';
import { PageServices } from '@sbercloud/uikit-product-page-layout';
import { LayoutType } from '@sbercloud/uikit-product-utils';
import { HotSpotProps } from '@snack-uikit/hot-spot';
import { InfoFilledSVG } from '@snack-uikit/icons';
import { toaster } from '@snack-uikit/toaster';
import { Tooltip } from '@snack-uikit/tooltip';

import {
  AdvancedPlatformLogo,
  DefaultUserMenuProps,
  DIVIDER_SETTING_OPTION_ID,
  EnterprisePlatformLogo,
  EvolutionPlatformLogo,
  Header,
  HEADER_LOGO_MODE,
  HeaderLogo,
  HeaderLogoMode,
  HeaderProps,
  MLSpacePlatformLogo,
  Project,
  THEME_MODE,
  ThemeMode,
} from '../src';
import { ItemsGroup, UserMenuProps } from '../src/helperComponents';
import styles from './styles.module.scss';

export type StoryProps = Omit<HeaderProps, 'layoutType'> & {
  showSelect: boolean;
  customLogo: boolean;
  logoMode?: HeaderLogoMode;
  showVendorLogo: boolean;
  showPagePath: boolean;
  showSettings: boolean;
  showHelpMenu: boolean;
  leaveOneOrganization: boolean;
  showNotifications: boolean;
  showNotificationError: boolean;
  showUserMenu: boolean;
  showCustomUserMenu: boolean;
  showUserMenuManagement: boolean;

  showUserMenuWhatsNew: boolean;
  showUserMenuLogout: boolean;
  showUserMenuAlert: boolean;
  showOrganizationInvite: boolean;
  showOrganizationInvitePopover: boolean;

  showPartnerOrganization: boolean;
  showPartnerOrganizationPopover: boolean;

  showAddOrganization: boolean;

  showLinks: boolean;
  showFooterLinks: boolean;
  showMarketplaceBanner: boolean;
  showReferralBanner: boolean;

  showSinglePlatform: boolean;

  showProductSelect: boolean;

  projectsCatalogAmount: number;
  showProjectsLoading: boolean;
};

const EMPTY_ON_CLICK = () => {};
const EMPTY_HREF = '#';

const DEFAULT_USER = {
  name: 'Юзер Пользователев',
  email: 'почтовый@сервис.ру',
};

const PROJECT_ACTIONS = [
  {
    id: 'test',
    content: { option: 'test' },
    onClick: () => {
      window.dispatchEvent(new CustomEvent('header__close-main-menu'));
    },
  },
];

const PROJECT_PLATFORMS = [
  {
    id: 'evolution',
    label: 'Evolution',
    icon: <EvolutionSVG />,
    value: 'evolution',
    tip: 'Перейти в Evolution',
  },
  {
    id: 'advanced',
    label: 'Advanced',
    icon: <AdvancedSVG />,
    value: 'advanced',
    tip: 'Перейти в Advanced',
  },
  {
    id: 'vmware',
    label: 'Vmware',
    icon: <VmwareSVG />,
    value: 'vmware',
    tip: 'Перейти в Облако VMware',
  },
];

const DEFAULT_PROJECT = {
  id: '1_1',
  name: 'Проект 1',
  actions: PROJECT_ACTIONS,
  platforms: PROJECT_PLATFORMS,
  createdAt: new Date().toString(),
  lastVisitedAt: new Date('2025-05-01').toString(),
};

const PROJECTS: ItemsGroup<Project>[] = [
  {
    id: '1',
    heading: 'Folder 1',
    items: [
      DEFAULT_PROJECT,
      {
        id: '1_2',
        name: 'Проект 2',
        onEdit: () => {},
        createdAt: new Date().toString(),
        lastVisitedAt: new Date('2025-06-01').toString(),
        platforms: PROJECT_PLATFORMS,
      },
    ],
  },
  {
    id: '2',
    heading: 'Folder 2',
    items: [
      {
        id: '2_1',
        name: 'Проект 3',
        actions: PROJECT_ACTIONS,
        createdAt: new Date().toString(),
        lastVisitedAt: new Date('2025-06-02').toString(),
      },
      {
        id: '2_2',
        name: 'W'.repeat(26),
        actions: PROJECT_ACTIONS,
        onEdit: () => {},
        createdAt: new Date().toString(),
        lastVisitedAt: new Date('2025-06-03').toString(),
      },
    ],
  },
  {
    id: '3',
    heading: 'Long Long Long Long Long Long Long Long Long Long name of the Folder',
    items: [
      {
        id: '3_1',
        name: 'Проект 5',
        actions: PROJECT_ACTIONS,
        createdAt: new Date().toString(),
        lastVisitedAt: new Date().toString(),
      },
      {
        id: '3_2',
        name: 'Проект 6 с очень очень очень очень длинным названием',
        actions: PROJECT_ACTIONS,
        createdAt: new Date().toString(),
        lastVisitedAt: new Date().toString(),
      },
      {
        id: '3_3',
        name: 'Проект 7 с очень длинным названием',
        actions: PROJECT_ACTIONS,
        createdAt: new Date().toString(),
        lastVisitedAt: new Date().toString(),
      },
    ],
  },
  {
    id: '4',
    heading: 'Large group',
    items: new Array(10000).fill(0).map((_, index) => ({
      id: `4_${index}`,
      name: `Проект 4_${index}`,
      createdAt: new Date().toString(),
      lastVisitedAt: new Date().toString(),
    })),
  },
];

const DEFAULT_PLATFORM = { id: '1', name: 'Evolution', logo: <EvolutionPlatformLogo /> };
const DEFAULT_PRODUCT = { ...DEFAULT_PLATFORM, category: 'Облачная платформа' };

const PRODUCT_HOT_SPOT: HotSpotProps = { enabled: true, pulse: true, appearance: 'primary' };

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
      {
        id: 'lkp',
        name: 'Партнёрский кабинет',
        category: 'Другой продукт',
        hotSpot: PRODUCT_HOT_SPOT,
      },
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

const CUSTOM_USER_MENU_ITEMS = [
  {
    type: 'group',
    items: [
      {
        content: { option: 'Перейти в профиль' },
        onClick: () => {
          toaster.userAction.success({ label: 'Go to profile clicked' });
        },
        id: '1',
      },
      {
        content: { option: 'Выйти из аккаунта' },
        onClick: () => {
          toaster.userAction.success({ label: 'Logout clicked' });
        },
        id: '2',
      },
    ],
  },
];

function generateCards(amount: number, addUnread?: boolean) {
  return Array.from({ length: amount }).map((_, i) => ({
    ...DEFAULT_NOTIFICATION,
    id: `${Date.now()}${i}`,
    unread: addUnread ? i < 3 : undefined,
  }));
}

export function getTemplate({ layoutType }: { layoutType: LayoutType }) {
  return function ({
    showSelect,
    showPagePath,
    showVendorLogo,

    showSettings,
    showHelpMenu,
    showNotifications,
    showUserMenu,
    showCustomUserMenu,
    showUserMenuManagement,

    showUserMenuWhatsNew,
    showUserMenuAlert,
    showUserMenuLogout,
    showNotificationError,
    userMenu,
    leaveOneOrganization,
    organizations,
    showOrganizationInvite,
    showPartnerOrganization,
    showLinks,
    showFooterLinks,
    showMarketplaceBanner,
    showReferralBanner,
    showSinglePlatform,
    showProductSelect,

    projectsCatalogAmount,
    showProjectsLoading,
    ...args
  }: StoryProps) {
    const [organization, setOrganization] = useState((userMenu as DefaultUserMenuProps).selectedOrganization);
    const [project, setProject] = useState(args.select?.selectedProject ?? DEFAULT_PROJECT);
    const [product, setProduct] = useState(args.drawerMenu.selectedProduct);
    const [selectedLink, setSelectedLink] = useState(args.drawerMenu.selectedLink);

    const [platformsFilter, setPlatformsFilter] = useState(args.select?.platformsFilter?.value ?? []);

    const [notifyCards, setCards] = useState(args.notifications?.items || []);

    const [{ showOrganizationInvitePopover, showPartnerOrganizationPopover }, setArgs] = useArgs<StoryProps>();

    const closeInvitesPopover = useCallback(
      () => setArgs({ showOrganizationInvitePopover: false, showPartnerOrganizationPopover: false }),
      [setArgs],
    );

    const closePartnerOrganizationPopover = useCallback(
      () => setArgs({ showPartnerOrganizationPopover: false }),
      [setArgs],
    );

    useEffect(() => {
      if (!showOrganizationInvite && showOrganizationInvitePopover) {
        closeInvitesPopover();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showOrganizationInvite, showOrganizationInvitePopover]);

    if (args.select) {
      args.select.selectedProject = project;
      args.select.onProjectChange = setProject;

      if (args.select.platformsFilter) {
        args.select.platformsFilter.onChange = setPlatformsFilter;
        args.select.platformsFilter.value = platformsFilter;
      }
    }

    args.drawerMenu.allProducts = showSinglePlatform ? ALL_PRODUCTS_SINGLE : ALL_PRODUCTS_MULTI;

    const orgs = useMemo(() => {
      const allOrganizations = [...(organizations ?? [])];

      if (!leaveOneOrganization) {
        allOrganizations.push(
          { id: '2', name: 'ИП Иванов И.И.', type: 'CUSTOMER_TYPE_LEGAL' },
          {
            id: '3',
            name: 'Очень-очень длинное название очень большой организации',
            type: 'CUSTOMER_TYPE_LEGAL',
          },
        );
      }

      if (showOrganizationInvite) {
        allOrganizations.push({ id: '4', name: 'ООО Инвайт', new: true, type: 'CUSTOMER_TYPE_LEGAL' });
      }

      if (showPartnerOrganization) {
        allOrganizations.push({ id: '5', name: 'ИП Реферал', partner: true, type: 'CUSTOMER_TYPE_LEGAL' });
      }

      return allOrganizations;
    }, [organizations, showOrganizationInvite, showPartnerOrganization, leaveOneOrganization]);

    const [themeMode, setThemeMode] = useState<ThemeMode>(THEME_MODE.Light);

    const [logo, setLogo] = useState<HeaderLogo>({
      loading: true,
    });

    useEffect(() => {
      let timeout: NodeJS.Timeout;
      if (args.customLogo) {
        setLogo({
          loading: true,
        });
        timeout = setTimeout(() => {
          setLogo({
            loading: false,
            path: 'https://img.freepik.com/free-photo/beautiful-kitten-with-colorful-clouds_23-2150752964.jpg?w=1060&t=st=1727438409~exp=1727439009~hmac=f5b8aea828125647fb7d35bfab17b918f1ca233ac6f289ff07e3c2b00a834ed6',
          });
        }, 300);
      } else if (args.logoMode) {
        setLogo({ mode: args.logoMode });
      } else {
        setLogo({});
      }

      return () => {
        clearTimeout(timeout);
      };
    }, [args.customLogo, args.logoMode]);

    const [favoriteItems, setFavoriteItems] = useState<string[]>([]);

    const onFavoriteChange = (id: string) => (value: boolean) => {
      if (value) {
        setFavoriteItems([id, ...favoriteItems]);
      } else {
        setFavoriteItems(favoriteItems.filter(item => item !== id));
      }
    };

    const userMenuParams = useMemo<UserMenuProps | undefined>(() => {
      if (showUserMenu && userMenu) {
        const baseProps: DefaultUserMenuProps = {
          user: userMenu.user ?? DEFAULT_USER,
          indicator: userMenu.indicator,
          onAvatarClick: closeInvitesPopover,
          invites: showOrganizationInvite
            ? {
                count: 1,
                showPopover: showOrganizationInvitePopover,
                onOpenButtonClick: closeInvitesPopover,
              }
            : undefined,
          onOrganizationChange: setOrganization,
          selectedOrganization: organization,
          organizations,
        };

        if (showCustomUserMenu) {
          return {
            ...baseProps,
            customMenuItems: CUSTOM_USER_MENU_ITEMS,
          };
        }

        return {
          ...baseProps,
          onProfileManagementClick:
            'onProfileManagementClick' in userMenu && showUserMenuManagement
              ? userMenu.onProfileManagementClick
              : undefined,
          onWhatsNewClick: 'onWhatsNewClick' in userMenu && showUserMenuWhatsNew ? userMenu.onWhatsNewClick : undefined,
          onLogout: 'onLogout' in userMenu && showUserMenuLogout ? userMenu.onLogout : undefined,
          partnerInvites: showPartnerOrganization
            ? {
                count: 1,
                showPopover: showPartnerOrganizationPopover,
                onCloseClick: closePartnerOrganizationPopover,
              }
            : undefined,
          themeMode: {
            value: themeMode,
            onChange: setThemeMode,
          },
          topAlert: 'topAlert' in userMenu && showUserMenuAlert ? userMenu.topAlert : undefined,
          bottomAlert: 'bottomAlert' in userMenu && showUserMenuAlert ? userMenu.bottomAlert : undefined,
        };
      }
    }, [
      closeInvitesPopover,
      closePartnerOrganizationPopover,
      organization,
      organizations,
      showCustomUserMenu,
      showOrganizationInvite,
      showOrganizationInvitePopover,
      showPartnerOrganization,
      showPartnerOrganizationPopover,
      showUserMenu,
      showUserMenuAlert,
      showUserMenuLogout,
      showUserMenuManagement,
      showUserMenuWhatsNew,
      themeMode,
      userMenu,
    ]);

    const projects = useMemo(() => {
      if (projectsCatalogAmount === 0) {
        return [];
      }

      if (organization?.id === '2') {
        return PROJECTS.slice(0, 1);
      }

      return args.select?.projects?.slice(0, projectsCatalogAmount);
    }, [args.select?.projects, organization?.id, projectsCatalogAmount]);

    return (
      <div className={styles.fullPageHeight}>
        <Header
          {...args}
          layoutType={layoutType}
          select={
            showSelect && args.select
              ? {
                  ...args.select,
                  projects,
                  selectedOrganization: organization,
                  projectsLoading: showProjectsLoading,
                  onOrganizationChange: setOrganization,
                }
              : undefined
          }
          pagePath={showPagePath ? args.pagePath : undefined}
          logo={logo}
          vendorLogo={showVendorLogo ? args.vendorLogo : undefined}
          settings={showSettings ? args.settings : undefined}
          onHelpMenuClick={showHelpMenu ? args.onHelpMenuClick : undefined}
          notifications={
            showNotifications && args.notifications
              ? {
                  ...args.notifications,
                  error: showNotificationError,
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
          userMenu={userMenuParams}
          organizations={orgs}
          drawerMenu={{
            ...args.drawerMenu,
            selectedLink,
            onLinkChange: setSelectedLink,
            links: showLinks ? args.drawerMenu.links : undefined,
            footerLinks: showFooterLinks ? args.drawerMenu.footerLinks : undefined,
            onMarketplaceBannerClick: showMarketplaceBanner ? () => undefined : undefined,
            onReferralBannerClick: showReferralBanner ? () => undefined : undefined,
            favorites: {
              value: favoriteItems,
              onChange: onFavoriteChange,
            },
            selectedProduct: product,
            onProductChange: setProduct,
            hideProductSelect: !showProductSelect,
          }}
        />
        <div id='single-spa-wrapper' className={styles.page}>
          {!(layoutType === 'mobile' || layoutType === 'desktopSmall') && (
            <PageServices
              title='Header'
              sidebar={{
                header: {
                  type: 'title',
                  label: 'Title',
                  icon: PlaceholderSVG,
                },
                items: [
                  {
                    label: 'item 1',
                    id: '1',
                  },
                  {
                    label: 'item 2',
                    id: '2',
                  },
                  {
                    label: 'item 3',
                    id: '3',
                  },
                ],
              }}
            />
          )}
        </div>
      </div>
    );
  };
}

export const ARGS: StoryProps = {
  showSelect: true,

  leaveOneOrganization: false,

  showVendorLogo: false,
  vendorLogo: {
    path: 'https://img.freepik.com/free-photo/beautiful-kitten-with-colorful-clouds_23-2150752964.jpg?w=1060&t=st=1727438409~exp=1727439009~hmac=f5b8aea828125647fb7d35bfab17b918f1ca233ac6f289ff07e3c2b00a834ed6',
    onClick: EMPTY_ON_CLICK,
    pageUrl: EMPTY_HREF,
  },

  customLogo: false,
  logoMode: 'prod',
  projectsCatalogAmount: PROJECTS.length,
  showProjectsLoading: false,
  select: {
    projects: PROJECTS,
    selectedProject: DEFAULT_PROJECT,
    projectAddButton: {
      onClick: () => {
        window.alert('PROJECT_ADD');
      },
    },
    projectsEmptyState: {
      icon: {
        icon: InfoFilledSVG,
        decor: true,
        appearance: 'primary',
      },
      description: `Здесь появятся проекты, как только администратор организации предоставит вам к ним доступ.\n\nКонтакты администратора: <контакты>`,
    },
    onPlatformChange() {},
    platformsFilter: {
      onChange() {},
      value: [],
      options: [
        {
          label: 'Evolution',
          value: 'Evolution',
          icon: <EvolutionSVG />,
          caption: '1',
        },
        {
          label: 'Advanced',
          value: 'Advanced',
          icon: <AdvancedSVG />,
          caption: '1',
        },
        {
          label: 'Облако VMware',
          value: 'VMware',
          icon: <VmwareSVG />,
          caption: '1',
        },
        {
          label: 'ML Space',
          value: 'mlspace',
          icon: <MlSpaceSVG />,
          caption: '1',
        },
      ],
    },
  },

  showPagePath: true,
  pagePath: [
    { id: 'home', label: 'Home', onClick: () => {} },
    { id: 'level-2', label: 'Level 2', onClick: () => {} },
    {
      id: 'level-3',
      label: 'Super-puper-duper-hyper-xxl-proMax crumb level 3',
      onClick: () => {},
    },
  ],

  financeButton: <PlaceholderSVG />,
  showSettings: true,

  settings: [
    {
      hidden: false,
      id: DIVIDER_SETTING_OPTION_ID,
    },
    {
      id: 'settings',
      label: 'Настройки организации',
      icon: <SettingsSVG />,
      onClick: e => {
        e?.preventDefault();
      },
      href: 'https://console.cloud.ru/projects/x/spa/administration',
      hidden: false,
    },
    { id: 'users', label: 'Пользователи', icon: <UsersSVG />, onClick: () => {} },
    { id: 'agreements', label: 'Договоры', icon: <DetalisationSVG />, onClick: () => {} },
    {
      hidden: false,
      id: DIVIDER_SETTING_OPTION_ID,
    },
    {
      hidden: false,
      id: DIVIDER_SETTING_OPTION_ID,
    },
    { id: 'settings', label: 'Настройки организации', icon: <SettingsSVG />, onClick: () => {}, hidden: true },
    { id: 'users', label: 'Пользователи', icon: <UsersSVG />, onClick: () => {}, hidden: true },
    { id: 'billing', label: 'Контроль затрат', icon: <CostControlSVG />, onClick: () => {} },
    {
      hidden: false,
      id: DIVIDER_SETTING_OPTION_ID,
    },
  ],

  showHelpMenu: true,
  onHelpMenuClick: () => {
    toaster.userAction.success({ label: 'Help menu clicked' });
  },

  showNotifications: true,
  showNotificationError: false,

  notifications: {
    count: 0,
    items: generateCards(8, true),
    readAll: () => {},
    loadCards: {
      fetchMore: () => new Promise(resolve => resolve(true)),
      hasMore: true,
    },
    onCardsRead() {},
    settings: {
      button: {
        icon: <SettingsSVG />,
        onClick: () => toaster.userAction.success({ label: 'Settings button clicked' }),
      },
    },
  },

  showUserMenu: true,
  showCustomUserMenu: false,
  showUserMenuManagement: true,

  showUserMenuWhatsNew: true,
  showUserMenuAlert: true,
  showUserMenuLogout: true,
  showOrganizationInvite: false,
  showOrganizationInvitePopover: false,
  showPartnerOrganization: false,
  showPartnerOrganizationPopover: false,
  userMenu: {
    user: DEFAULT_USER,
    indicator: 'green',
    onProfileManagementClick: () => {
      toaster.userAction.success({ label: 'Profile item clicked' });
    },
    onWhatsNewClick: () => {
      toaster.userAction.success({ label: "What's new item clicked" });
    },
    onLogout: () => {
      toaster.userAction.success({ label: 'Logout clicked' });
    },
    bottomAlert: {
      size: 's',
      appearance: 'info',
      icon: false,
      title: 'Реферальная программа',
      description: 'Зарабатывайте 15% на рекомендациях сервисов Cloud.ru',
      onClose: () => {},
      actions: {
        primary: {
          text: 'Подробнее',
          onClick: () => {},
        },
      },
    },
    topAlert: {
      size: 's',
      appearance: 'info',
      icon: true,
      description: 'Теперь проекты переключаются в меню навигации слева в шапке консоли',
      onClose: () => {},
    },
    selectedOrganization: {
      id: '1',
      name: 'Облачные технологии',
      type: 'CUSTOMER_TYPE_LEGAL',
    },
    onOrganizationAdd: () => {
      toaster.userAction.success({ label: 'Organization add clicked' });
    },
  },

  showAddOrganization: true,
  organizations: [{ id: '1', name: 'Облачные технологии', actions: PROJECT_ACTIONS, type: 'CUSTOMER_TYPE_LEGAL' }],

  showLinks: true,
  showFooterLinks: true,
  showMarketplaceBanner: true,
  showReferralBanner: true,
  showSinglePlatform: false,
  showProductSelect: true,
  drawerMenu: {
    allProducts: ALL_PRODUCTS_MULTI,
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
    selectedLink: 'vms',
    links: [
      {
        label: { text: 'Инфраструктура' },
        id: 'svpInfrastructure',
        items: [
          {
            id: 'vms',
            label: 'Виртуальные машины',
            onClick: EMPTY_ON_CLICK,
            href: EMPTY_HREF,
            icon: PlaceholderSVG,
            aliases: ['виртуальные машины', 'vm', 'virtual machine', 'виртмашины'],
          },
          {
            id: 'anti-affinity',
            label: 'Группы размещения',
            onClick: EMPTY_ON_CLICK,
            href: EMPTY_HREF,
            icon: PlaceholderSVG,
            aliases: ['группы размещения', 'placement groups'],
          },
          {
            id: 'images',
            label: 'Образы',
            onClick: EMPTY_ON_CLICK,
            href: EMPTY_HREF,
            icon: PlaceholderSVG,
            aliases: ['образы', 'шаблоны', 'images', 'ISO'],
          },
          {
            id: 'sshKeys',
            label: 'SSH-ключи',
            onClick: EMPTY_ON_CLICK,
            href: EMPTY_HREF,
            icon: PlaceholderSVG,
            aliases: ['ssh ключ', 'ssh keys', 'ключи доступа'],
          },
          {
            id: 'backups',
            label: 'Резервное копирование',
            onClick: EMPTY_ON_CLICK,
            href: EMPTY_HREF,
            icon: PlaceholderSVG,
            aliases: ['backup', 'бэкап', 'резервное копирование', 'восстановление', 'копия'],
          },
          {
            id: 'bareMetal',
            label: 'Bare Metal',
            onClick: EMPTY_ON_CLICK,
            href: EMPTY_HREF,
            icon: PlaceholderSVG,
            aliases: ['выделенные серверы', 'бэреметал', 'бареметал', 'железные серверы'],
          },
        ],
      },
      {
        label: { text: 'Сеть' },
        id: 'svpNetwork',
        items: [
          {
            id: 'subnets',
            label: 'Подсети',
            onClick: EMPTY_ON_CLICK,
            href: EMPTY_HREF,
            icon: PlaceholderSVG,
            aliases: ['подсеть', 'субнет', 'subnets', 'сеть'],
          },
          {
            id: 'vpc',
            label: 'VPC',
            onClick: EMPTY_ON_CLICK,
            href: EMPTY_HREF,
            icon: PlaceholderSVG,
            aliases: ['vpc', 'виртуальная сеть', 'virtual private cloud', 'виртуальный облачный контур'],
          },
          {
            id: 'publicIp',
            label: 'Публичные IP',
            onClick: EMPTY_ON_CLICK,
            href: EMPTY_HREF,
            icon: PlaceholderSVG,
            aliases: ['ip', 'публичный', 'внешний', 'floating'],
          },
          {
            id: 'gateways',
            label: 'sNAT-шлюзы',
            onClick: EMPTY_ON_CLICK,
            href: EMPTY_HREF,
            icon: PlaceholderSVG,
            badge: 'Preview',
            aliases: ['snat', 'шлюзы', 'gateways', 'гейтвей'],
          },
          {
            id: 'securityGroups',
            label: 'Группы безопасности',
            onClick: EMPTY_ON_CLICK,
            href: EMPTY_HREF,
            icon: PlaceholderSVG,
            aliases: ['группа безопасности', 'security group', 'firewall group'],
          },
          {
            id: 'loadBalancer',
            label: 'Балансировщик нагрузки',
            onClick: EMPTY_ON_CLICK,
            href: EMPTY_HREF,
            icon: PlaceholderSVG,
            badge: { text: 'New', appearance: 'pink' },
            aliases: ['балансировщик', 'load balancer', 'балансировка'],
          },
          {
            id: 'cloudDns',
            label: 'Cloud DNS',
            onClick: EMPTY_ON_CLICK,
            href: EMPTY_HREF,
            icon: PlaceholderSVG,
            aliases: ['cloud dns', 'облачный днс', 'dns в облаке'],
          },
          {
            id: 'dns',
            label: 'DNS',
            onClick: EMPTY_ON_CLICK,
            href: EMPTY_HREF,
            icon: PlaceholderSVG,
            aliases: ['dns', 'доменные имена', 'днс'],
          },
          {
            id: 'magicRouter',
            label: 'Magic Router',
            onClick: EMPTY_ON_CLICK,
            href: EMPTY_HREF,
            icon: PlaceholderSVG,
            aliases: ['magic router', 'магический маршрутизатор', 'маршрутизатор'],
          },
        ],
      },
      {
        label: {
          text: 'Хранение данных',
          onClick: () => undefined,
        },
        id: 'svpDataStorage',
        items: [
          {
            id: 'disks',
            label: 'Диски',
            onClick: EMPTY_ON_CLICK,
            href: EMPTY_HREF,
            icon: PlaceholderSVG,
            aliases: ['диск', 'disks', 'volume', 'хранилище', 'storage', 'volumes'],
          },
          {
            id: 's3',
            label: 'S3 Objective Storage',
            onClick: EMPTY_ON_CLICK,
            href: EMPTY_HREF,
            icon: PlaceholderSVG,
            aliases: ['object storage', 'объектное хранилище', 'облачное хранилище', 'bucket', 'бакет'],
          },
        ],
      },
      {
        label: { text: 'Контейнеры' },
        id: 'svpContainers',
        items: [
          {
            id: 'managedKubernetes',
            label: 'Managed Kubernetes',
            onClick: EMPTY_ON_CLICK,
            href: EMPTY_HREF,
            icon: PlaceholderSVG,
            aliases: ['managed k8s', 'управляемый кубернетес', 'kubernetes managed'],
          },
          {
            id: 'artifactRegistry',
            label: 'Artifact Registry',
            onClick: EMPTY_ON_CLICK,
            href: EMPTY_HREF,
            icon: PlaceholderSVG,
            aliases: ['артефакт', 'artifact registry', 'реестр', 'регистр', 'докер', 'docker-образ', 'debian'],
          },
          {
            id: 'containerApps',
            label: 'Container Apps',
            onClick: EMPTY_ON_CLICK,
            href: EMPTY_HREF,
            icon: PlaceholderSVG,
            aliases: ['контейнерные приложения', 'container apps', 'app контейнер', 'приложения контейнеры'],
          },
        ],
      },
      {
        label: { text: 'Разработка' },
        id: 'svpDevelopment',
        items: [
          {
            id: 'apiGateway',
            label: 'API gateway',
            onClick: EMPTY_ON_CLICK,
            href: EMPTY_HREF,
            icon: PlaceholderSVG,
            aliases: ['апи', 'api', 'шлюзы', 'гейтвей', 'маршрутизатор'],
          },
          {
            id: 'serverlessFunctions',
            label: 'Serverless functions',
            onClick: EMPTY_ON_CLICK,
            href: EMPTY_HREF,
            icon: PlaceholderSVG,
            aliases: ['функции без сервера', 'lambda', 'лямбда', 'serverless functions'],
          },
        ],
      },
      {
        label: { text: 'Брокеры сообщений' },
        id: 'svpBrokers',
        items: [
          {
            id: 'kafka',
            label: 'Managed Kafka®',
            onClick: EMPTY_ON_CLICK,
            href: EMPTY_HREF,
            icon: PlaceholderSVG,
            aliases: ['managed kafka', 'кафка'],
          },
          {
            id: 'corax',
            label: 'Managed Corax',
            onClick: EMPTY_ON_CLICK,
            href: EMPTY_HREF,
            icon: PlaceholderSVG,
            aliases: ['managed corax', 'брокер коракс'],
          },
        ],
      },
      {
        label: { text: 'Базы данных' },
        id: 'svpDatabases',
        items: [
          {
            id: 'postgreSQL',
            label: 'Managed PostgreSQL®',
            onClick: EMPTY_ON_CLICK,
            href: EMPTY_HREF,
            icon: PlaceholderSVG,
            aliases: ['postgresql', 'pgsql', 'постгрес'],
          },
          {
            id: 'timescaleDB',
            label: 'Managed TimescaleDB®',
            onClick: EMPTY_ON_CLICK,
            href: EMPTY_HREF,
            icon: PlaceholderSVG,
            aliases: ['документоориентированная бд', 'document db'],
          },
          {
            id: 'pangolin',
            label: 'Managed Pangolin',
            onClick: EMPTY_ON_CLICK,
            href: EMPTY_HREF,
            icon: PlaceholderSVG,
            aliases: ['панголин'],
          },
          {
            id: 'dataGrid',
            label: 'Managed DataGrid',
            onClick: EMPTY_ON_CLICK,
            href: EMPTY_HREF,
            icon: PlaceholderSVG,
            aliases: ['датагрид'],
          },
          {
            id: 'redis',
            label: 'Managed Redis®',
            onClick: EMPTY_ON_CLICK,
            href: EMPTY_HREF,
            icon: PlaceholderSVG,
            aliases: ['in-memory бд', 'редис'],
          },
          {
            id: 'clickhouse',
            label: 'Managed Clickhouse',
            onClick: EMPTY_ON_CLICK,
            href: EMPTY_HREF,
            icon: PlaceholderSVG,
            aliases: ['кликхаус'],
          },
          {
            id: 'openSearch',
            label: 'Managed OpenSearch',
            onClick: EMPTY_ON_CLICK,
            href: EMPTY_HREF,
            icon: PlaceholderSVG,
            aliases: ['open search'],
          },
          {
            id: 'search',
            label: 'Managed Search',
            onClick: EMPTY_ON_CLICK,
            href: EMPTY_HREF,
            icon: PlaceholderSVG,
            aliases: ['документоориентированная бд', 'document db'],
          },
        ],
      },
      {
        label: { text: 'Инструменты разработчика' },
        id: 'svpDevtools',
        items: [
          {
            id: 'repo',
            label: 'Repo',
            onClick: EMPTY_ON_CLICK,
            href: EMPTY_HREF,
            icon: PlaceholderSVG,
            aliases: ['репозиторий', 'git', 'хранение кода', 'codebase'],
          },
          {
            id: 'pipeline',
            label: 'Pipeline',
            onClick: EMPTY_ON_CLICK,
            href: EMPTY_HREF,
            icon: PlaceholderSVG,
            aliases: ['пайплайн', 'pipeline', 'ci cd', 'workflow', 'автоматизация'],
          },
        ],
      },
      {
        label: { text: 'Платформа данных' },
        id: 'svpDataPlatform',
        items: [
          {
            id: 'trino',
            label: 'Managed Trino',
            onClick: EMPTY_ON_CLICK,
            href: EMPTY_HREF,
            icon: PlaceholderSVG,
            aliases: ['sql engine', 'trino-db', 'трино'],
          },
          {
            id: 'metastore',
            label: 'Managed Metastore',
            onClick: EMPTY_ON_CLICK,
            href: EMPTY_HREF,
            icon: PlaceholderSVG,
            aliases: ['хранилище метаданных', 'метастор'],
          },
          {
            id: 'arenadata',
            label: 'Managed ArenadataDB',
            onClick: EMPTY_ON_CLICK,
            href: EMPTY_HREF,
            icon: PlaceholderSVG,
            aliases: ['greenplum', 'аналитика', 'аренадата'],
          },
          {
            id: 'spark',
            label: 'Managed Spark',
            onClick: EMPTY_ON_CLICK,
            href: EMPTY_HREF,
            icon: PlaceholderSVG,
            aliases: ['спарк'],
          },
          {
            id: 'bi',
            label: 'Managed BI',
            onClick: EMPTY_ON_CLICK,
            href: EMPTY_HREF,
            icon: PlaceholderSVG,
            aliases: ['аналитика', 'analytics', 'superset'],
          },
          {
            id: 'airflow',
            label: 'Managed Airflow',
            onClick: EMPTY_ON_CLICK,
            href: EMPTY_HREF,
            icon: PlaceholderSVG,
            aliases: ['оркестрация', 'задачи данных', 'эирфлоу'],
          },
        ],
      },
      {
        label: { text: 'ML/AI инструменты' },
        id: 'svpInference',
        items: [
          {
            id: 'inference',
            label: 'ML Inference',
            onClick: EMPTY_ON_CLICK,
            href: EMPTY_HREF,
            icon: PlaceholderSVG,
            aliases: ['ml inference', 'инференс', 'ai', 'hugging face', 'ollama'],
          },
          {
            id: 'notebooks',
            label: 'Notebooks',
            onClick: EMPTY_ON_CLICK,
            href: EMPTY_HREF,
            icon: PlaceholderSVG,
            aliases: ['блокноты', 'jupyter', 'ноутбуки'],
          },
          {
            id: 'foundationModels',
            label: 'Foundation Models',
            onClick: EMPTY_ON_CLICK,
            href: EMPTY_HREF,
            icon: PlaceholderSVG,
            aliases: ['модель', 'llm'],
          },
          {
            id: 'mlFinetuning',
            label: 'ML Finetuning',
            onClick: EMPTY_ON_CLICK,
            href: EMPTY_HREF,
            icon: PlaceholderSVG,
            aliases: ['lora', 'low-rank adaptation', 'лора', 'finetuning', 'дообучение'],
          },
        ],
      },
      {
        label: { text: 'ML/AI инструменты' },
        id: 'svpManagement',
        items: [
          {
            id: 'tasksHistory',
            label: 'История задач',
            onClick: EMPTY_ON_CLICK,
            href: EMPTY_HREF,
            icon: PlaceholderSVG,
            aliases: ['история задач', 'tasks history', 'log'],
          },
          {
            id: 'tags',
            label: 'Теги',
            onClick: EMPTY_ON_CLICK,
            href: EMPTY_HREF,
            icon: PlaceholderSVG,
            aliases: ['теги', 'labels', 'метки', 'tags'],
          },
          {
            id: 'sckm',
            label: 'Key Management',
            onClick: EMPTY_ON_CLICK,
            href: EMPTY_HREF,
            icon: PlaceholderSVG,
            aliases: ['key management', 'kms', 'управление ключами'],
          },
          {
            id: 'secretManager',
            label: 'Secret Management',
            onClick: EMPTY_ON_CLICK,
            href: EMPTY_HREF,
            icon: PlaceholderSVG,
            aliases: ['secret management', 'управляемые секреты', 'секрет менеджер'],
          },
        ],
      },
      {
        label: { text: 'Гибридные сервисы' },
        id: 'svpHybrid',
        items: [
          {
            id: 'vmManager',
            label: 'Управление ПО',
            onClick: EMPTY_ON_CLICK,
            href: EMPTY_HREF,
            icon: PlaceholderSVG,
            aliases: ['управление программным обеспечением', 'менеджер ПО'],
          },
          {
            id: 'vcenterManager',
            label: 'Платформы виртуализации',
            onClick: EMPTY_ON_CLICK,
            href: EMPTY_HREF,
            icon: PlaceholderSVG,
            aliases: [
              'vcenter manager',
              'платформы виртуализации',
              'менеджер виртуализации',
              'VMware',
              'virtualization platform',
            ],
          },
          {
            id: 'vcenterVM',
            label: 'ВМ платформ виртуализации',
            onClick: EMPTY_ON_CLICK,
            href: EMPTY_HREF,
            icon: PlaceholderSVG,
            aliases: ['виртуальная машина', 'vm vcenter', 'вм платформы', 'виртуализация vm'],
          },
          {
            id: 'basisVM',
            label: 'ВМ Базис IaaS',
            onClick: EMPTY_ON_CLICK,
            href: EMPTY_HREF,
            icon: PlaceholderSVG,
            aliases: ['вм базис', 'iaas vm', 'базис иаас', 'basis iaas'],
          },
          {
            id: 'edgeManager',
            label: 'Edge',
            onClick: EMPTY_ON_CLICK,
            href: EMPTY_HREF,
            icon: PlaceholderSVG,
            aliases: ['эдж'],
          },
        ],
      },
    ],
  },
  homePageUrl: 'https://console.cloud.ru',
};

export const ARG_TYPES: Partial<ArgTypes<StoryProps>> = {
  customLogo: { name: '[Story: show custom logo with loading', type: 'boolean' },
  logoMode: { name: '[Story]: logo modes', control: { type: 'radio' }, options: Object.values(HEADER_LOGO_MODE) },

  showVendorLogo: { name: '[Story]: show vendor logo', type: 'boolean' },

  vendorLogo: {
    name: 'vendorLogo',
    if: { arg: 'showVendorLogo', eq: true },
  },

  showSelect: { name: '[Story]: show header select', type: 'boolean' },
  select: { table: { disable: true } },

  projectsCatalogAmount: {
    name: '[Story]: projects catalogs amount',
    type: 'number',
    control: { type: 'range', min: 0, max: PROJECTS.length },
  },

  showProjectsLoading: {
    name: '[Story]: projects loading state',
    type: 'boolean',
  },

  showNotificationError: { name: '[Story]: show notifications -> show error', type: 'boolean' },

  showPagePath: { name: '[Story]: show page path', type: 'boolean' },
  pagePath: { table: { disable: true } },

  leaveOneOrganization: { name: '[Story]: Leave one organization ', type: 'boolean' },

  showSettings: { name: '[Story]: show settings menu', type: 'boolean' },
  settings: { table: { disable: true } },

  showHelpMenu: { name: '[Story]: show help menu', type: 'boolean' },
  onHelpMenuClick: { table: { disable: true } },

  showNotifications: { name: '[Story]: show notifications', type: 'boolean' },
  notifications: { table: { disable: true } },

  showUserMenu: { name: '[Story]: show user menu', type: 'boolean' },
  showCustomUserMenu: {
    name: '[Story]: show user menu -> custom user menu',
    type: 'boolean',
    if: { arg: 'showUserMenu', eq: true },
  },
  userMenu: { table: { disable: true } },
  showUserMenuManagement: {
    name: '[Story]: show user menu -> profile management',
    type: 'boolean',
    if: { arg: 'showUserMenu', eq: true },
  },

  showUserMenuWhatsNew: {
    name: '[Story]: show user menu -> whats new',
    type: 'boolean',
    if: { arg: 'showUserMenu', eq: true },
  },

  showUserMenuAlert: {
    name: '[Story]: show user menu -> alert',
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

  showPartnerOrganization: {
    name: '[Story]: show partner organization badge and counter',
  },
  showPartnerOrganizationPopover: {
    name: '[Story]: show partner organization popover',
  },

  organizations: { table: { disable: true } },

  showLinks: { name: '[Story]: show drawer -> links', type: 'boolean' },
  showFooterLinks: { name: '[Story]: show drawer -> footer links', type: 'boolean' },
  showMarketplaceBanner: {
    name: '[Story]: show drawer -> marketplace banner',
    type: 'boolean',
    if: { arg: 'showReferralBanner', eq: true },
  },
  showReferralBanner: { name: '[Story]: show drawer -> referral banner', type: 'boolean' },
  drawerMenu: { table: { disable: true } },
  showSinglePlatform: { name: '[Story]: show drawer -> single platform', type: 'boolean' },
  showProductSelect: {
    name: '[Story]: show drawer -> product select',
    type: 'boolean',
  },
};
