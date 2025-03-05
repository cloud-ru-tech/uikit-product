import { Meta, StoryFn, StoryObj } from '@storybook/react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Table, TableProps } from '../src';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Site/Table',
  component: Table,
};
export default meta;

const Template: StoryFn<TableProps> = ({ ...args }) => (
  <div className={styles.resizeWrapper}>
    <Table {...args} />
  </div>
);

export const table: StoryObj<TableProps> = {
  render: Template,
  args: {
    rows: [
      new Array(5).fill({ content: 'Header' }),
      new Array(5).fill({ content: 'Text' }).map((item, index) => (index === 3 ? { ...item, rowSpan: 2 } : item)),
      [{ content: 'Text', colSpan: 2 }, { content: 'Text' }, { content: 'Text' }],
      new Array(5).fill({ content: 'Text' }),
      new Array(5).fill({ content: 'Text' }),
    ],
    withHeader: true,
  },
  argTypes: {},
  parameters: {
    readme: {
      sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
    },
    packageName: componentPackage.name,
    design: {
      name: 'Figma',
      type: 'figma',
      url: 'https://www.figma.com/design/pCLrU1Wg1VsoMQGLmH1J8t/branch/Ebf8XrdFkT0KzHJQXGg2wL/%5BLIB%5D%5BSITE%5D-Product-UI-Kit?node-id=12846-112530&m=dev',
    },
  },
};
