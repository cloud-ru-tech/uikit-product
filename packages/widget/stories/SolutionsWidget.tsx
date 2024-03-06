import { Meta, StoryFn } from '@storybook/react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { SolutionsWidget, SolutionsWidgetProps } from '../src';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Snack Uikit/Widget/Solutions Widget',
  component: SolutionsWidget,
};
export default meta;

const CARDS = Array.from({ length: 10 }).fill({
  title: 'Title',
  description: 'Description',
}) as SolutionsWidgetProps['cards'];

type StoryProps = SolutionsWidgetProps;

function Template({ ...args }: StoryProps) {
  return (
    <div className={styles.wrapperResize}>
      <SolutionsWidget {...args} />
    </div>
  );
}

export const solutionsWidget: StoryFn<StoryProps> = Template.bind({});

solutionsWidget.args = {
  moreLink: { href: '#' },
  cards: CARDS,
};

solutionsWidget.argTypes = {};

solutionsWidget.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  packageName: componentPackage.name,
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/SZjPEs7Ac3a2wS0HapamrE/Product-components?type=design&node-id=578%3A15410&mode=design&t=rMYCa7WGV6xrL5wY-1',
  },
};
