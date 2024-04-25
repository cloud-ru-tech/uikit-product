import { Meta, StoryFn } from '@storybook/react';
import { HeaderProps } from 'page-layout/src/components/PrivateSidebar/types';
import { MouseEvent, useMemo, useState } from 'react';

import { StarSVG } from '@sbercloud/uikit-product-icons';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { PageServices, PageServicesProps } from '../src/components';
import { HeadlineActions } from './components/HeadlineActions';
import styles from './styles.module.scss';

export default {
  title: 'Snack UIkit/Page Layout/Page Services',
  component: PageServices,
} as Meta;

const getSidebarProps = ({
  type,
  selected,
  setSelected,
}: {
  type: 'title' | 'back' | 'headless' | 'none';
  selected: number;
  setSelected: (id: number) => void;
}): PageServicesProps['sidebar'] | undefined =>
  type !== 'none'
    ? {
        header: {
          title: { type: 'title', label: 'Some service with long-long title', icon: StarSVG },
          back: {
            type: 'back',
            label: 'Some Service',
            href: 'https://cloud.ru',
            onClick: (e: MouseEvent<HTMLElement>) => e.preventDefault(),
          },
          headless: undefined,
          none: undefined,
        }[type] as HeaderProps,
        documentation: {
          href: 'https://cloud.ru',
          target: '_blank',
        },
        selected,
        onSelect: setSelected,
        items: [
          { id: 0, label: 'Инстансы' },
          { id: 1, label: 'Мониторинг' },
          { id: 2, label: 'Администрирование' },
          { id: 3, label: 'Сеть' },
          { id: 4, label: 'Инстансы' },
          { id: 5, label: 'Мониторинг' },
          { id: 6, label: 'Администрирование' },
          { id: 7, label: 'Сеть' },
          { id: 8, label: 'Пункт с очень-очень длинным названием' },
          { id: 9, label: 'Инстансы' },
          { id: 10, label: 'Мониторинг' },
          { id: 11, label: 'Администрирование' },
          { id: 12, label: 'Сеть' },
          { id: 13, label: 'Инстансы' },
          { id: 14, label: 'Мониторинг' },
          { id: 15, label: 'Администрирование' },
          { id: 16, label: 'Сеть' },
        ],
        pageContainerId: 'pageContainer',
      }
    : undefined;

const Template: StoryFn<
  PageServicesProps & {
    sidebarType: 'none' | 'title' | 'back';
    showActions: boolean;
    showIcons: boolean;
  }
> = ({ sidebarType, showActions, ...args }) => {
  const [selected, setSelected] = useState(0);
  const sidebar = useMemo(() => getSidebarProps({ type: sidebarType, selected, setSelected }), [sidebarType, selected]);

  return (
    <div id='single-spa-page' className={styles.fullPageHeight}>
      <PageServices {...args} sidebar={sidebar} actions={showActions ? args.actions : null}>
        {Array(15)
          .fill(null)
          .map((_, i) => (
            <div key={i}>
              <h3>Headline {i}</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta dignissimos hic id iste magni molestiae
                officiis perferendis qui quibusdam sit?
              </p>
            </div>
          ))}
      </PageServices>
    </div>
  );
};

export const pageServices = Template.bind({});

pageServices.args = {
  title: 'Lorem ipsum dolor',
  actions: <HeadlineActions />,
  sidebarType: 'title',
  showActions: true,
};

pageServices.argTypes = {
  sidebarType: {
    name: '[Stories]: show sidebar',
    control: { type: 'select' },
    options: ['none', 'title', 'back', 'headless'],
  },
  showActions: { name: '[Stories]: show headline actions' },
  sidebar: { table: { disable: true } },
  actions: { table: { disable: true } },
  children: { table: { disable: true } },
};

pageServices.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  packageName: componentPackage.name,
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/SZjPEs7Ac3a2wS0HapamrE/Product-components?node-id=2%3A17574&mode=dev',
  },
  layout: 'fullscreen',
};
