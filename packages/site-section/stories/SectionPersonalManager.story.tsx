import { Meta, StoryFn, StoryObj } from '@storybook/react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { SectionPersonalManager, SectionPersonalManagerProps } from '../src';
import { LAYOUT_TYPE } from './constants';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Site/Section/PersonalManager',
  component: SectionPersonalManager,
};

export default meta;

type StoryProps = SectionPersonalManagerProps;

const handleClick = () => window.alert('Button clicked!');

const Template: StoryFn<StoryProps> = ({ id, title, description, layoutType, manager }) => (
  <div className={styles.resizeWrapper}>
    <SectionPersonalManager
      id={id}
      title={title}
      description={description}
      manager={manager}
      onGetConsultationClick={handleClick}
      layoutType={layoutType}
    />
  </div>
);

export const personalManager: StoryObj<StoryProps> = {
  render: Template,
  args: {
    id: 'section-personal-manager',
    layoutType: 'desktop',
    manager: {
      img: 'https://cdn.cloud.ru/backend/images/personal_manager.png',
    },
  },
  argTypes: {
    layoutType: {
      name: '[Story]: Layout type',
      options: Object.values(LAYOUT_TYPE),
      control: {
        type: 'radio',
      },
    },
  },
  parameters: {
    readme: {
      sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
    },
    packageName: componentPackage.name,
    design: {
      name: 'Figma',
      type: 'figma',
      url: 'https://www.figma.com/design/pCLrU1Wg1VsoMQGLmH1J8t/%5BLIB%5D%5BSITE%5D-Product-UI-Kit?m=auto&node-id=7369-475592&t=6PG0wWrr0AIK5xSu-1',
    },
  },
};
