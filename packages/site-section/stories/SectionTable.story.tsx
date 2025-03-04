import { Meta, StoryFn, StoryObj } from '@storybook/react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { SectionTable, SectionTableProps } from '../src';
import { LAYOUT_TYPE } from './constants';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Site/Section/Table',
  component: SectionTable,
};

export default meta;

type StoryProps = SectionTableProps;

const Template: StoryFn<StoryProps> = ({ id, layoutType, ...rest }) => (
  <div className={styles.resizeWrapper}>
    <SectionTable id={id} layoutType={layoutType} {...rest} />
  </div>
);

export const table: StoryObj<StoryProps> = {
  render: Template,
  args: {
    id: 'section-promo-list',
    layoutType: 'desktop',
    title: 'Section Title',
    subtitle: 'Subtitle',
    description: 'Description',
    rows: [
      new Array(5).fill({ content: 'Header' }),
      new Array(5).fill({ content: 'Text' }).map((item, index) => (index === 3 ? { ...item, rowSpan: 2 } : item)),
      [{ content: 'Text', colSpan: 2 }, { content: 'Text' }, { content: 'Text' }],
      new Array(5).fill({ content: 'Text' }),
      new Array(5).fill({ content: 'Text' }),
    ],
    withHeader: true,
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
      url: 'https://www.figma.com/design/pCLrU1Wg1VsoMQGLmH1J8t/branch/Ebf8XrdFkT0KzHJQXGg2wL/%5BLIB%5D%5BSITE%5D-Product-UI-Kit?node-id=13197-285784&m=dev',
    },
  },
};
