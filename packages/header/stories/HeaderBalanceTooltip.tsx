import { Meta, StoryFn } from '@storybook/react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { HeaderBalanceTooltip, HeaderBalanceTooltipProps } from '../src';

const meta: Meta = {
  title: 'Components/Header/Header Balance Tooltip',
  component: HeaderBalanceTooltip,
};
export default meta;

type StoryProps = HeaderBalanceTooltipProps & { showRechargeButton: boolean; showSpinner: boolean; showPie: boolean };

function Template({ showRechargeButton, showSpinner, showPie, ...args }: StoryProps) {
  return (
    <HeaderBalanceTooltip
      {...args}
      balance={showSpinner ? undefined : args.balance}
      bonuses={showSpinner ? undefined : args.bonuses}
      customBalanceTooltip={showSpinner ? undefined : args.customBalanceTooltip}
      limit={showPie ? args.limit : undefined}
      onRechargeClick={showRechargeButton ? args.onRechargeClick : undefined}
    />
  );
}

export const headerBalanceTooltip: StoryFn<StoryProps> = Template.bind({});
headerBalanceTooltip.args = {
  balance: 144_401_810,
  balanceVariant: undefined,
  customBalanceTooltip: undefined,
  bonuses: undefined,
  bonusesUnit: undefined,
  limit: 155_500_000,
  showRechargeButton: true,
  showSpinner: false,
  showPie: true,
};
headerBalanceTooltip.argTypes = {
  showRechargeButton: {
    type: 'boolean',
    name: '[Stories]: show recharge button',
  },
  showSpinner: {
    type: 'boolean',
    name: '[Stories]: show spinner',
  },
  showPie: {
    type: 'boolean',
    name: '[Stories]: show pie',
  },
};
headerBalanceTooltip.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  packageName: componentPackage.name,
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/gCc4XarYocwWbficnQPInC/%F0%9F%93%9A-%5BLIB%5D-Platform-Design-System?node-id=331%3A8119',
  },
};
