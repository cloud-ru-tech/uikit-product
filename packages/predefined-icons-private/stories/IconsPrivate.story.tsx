import { Meta, StoryObj } from '@storybook/react';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { PredefinedIconsPrivate, PredefinedIconsPrivateProps } from '../src';
import { Block, TableCell, TableColumn, TableWrapper } from './helperComponents';

const meta: Meta = {
  title: 'Components/Icons/Predefined/Predefined Icons Private',
  component: PredefinedIconsPrivate,
};
export default meta;

function Template({ ...args }: PredefinedIconsPrivateProps) {
  return (
    <div>
      <Block>
        <PredefinedIconsPrivate {...args} />
      </Block>
      <TableWrapper>
        <TableColumn key='IconsNames'>
          <TableCell key='emptyCell' />
          {Object.keys(PredefinedIconsPrivate.icons).map(iconName => (
            <TableCell key={iconName}>{iconName}</TableCell>
          ))}
        </TableColumn>
        {Object.entries(PredefinedIconsPrivate.variants).map(([variantKey, variantValue]) => (
          <TableColumn key={variantKey} data-variant={TableColumn.variants[variantValue]}>
            <TableCell>{variantKey}</TableCell>

            {Object.entries(PredefinedIconsPrivate.icons).map(([iconKey, iconValue]) => (
              <TableCell key={iconKey}>
                <PredefinedIconsPrivate icon={iconValue} variant={variantValue} />
              </TableCell>
            ))}
          </TableColumn>
        ))}
      </TableWrapper>
    </div>
  );
}

export const predefinedIconsPrivate: StoryObj<PredefinedIconsPrivateProps> = {
  render: Template,

  args: {
    icon: PredefinedIconsPrivate.icons.Success,
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
      url: 'https://www.figma.com/file/gCc4XarYocwWbficnQPInC/%F0%9F%93%9A-%5BLIB%5D-Platform-Design-System?node-id=212%3A350',
    },
    badges: [BADGE.STABLE],
  },
};
