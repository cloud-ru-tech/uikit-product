import {
  Advanced2ServiceSVG,
  AdvancedServiceSVG,
  AiMarketplaceServiceSVG,
  AiServiceSVG,
  ArtefactServiceSVG,
  AutoMlServiceSVG,
  BucketInterfaceSVG,
  ChristofariServiceSVG,
  CircleCheckOutlineInterfaceSVG,
  DataCatalogServiceSVG,
  DataHubServiceSVG,
  DatasetServiceSVG,
  DataTransferServiceSVG,
  DeploymentServiceSVG,
  DockerRegistryServiceSVG,
  EnviromentsServiceSVG,
  EnvironmentTaskServiceSVG,
  ExperimentServiceSVG,
  FavouriteServiceSVG,
  GitlabServiceSVG,
  HomeInterfaceSVG,
  JupiterServerServiceSVG,
  MlSpaceServiceSVG,
  ModelRegistryServiceSVG,
  ModelsMonitoringServiceSVG,
  MonitoringServiceSVG,
  MyDeploymentsServiceSVG,
  MyImagesServiceSVG,
  Pipelines2ServiceSVG,
  PlusSquareInterfaceSVG,
  ProjectDisplaySVG,
  SettingsInterfaceSVG,
  SupportInterfaceSVG,
  TimeInterfaceSVG,
  ViewTableInterfaceSVG,
  ViewTileInterfaceSVG,
} from '@sbercloud/uikit-product-icons';

import { Sidebar, SidebarItemProps, SidebarItemsGroup } from '../../src';

