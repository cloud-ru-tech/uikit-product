import { Meta, StoryFn } from '@storybook/react';
import { useMemo } from 'react';

import { PlaceholderSVG } from '@snack-uikit/icons';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { MobileInfoRow, MobileInfoRowProps } from '../src';
import { POSITION } from '../src/constants';

const meta: Meta = {
  title: 'Mobile/Info Row/Info Row',
  component: MobileInfoRow,
};
export default meta;

type StoryProps = MobileInfoRowProps & {
  showRowActions?: boolean;
  twoButtons?: boolean;
};

function Template({ showRowActions, twoButtons, rowActions: rowActionsProp, ...args }: StoryProps) {
  const rowActions = useMemo(() => {
    if (!showRowActions) {
      return undefined;
    }

    if (twoButtons) {
      return rowActionsProp;
    }

    return rowActionsProp?.first ? { first: rowActionsProp?.first } : undefined;
  }, [rowActionsProp, showRowActions, twoButtons]);

  return <MobileInfoRow {...args} rowActions={rowActions} />;
}

export const infoRow: StoryFn<StoryProps> = Template.bind({});

infoRow.args = {
  label: 'Label truncate 1 line',
  labelTooltip: 'Tooltip',
  topDivider: true,
  bottomDivider: true,
  content: 'Connect your local component with unique',
  showRowActions: true,
  twoButtons: true,
  loading: false,
  position: POSITION.Inner,
  rowActions: {
    first: {
      icon: <PlaceholderSVG />,
    },
    second: {
      icon: <PlaceholderSVG />,
    },
  },
};

infoRow.argTypes = {
  content: {
    type: 'string',
  },

  showRowActions: {
    name: '[Stories]: show ActionRow',
  },

  twoButtons: {
    name: '[Stories]: TwoButtons in ActionRow',
    if: {
      arg: 'showRowActions',
      eq: true,
    },
  },

  rowActions: {
    if: {
      arg: 'showRowActions',
      eq: true,
    },
  },
};

infoRow.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  packageName: componentPackage.name,
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/SZjPEs7Ac3a2wS0HapamrE/Product-components?type=design&node-id=1472%3A113&mode=design&t=FXW8WrjOqCcvfkWa-1',
  },
};
