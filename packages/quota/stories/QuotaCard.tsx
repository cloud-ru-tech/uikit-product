import { Meta, StoryFn } from '@storybook/react';

import { toaster } from '@snack-uikit/toaster';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { QuotaCard, QuotaCardProps } from '../src';

const meta: Meta = {
  title: 'Snack UIkit/Quota/Quota Card',
  component: QuotaCard,
};
export default meta;

type StoryProps = QuotaCardProps & {
  showNoData?: boolean;
  showExceedLimit?: boolean;
};

function onIncrease() {
  toaster.userAction.neutral({ label: 'onIncrease', 'data-test-id': 'onIncrease' });
}
function onRetry() {
  toaster.userAction.neutral({ label: 'onRetry', 'data-test-id': 'onRetry' });
}

function Template({ showNoData, showExceedLimit, ...args }: StoryProps) {
  const values = (showNoData && { limit: undefined, created: undefined }) || (showExceedLimit && { limit: 0 }) || {};

  return (
    <QuotaCard
      {...args}
      {...values}
      increaseLink={{
        onClick: onIncrease,
        href: '#',
      }}
      onRetry={onRetry}
    />
  );
}

export const quotaCard: StoryFn<StoryProps> = Template.bind({});

quotaCard.args = {
  title: 'Title quota',
  limit: 5500,
  created: 500,
  loading: false,
  showExceedLimit: false,
  showNoData: false,
};

quotaCard.argTypes = {};

quotaCard.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  packageName: componentPackage.name,
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/design/SZjPEs7Ac3a2wS0HapamrE/branch/2vraLX7XLBHYmqjAuHKEP6/Product-components?node-id=5551-53305&m=dev',
  },
};
