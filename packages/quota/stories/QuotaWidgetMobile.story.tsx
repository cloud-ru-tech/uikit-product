import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { ButtonFunction } from '@snack-uikit/button';
import { toaster } from '@snack-uikit/toaster';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { QuotaWidgetMobile, QuotaWidgetMobileProps } from '../src';
import { MOCK_QUOTAS } from './constants';

const meta: Meta = {
  title: 'Console/Quota/Quota Widget Mobile',
  component: QuotaWidgetMobile,
};
export default meta;

type StoryProps = Omit<QuotaWidgetMobileProps, 'isOpen' | 'onClose'>;

function onRefresh() {
  toaster.userAction.neutral({ label: 'onRefresh', 'data-test-id': 'onRefresh' });
}

function onIncreaseQuotaClick() {
  toaster.userAction.neutral({ label: 'onIncreaseQuotaClick', 'data-test-id': 'onIncreaseQuotaClick' });
}

function onWidgetOpen() {
  toaster.userAction.neutral({ label: 'onWidgetOpen', 'data-test-id': 'onWidgetOpen' });
}

function Template(args: StoryProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <ButtonFunction
        label='Open quotas'
        onClick={() => {
          setIsOpen(true);
          onWidgetOpen();
        }}
        size='s'
      />

      <QuotaWidgetMobile
        {...args}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onRefresh={onRefresh}
        onIncreaseQuotaClick={onIncreaseQuotaClick}
      />
    </>
  );
}

export const quotaWidgetMobile: StoryObj<StoryProps> = {
  render: Template,

  args: {
    quotas: MOCK_QUOTAS,
    isLoading: false,
    isError: false,
    projectName: 'my-project',
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
      url: 'https://www.figma.com/design/SZjPEs7Ac3a2wS0HapamrE/Product-UI-Kit?node-id=47113-1738&t=8Wuu64WOAOidjZuH-0',
    },
  },
};
