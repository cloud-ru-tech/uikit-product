import { Meta, StoryObj } from '@storybook/react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { QuotaWidgetCard } from '../src/components/QuotaWidgetCard';
import { QuotaItem } from '../src/types';
import { MOCK_QUOTA_ITEM } from './constants';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Console/Quota/Quota Widget Card',
  component: QuotaWidgetCard,
};
export default meta;

type StoryProps = {
  quota: QuotaItem;
};

function Template({ quota }: StoryProps) {
  return (
    <div className={styles.resizeWrapper} data-card>
      <QuotaWidgetCard quota={quota} />
    </div>
  );
}

export const quotaWidgetCard: StoryObj<StoryProps> = {
  render: Template,

  args: {
    quota: { ...MOCK_QUOTA_ITEM },
  },

  argTypes: {
    quota: {
      control: 'object',
      name: 'Квота',
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
      url: 'https://www.figma.com/design/SZjPEs7Ac3a2wS0HapamrE/Product-UI-Kit?node-id=47113-1661&t=8Wuu64WOAOidjZuH-0',
    },
  },
};
