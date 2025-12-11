import { Meta, StoryObj } from '@storybook/react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { ChatsSVG, FullscreenSVG, InlineSVG, PopupSVG, SidebarHideSVG, SidebarShowSVG } from '../src';
import styles from './styles.module.scss';

const meta: Meta = { title: 'Console/Claudia/Icons' };
export default meta;

const iconsList = [
  {
    name: 'ChatsSVG',
    icon: <ChatsSVG />,
  },
  {
    name: 'FullscreenSVG',
    icon: <FullscreenSVG />,
  },
  {
    name: 'InlineSVG',
    icon: <InlineSVG />,
  },
  {
    name: 'PopupSVG',
    icon: <PopupSVG />,
  },
  {
    name: 'SidebarHideSVG',
    icon: <SidebarHideSVG />,
  },
  {
    name: 'SidebarShowSVG',
    icon: <SidebarShowSVG />,
  },
];

const Template = () => (
  <div className={styles.iconsWrapper}>
    {iconsList.map(({ icon, name }) => (
      <div className={styles.icon} key={name}>
        {icon}
        <span>{name}</span>
      </div>
    ))}
  </div>
);

export const icons: StoryObj = {
  render: Template,
  parameters: {
    readme: { sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog] },
    packageName: componentPackage.name,
    design: { name: 'Figma', type: 'figma', url: 'https://www.figma.com/design/SZjPEs7Ac3a2wS0HapamrE/Product-UI-Kit' },
  },
};
