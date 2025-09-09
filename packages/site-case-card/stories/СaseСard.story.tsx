import { Meta, StoryFn, StoryObj } from '@storybook/react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { CaseCard, CaseCardProps } from '../src';

const meta: Meta = {
  title: 'Site/CaseCard',
  component: CaseCard,
};
export default meta;

const Template: StoryFn<CaseCardProps> = ({ ...args }) => (
  <div
    style={{
      width: args.layoutType === 'mobile' ? '328px' : '364px',
    }}
  >
    <CaseCard {...args} />
  </div>
);

export const caseCard: StoryObj<CaseCardProps> = {
  render: Template,
  args: {
    layoutType: 'desktop',
    img: 'https://cdn.cloud.ru/backend/cases/magnit_logo.webp',
    description: 'Увеличили скорость обработки данных в <mark>два</mark> раза',
    categories: ['IT-разработка', 'Услуги'],
    onClick: () => {},
    visibleCategories: true,
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
      url: 'https://www.figma.com/design/B2WqmDAbmTJXkRQk82ZrC7/branch/BClCz9jRFwf4Zxa7MdYoyv/Cases?node-id=4212-28912&p=f&m=dev',
    },
  },
};