export const menuList: SidebarItemsGroup[] = [
  {
    items: [
      {
        id: 'main',
        label: 'Главная',
        href: '/',
        icon: <HomeInterfaceSVG />,
      },
    ],
  },
  {
    heading: 'Платформы',
    items: [
      {
        id: 'main-advanced',
        label: 'Advanced',
        href: '/',
        icon: <AdvancedServiceSVG />,
      },
      {
        id: 'main-enterprise',
        label: 'Enterprise',
        href: '/',
        icon: <ChristofariServiceSVG />,
      },
      {
        id: 'main-mlspace',
        label: 'ML Space',
        href: '/',
        icon: <MlSpaceServiceSVG />,
        nestedList: [
          {
            items: [
              {
                id: 'main-Data-Catalog',
                label: 'Data Catalog',
                mode: Sidebar.listModes.Accordion,
                icon: <DataCatalogServiceSVG />,
                nestedList: [
                  {
                    items: [
                      {
                        id: 'file-manager',
                        label: 'Хранилище S3',
                        href: '/',
                        icon: <BucketInterfaceSVG />,
                      },
                      {
                        id: 'first-level-nested 1.2',
                        label: 'Data Transfer Service',
                        href: '/',
                        icon: <DataTransferServiceSVG />,
                        mode: Sidebar.listModes.Accordion,
                        nestedList: [
                          {
                            items: [
                              {
                                id: 'first-level-nested 1.2.3',
                                label: 'Элемент 3 уровня с очень длинным названием',
                                href: '/',
                                icon: <Advanced2ServiceSVG />,
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                id: 's2-1',
                label: 'Environments',
                mode: Sidebar.listModes.Accordion,
                icon: <EnviromentsServiceSVG />,
                nestedList: [
                  {
                    items: [
                      {
                        id: 's2-1-1',
                        label: 'Jupiter Servers',
                        href: '/',
                        icon: <JupiterServerServiceSVG />,
                      },
                      {
                        id: 's2-1-2',
                        label: 'Gitlab CI',
                        href: '/',
                        icon: <GitlabServiceSVG />,
                      },
                      {
                        id: 's2-1-3',
                        label: 'Задачи и окружения',
                        href: '/',
                        icon: <EnvironmentTaskServiceSVG />,
                      },
                      {
                        id: 's2-1-4',
                        label: 'Мониторинг',
                        href: '/',
                        icon: <MonitoringServiceSVG />,
                      },
                      {
                        id: 's2-1-5',
                        label: 'Эксперементы',
                        href: '/',
                        icon: <ExperimentServiceSVG />,
                      },
                    ],
                  },
                ],
              },
              {
                id: 's3-1',
                label: 'Deployments',
                mode: Sidebar.listModes.Accordion,
                icon: <DeploymentServiceSVG />,
                nestedList: [
                  {
                    items: [
                      {
                        id: 's3-1-1',
                        label: 'Деплои',
                        href: '/',
                        icon: <MyDeploymentsServiceSVG />,
                      },
                      {
                        id: 's3-1-2',
                        label: 'Образы',
                        href: '/',
                        icon: <MyImagesServiceSVG />,
                      },
                    ],
                  },
                ],
              },
              {
                id: 's4-1',
                label: 'Artifact Registry',
                mode: Sidebar.listModes.Accordion,
                icon: <ArtefactServiceSVG />,
                nestedList: [
                  {
                    items: [
                      {
                        id: 's4-1-1',
                        label: 'Обзор',
                        href: '/',
                        icon: <ViewTileInterfaceSVG />,
                      },
                      {
                        id: 's4-1-2',
                        label: 'Docker Registry',
                        href: '/',
                        icon: <DockerRegistryServiceSVG />,
                      },
                      {
                        id: 's4-1-3',
                        label: 'Model Registry',
                        href: '/',
                        icon: <ModelRegistryServiceSVG />,
                      },
                      {
                        id: 's4-1-4',
                        label: 'Dataset Registry',
                        href: '/',
                        icon: <DatasetServiceSVG />,
                      },
                    ],
                  },
                ],
              },
              {
                id: 's5-1',
                label: 'AutoML',
                href: '/',
                icon: <AutoMlServiceSVG />,
              },
              {
                id: 's6-1',
                label: 'Pipelines',
                mode: Sidebar.listModes.Accordion,
                icon: <Pipelines2ServiceSVG />,
                nestedList: [
                  {
                    items: [
                      {
                        id: 's6-1-1',
                        label: 'Пайплайны',
                        href: '/',
                        icon: <Pipelines2ServiceSVG />,
                      },
                      {
                        id: 's6-1-2',
                        label: 'История запусков',
                        href: '/',
                        icon: <TimeInterfaceSVG />,
                      },
                    ],
                  },
                ],
              },
              {
                id: 's7-1',
                label: 'AI Marketplaces',
                mode: Sidebar.listModes.Accordion,
                icon: <AiMarketplaceServiceSVG />,
                nestedList: [
                  {
                    items: [
                      {
                        id: 's7-1-1',
                        label: 'Datahub',
                        href: '/',
                        icon: <DataHubServiceSVG />,
                      },
                      {
                        id: 's7-1-2',
                        label: 'AI Services',
                        href: '/',
                        icon: <AiServiceSVG />,
                      },
                      {
                        id: 's7-1-3',
                        label: 'Мой контент',
                        href: '/',
                        icon: <ViewTableInterfaceSVG />,
                      },
                      {
                        id: 's7-1-4',
                        label: 'Кабинет продавца',
                        href: '/',
                        icon: <PlusSquareInterfaceSVG />,
                      },
                      {
                        id: 's7-1-5',
                        label: 'Модерация',
                        href: '/',
                        icon: <CircleCheckOutlineInterfaceSVG />,
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'main-standart',
        label: 'SVP',
        href: '/',
        icon: <MyImagesServiceSVG />,
        disabled: true,
      },
    ],
  },
  {
    heading: 'Другие услуги',
    items: [
      {
        id: 'first-level 2-1',
        label: 'Общие сервисы платформ',
        href: '/',
        icon: <ModelsMonitoringServiceSVG />,
      },
      {
        id: 'first-level 2-2',
        label: 'Специально для вас',
        href: '/',
        icon: <FavouriteServiceSVG />,
        locked: true,
      },
      {
        id: 'first-level 2-3',
        label: 'Маркетплейс AI Services',
        href: '/',
        icon: <AiMarketplaceServiceSVG />,
        showNewLabel: true,
      },
    ],
  },
];

export const footerItems: SidebarItemProps[] = [
  {
    id: 'footer first',
    label: 'Администрирование',
    href: '/',
    icon: <ProjectDisplaySVG />,
  },
  {
    id: 'footer second',
    label: 'Поддержка',
    href: '/',
    icon: <SupportInterfaceSVG />,
  },
  {
    id: 'footer third',
    label: 'Настройки',
    href: '/',
    icon: <SettingsInterfaceSVG />,
  },
];
