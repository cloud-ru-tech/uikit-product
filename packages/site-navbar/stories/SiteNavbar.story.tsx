import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useCallback, useMemo, useState } from 'react';

import { PlaceholderSVG } from '@sbercloud/uikit-product-icons';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { SiteNavbar, SiteNavbarProps } from '../src';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Site/Navbar',
  component: SiteNavbar,
};
export default meta;

const sampleItems = [
  {
    id: 'other',
    text: 'Другое',
    icon: <PlaceholderSVG />,
  },
  {
    id: 'advantages',
    text: 'Преимущества',
  },
  {
    id: 'rates',
    text: 'Тарифы',
    disabled: true,
  },
  {
    id: 'scenarios',
    text: 'Сценарии',
  },
  {
    id: 'graphic-accelerators',
    text: 'Графические ускорители',
  },
  {
    id: 'efficiency',
    text: 'Эффективность',
  },
  {
    id: 'possibilities',
    text: 'Возможности',
  },
  {
    id: 'faq',
    text: 'FAQ',
  },
  {
    id: 'webinars',
    text: 'Вебинары',
  },
  {
    id: 'articles',
    text: 'Статьи',
  },
  {
    id: 'stories',
    text: 'Истории',
  },
];

const Template: StoryFn<SiteNavbarProps> = ({ ...args }) => {
  const [selectedItem, setSelectedItem] = useState<string>('advantages');

  const handleClick = useCallback((itemId: string) => () => setSelectedItem(itemId), []);

  const items = useMemo(
    () =>
      sampleItems.map(item => ({
        ...item,
        checked: item.id === selectedItem,
        handleClick: handleClick(item.id),
      })),
    [handleClick, selectedItem],
  );

  return (
    <div className={styles.resizeWrapper}>
      <SiteNavbar {...args} items={items} className={styles.customBackground} />
    </div>
  );
};

export const navbar: StoryObj<SiteNavbarProps> = {
  render: Template,
  args: {},
  argTypes: {},
  parameters: {
    readme: {
      sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
    },
    packageName: componentPackage.name,
    design: {
      name: 'Figma',
      type: 'figma',
      url: 'https://www.figma.com/design/pCLrU1Wg1VsoMQGLmH1J8t/%5BLIB%5D%5BSITE%5D-Product-UI-Kit?node-id=2133-7958&p=f&t=GrubDLfb05HwX2wO-0',
    },
  },
};
