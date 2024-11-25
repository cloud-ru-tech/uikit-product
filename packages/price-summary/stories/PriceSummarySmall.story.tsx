import { Meta, StoryFn, StoryObj } from '@storybook/react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { PriceSummarySmall, PriceSummarySmallProps } from '../src/components';

const meta: Meta = {
  title: 'Console/Price Summary/Price Summary Small',
  component: PriceSummarySmall,
};
export default meta;

const Template: StoryFn<PriceSummarySmallProps> = ({ ...args }) => (
  <div style={{ maxWidth: 176 }}>
    <PriceSummarySmall {...args} />
  </div>
);

export const priceSummarySmall: StoryObj<PriceSummarySmallProps> = {
  render: Template,
  args: {
    value: 9999999.99,
    docsLink: {
      href: 'https://cloud.ru/documents/tariffs/index.html',
    },
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
      url: 'https://www.figma.com/design/SZjPEs7Ac3a2wS0HapamrE/branch/wI0JfYnXUmWWorNhsMIWLF/Product-components?m=auto&node-id=4891-59089&t=DChWTK73FGL6trGn-1',
    },
  },
};
