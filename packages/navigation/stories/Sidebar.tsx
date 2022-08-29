import { styled } from '@linaria/react';
import { Meta, Story } from '@storybook/react/types-6-0';
import SvgMlSpaceLogo from 'icons/src/components/logo-icons/MlSpaceLogo';
import { MouseEvent, useEffect, useState } from 'react';

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

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Sidebar, SidebarItemId, SidebarProps } from '../src/components';

export default {
  title: 'Not stable/Navigation/Sidebar',
  component: Sidebar,
} as Meta;

const Wrap = styled.div`
  height: 800px;
`;

const Template: Story<SidebarProps> = ({ selected, ...args }) => {
  const [selectedItem, setSelectedItem] = useState<SidebarItemId | undefined>(selected);

  useEffect(() => {
    setSelectedItem(selected);
  }, [selected]);

  const handleItemClick = (e: MouseEvent, id: string | number) => {
    setSelectedItem(id);
  };

  const handleBackClick = () => {
    setSelectedItem(undefined);
  };

  return (
    <Wrap>
      <Sidebar {...args} selected={selectedItem} onItemClick={handleItemClick} onBackClick={handleBackClick} />
    </Wrap>
  );
};

export const sidebar = Template.bind({});
sidebar.args = {
  selected: 'main-advanced',
  list: [
    {
      items: [
        {
          id: 'main',
          text: 'Главная',
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
          text: 'Advanced',
          href: '/',
          icon: <AdvancedServiceSVG />,
        },
        {
          id: 'main-enterprise',
          text: 'Enterprise',
          href: '/',
          icon: <ChristofariServiceSVG />,
        },
        {
          id: 'main-mlspace',
          text: 'ML Space',
          href: '/',
          icon: <SvgMlSpaceLogo />,
          nestedList: [
            {
              items: [
                {
                  id: 'main-Data-Catalog',
                  text: 'Data Catalog',
                  mode: Sidebar.listModes.Accordion,
                  icon: <DataCatalogServiceSVG />,
                  nestedList: [
                    {
                      items: [
                        {
                          id: 'file-manager',
                          text: 'Хранилище S3',
                          href: '/',
                          icon: <BucketInterfaceSVG />,
                        },
                        {
                          id: 'first-level-nested 1.2',
                          text: 'Data Transfer Service',
                          href: '/',
                          icon: <DataTransferServiceSVG />,
                          mode: Sidebar.listModes.Accordion,
                          nestedList: [
                            {
                              items: [
                                {
                                  id: 'first-level-nested 1.2.3',
                                  text: 'Элемент 3 уровня',
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
              ],
            },
            {
              items: [
                {
                  id: 's2-1',
                  text: 'Environments',
                  mode: Sidebar.listModes.Accordion,
                  icon: <EnviromentsServiceSVG />,
                  nestedList: [
                    {
                      items: [
                        {
                          id: 's2-1-1',
                          text: 'Jupiter Servers',
                          href: '/',
                          icon: <JupiterServerServiceSVG />,
                        },
                        {
                          id: 's2-1-2',
                          text: 'Gitlab CI',
                          href: '/',
                          icon: <GitlabServiceSVG />,
                        },
                        {
                          id: 's2-1-3',
                          text: 'Задачи и окружения',
                          href: '/',
                          icon: <EnvironmentTaskServiceSVG />,
                        },
                        {
                          id: 's2-1-4',
                          text: 'Мониторинг',
                          href: '/',
                          icon: <MonitoringServiceSVG />,
                        },
                        {
                          id: 's2-1-5',
                          text: 'Эксперементы',
                          href: '/',
                          icon: <ExperimentServiceSVG />,
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              items: [
                {
                  id: 's3-1',
                  text: 'Deployments',
                  mode: Sidebar.listModes.Accordion,
                  icon: <DeploymentServiceSVG />,
                  nestedList: [
                    {
                      items: [
                        {
                          id: 's3-1-1',
                          text: 'Деплои',
                          href: '/',
                          icon: <MyDeploymentsServiceSVG />,
                        },
                        {
                          id: 's3-1-2',
                          text: 'Образы',
                          href: '/',
                          icon: <MyImagesServiceSVG />,
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              items: [
                {
                  id: 's4-1',
                  text: 'Artifact Registry',
                  mode: Sidebar.listModes.Accordion,
                  icon: <ArtefactServiceSVG />,
                  nestedList: [
                    {
                      items: [
                        {
                          id: 's4-1-1',
                          text: 'Обзор',
                          href: '/',
                          icon: <ViewTileInterfaceSVG />,
                        },
                        {
                          id: 's4-1-2',
                          text: 'Docker Registry',
                          href: '/',
                          icon: <DockerRegistryServiceSVG />,
                        },
                        {
                          id: 's4-1-3',
                          text: 'Model Registry',
                          href: '/',
                          icon: <ModelRegistryServiceSVG />,
                        },
                        {
                          id: 's4-1-4',
                          text: 'Dataset Registry',
                          href: '/',
                          icon: <DatasetServiceSVG />,
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              items: [
                {
                  id: 's5-1',
                  text: 'AutoML',
                  href: '/',
                  icon: <AutoMlServiceSVG />,
                },
              ],
            },
            {
              items: [
                {
                  id: 's6-1',
                  text: 'Pipelines',
                  mode: Sidebar.listModes.Accordion,
                  icon: <Pipelines2ServiceSVG />,
                  nestedList: [
                    {
                      items: [
                        {
                          id: 's6-1-1',
                          text: 'Пайплайны',
                          href: '/',
                          icon: <Pipelines2ServiceSVG />,
                        },
                        {
                          id: 's6-1-2',
                          text: 'История запусков',
                          href: '/',
                          icon: <TimeInterfaceSVG />,
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              items: [
                {
                  id: 's7-1',
                  text: 'AI Marketplaces',
                  mode: Sidebar.listModes.Accordion,
                  icon: <AiMarketplaceServiceSVG />,
                  nestedList: [
                    {
                      items: [
                        {
                          id: 's7-1-1',
                          text: 'Datahub',
                          href: '/',
                          icon: <DataHubServiceSVG />,
                        },
                        {
                          id: 's7-1-2',
                          text: 'AI Services',
                          href: '/',
                          icon: <AiServiceSVG />,
                        },
                        {
                          id: 's7-1-3',
                          text: 'Мой контент',
                          href: '/',
                          icon: <ViewTableInterfaceSVG />,
                        },
                        {
                          id: 's7-1-4',
                          text: 'Кабинет продавца',
                          href: '/',
                          icon: <PlusSquareInterfaceSVG />,
                        },
                        {
                          id: 's7-1-5',
                          text: 'Модерация',
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
          text: 'SVP',
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
          text: 'Общие сервисы платформ',
          href: '/',
          icon: <ModelsMonitoringServiceSVG />,
        },
        {
          id: 'first-level 2-2',
          text: 'Специально для вас',
          href: '/',
          icon: <FavouriteServiceSVG />,
          isLocked: true,
        },
        {
          id: 'first-level 2-3',
          text: 'Маркетплейс AI Services',
          href: '/',
          icon: <AiMarketplaceServiceSVG />,
          isNew: true,
        },
      ],
    },
  ],
  footerItems: [
    {
      id: 'footer first',
      text: 'Администрирование',
      href: '/',
      icon: <ProjectDisplaySVG />,
    },
    {
      id: 'footer second',
      text: 'Поддержка',
      href: '/',
      icon: <SupportInterfaceSVG />,
    },
    {
      id: 'footer third',
      text: 'Настройки',
      href: '/',
      icon: <SettingsInterfaceSVG />,
    },
  ],
};
sidebar.argTypes = {};
sidebar.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/gCc4XarYocwWbficnQPInC/%F0%9F%93%9A-%5BLIB%5D-Platform-DS%E3%83%BBComponents?node-id=802%3A0',
  },
};
