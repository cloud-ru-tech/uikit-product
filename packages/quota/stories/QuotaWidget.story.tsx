import { Meta, StoryObj } from '@storybook/react';

import { toaster } from '@snack-uikit/toaster';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { QuotaWidget, QuotaWidgetProps } from '../src';
import { MOCK_QUOTAS } from './constants';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Console/Quota/Quota Widget',
  component: QuotaWidget,
};
export default meta;

function onRefresh() {
  toaster.userAction.neutral({ label: 'onRefresh', 'data-test-id': 'onRefresh' });
}

function onIncreaseQuotaClick() {
  toaster.userAction.neutral({ label: 'onIncreaseQuotaClick', 'data-test-id': 'onIncreaseQuotaClick' });
}

function onWidgetOpen() {
  toaster.userAction.neutral({ label: 'onWidgetOpen', 'data-test-id': 'onWidgetOpen' });
}

function onQuotasUrlClick() {
  toaster.userAction.neutral({ label: 'onQuotasUrlClick', 'data-test-id': 'onQuotasUrlClick' });
}

function Template(args: QuotaWidgetProps) {
  return (
    <div className={styles.wrapper}>
      <QuotaWidget
        {...args}
        onRefresh={onRefresh}
        onIncreaseQuotaClick={onIncreaseQuotaClick}
        onWidgetOpen={onWidgetOpen}
        onQuotasUrlClick={onQuotasUrlClick}
      />
    </div>
  );
}

export const quotaWidget: StoryObj<QuotaWidgetProps> = {
  render: Template,

  args: {
    quotas: MOCK_QUOTAS,
    isLoading: false,
    isError: false,
    projectName: 'my-project',
    quotasUrl: '#',
    canEditQuota: true,
    hideIncreaseQuotaButton: false,
  },

  parameters: {
    readme: {
      sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
    },
    packageName: componentPackage.name,
    design: {
      name: 'Figma',
      type: 'figma',
      url: 'https://www.figma.com/design/SZjPEs7Ac3a2wS0HapamrE/Product-UI-Kit?node-id=47113-1659&t=8Wuu64WOAOidjZuH-0',
    },
  },
};
