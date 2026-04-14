import { Meta, StoryObj } from '@storybook/react';

import { toaster } from '@snack-uikit/toaster';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { QuotaWidgetMini, QuotaWidgetMiniProps } from '../src';
import { MOCK_QUOTAS } from './constants';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Console/Quota/Quota Widget Mini',
  component: QuotaWidgetMini,
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

function Template(args: QuotaWidgetMiniProps) {
  return (
    <div className={styles.resizeWrapper}>
      <QuotaWidgetMini
        {...args}
        onRefresh={onRefresh}
        onIncreaseQuotaClick={onIncreaseQuotaClick}
        onWidgetOpen={onWidgetOpen}
      />
    </div>
  );
}

export const quotaWidgetMini: StoryObj<QuotaWidgetMiniProps> = {
  render: Template,

  args: {
    quotas: MOCK_QUOTAS,
    isLoading: false,
    isError: false,
    projectName: 'my-project',
    canEditQuota: true,
    isExpandedDefault: true,
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
      url: 'https://www.figma.com/design/SZjPEs7Ac3a2wS0HapamrE/Product-UI-Kit?node-id=47113-1681&t=8Wuu64WOAOidjZuH-0',
    },
  },
};
