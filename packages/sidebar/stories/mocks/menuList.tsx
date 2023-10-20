import {
  AdvancedServiceSVG,
  AiMarketplaceServiceSVG,
  AiServiceSVG,
  ArtefactServiceSVG,
  AutoMlServiceSVG,
  BucketInterfaceSVG,
  ChristofariServiceSVG,
  CircleCheckOutlineInterfaceSVG,
  ConnectorsServiceSVG,
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
  TransferHistoryServiceSVG,
  TransferRuleServiceSVG,
  ViewTableInterfaceSVG,
  ViewTileInterfaceSVG,
} from '@sbercloud/uikit-product-icons';

import { Sidebar, SidebarItem, SidebarItemsGroup } from '../../src';

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
        status: Sidebar.itemStatuses.Active,
      },
      {
        id: 'main-enterprise',
        label: 'Enterprise',
        href: '/',
        icon: <ChristofariServiceSVG />,
        status: Sidebar.itemStatuses.Suspended,
        count: 5,
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
                id: 'main-data-catalog',
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
                        id: 'data-transfer-service',
                        label: 'Data Transfer Service',
                        href: '/',
                        icon: <DataTransferServiceSVG />,
                        mode: Sidebar.listModes.Accordion,
                        nestedList: [
                          {
                            items: [
                              {
                                id: 'connectors',
                                label: 'Коннекторы',
                                href: '/',
                                icon: <ConnectorsServiceSVG />,
                              },
                              {
                                id: 'transfer-rules',
                                label: 'Правила переносов',
                                href: '/',
                                icon: <TransferRuleServiceSVG />,
                              },
                              {
                                id: 'transfer-history',
                                label: 'История переносов',
                                href: '/',
                                icon: <TransferHistoryServiceSVG />,
                              },
                            ],
                          },
                        ],
                      },
                      {
                        id: 'artifact-registry',
                        label: 'Artifact Registry',
                        mode: Sidebar.listModes.Accordion,
                        icon: <ArtefactServiceSVG />,
                        nestedList: [
                          {
                            items: [
                              {
                                id: 'review',
                                label: 'Обзор',
                                href: '/',
                                icon: <ViewTileInterfaceSVG />,
                              },
                              {
                                id: 'docker-registry',
                                label: 'Docker Registry',
                                href: '/',
                                icon: <DockerRegistryServiceSVG />,
                              },
                              {
                                id: 'model-registry',
                                label: 'Model Registry',
                                href: '/',
                                icon: <ModelRegistryServiceSVG />,
                              },
                              {
                                id: 'dataset-registry',
                                label: 'Dataset Registry',
                                href: '/',
                                icon: <DatasetServiceSVG />,
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
                id: 'environments',
                label: 'Environments',
                mode: Sidebar.listModes.Accordion,
                icon: <EnviromentsServiceSVG />,
                nestedList: [
                  {
                    items: [
                      {
                        id: 'jupiter-servers',
                        label: 'Jupiter Servers',
                        href: '/',
                        icon: <JupiterServerServiceSVG />,
                      },
                      {
                        id: 'gitlab-ci',
                        label: 'Gitlab CI',
                        href: '/',
                        icon: <GitlabServiceSVG />,
                      },
                      {
                        id: 'tasks-and-environments',
                        label: 'Задачи и окружения',
                        href: '/',
                        icon: <EnvironmentTaskServiceSVG />,
                      },
                      {
                        id: 'monitoring',
                        label: 'Мониторинг',
                        href: '/',
                        icon: <MonitoringServiceSVG />,
                      },
                      {
                        id: 'experiments',
                        label: 'Эксперементы',
                        href: '/',
                        icon: <ExperimentServiceSVG />,
                      },
                    ],
                  },
                ],
              },
              {
                id: 'deployments',
                label: 'Deployments',
                mode: Sidebar.listModes.Accordion,
                icon: <DeploymentServiceSVG />,
                nestedList: [
                  {
                    items: [
                      {
                        id: 'deploys',
                        label: 'Деплои',
                        href: '/',
                        icon: <MyDeploymentsServiceSVG />,
                      },
                      {
                        id: 'images',
                        label: 'Образы',
                        href: '/',
                        icon: <MyImagesServiceSVG />,
                      },
                    ],
                  },
                ],
              },
              {
                id: 'auto-ml',
                label: 'AutoML',
                href: '/',
                icon: <AutoMlServiceSVG />,
              },
              {
                id: 'pipelines',
                label: 'Pipelines',
                mode: Sidebar.listModes.Accordion,
                icon: <Pipelines2ServiceSVG />,
                nestedList: [
                  {
                    items: [
                      {
                        id: 'pipelines-inner',
                        label: 'Пайплайны',
                        href: '/',
                        icon: <Pipelines2ServiceSVG />,
                      },
                      {
                        id: 'launch-history',
                        label: 'История запусков',
                        href: '/',
                        icon: <TimeInterfaceSVG />,
                      },
                    ],
                  },
                ],
              },
              {
                id: 'ai-marketplace',
                label: 'AI Marketplaces',
                mode: Sidebar.listModes.Accordion,
                icon: <AiMarketplaceServiceSVG />,
                nestedList: [
                  {
                    items: [
                      {
                        id: 'datahub',
                        label: 'Datahub',
                        href: '/',
                        icon: <DataHubServiceSVG />,
                      },
                      {
                        id: 'ai-services',
                        label: 'AI Services',
                        href: '/',
                        icon: <AiServiceSVG />,
                      },
                      {
                        id: 'my-content',
                        label: 'Мой контент',
                        href: '/',
                        icon: <ViewTableInterfaceSVG />,
                      },
                      {
                        id: 'seller-profile',
                        label: 'Кабинет продавца',
                        href: '/',
                        icon: <PlusSquareInterfaceSVG />,
                      },
                      {
                        id: 'moderation',
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
        id: 'main-slide',
        label: 'Other Slide Item',
        href: '/',
        icon: <ChristofariServiceSVG />,
        nestedList: [
          {
            items: [
              {
                id: 'main-slide-child-1',
                label: 'Slide Item 1',
                href: '/',
                icon: <ChristofariServiceSVG />,
              },
              {
                id: 'main-slide-child-2',
                label: 'Slide Item 2',
                mode: Sidebar.listModes.Accordion,
                icon: <ChristofariServiceSVG />,
                nestedList: [
                  {
                    items: [
                      {
                        id: 'main-slide-child-3',
                        label: 'Slide Item 3',
                        href: '/',
                        icon: <ChristofariServiceSVG />,
                      },
                      {
                        id: 'main-slide-child-4',
                        label: 'Slide Item 4',
                        href: '/',
                        icon: <ChristofariServiceSVG />,
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
        id: 'main-svp',
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
        id: 'common-platform-services',
        label: 'Общие сервисы платформ',
        href: '/',
        icon: <ModelsMonitoringServiceSVG />,
        count: 3,
      },
      {
        id: 'special-for-you',
        label: 'Специально для вас',
        href: '/',
        icon: <FavouriteServiceSVG />,
        locked: true,
      },
      {
        id: 'marketplace-ai-services',
        label: 'Маркетплейс AI Services',
        href: '/',
        icon: <AiMarketplaceServiceSVG />,
        labelText: 'Новый',
      },
    ],
  },
];

export const footerItems: SidebarItem[] = [
  {
    id: 'administration',
    label: 'Администрирование',
    href: '/',
    icon: <ProjectDisplaySVG />,
  },
  {
    id: 'support',
    label: 'Поддержка',
    href: '/',
    icon: <SupportInterfaceSVG />,
  },
  {
    id: 'settings',
    label: 'Настройки',
    href: '/',
    icon: <SettingsInterfaceSVG />,
  },
];
