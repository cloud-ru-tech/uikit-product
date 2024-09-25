import { Meta, StoryObj } from '@storybook/react';

import { QuestionSmallOutlineInterfaceSVG } from '@sbercloud/uikit-product-icons';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { PredefinedDecorIconPrivate, PredefinedDecorIconPrivateProps } from '../src';
import { TableCell, TableColumn, TableWrapper } from './helperComponents';

const meta: Meta = {
  title: 'Components/Icons/Predefined/Predefined Decor Icon Private',
  component: PredefinedDecorIconPrivate,
};
export default meta;

type StoryProps = Exclude<PredefinedDecorIconPrivateProps, 'icon' | 'type'>;

function Template(props: StoryProps) {
  return (
    <TableWrapper>
      <TableColumn key='IconsNames'>
        <TableCell key='custom'>Custom</TableCell>
        {Object.keys(PredefinedDecorIconPrivate.icons).map(iconName => (
          <TableCell key={iconName}>{iconName}</TableCell>
        ))}
      </TableColumn>
      <TableColumn key={'IconsViews'}>
        <TableCell>
          <PredefinedDecorIconPrivate
            {...props}
            type={PredefinedDecorIconPrivate.types.Custom}
            icon={<QuestionSmallOutlineInterfaceSVG />}
            data-test-id='predefinedDecorIcon-custom-test'
          />
        </TableCell>
        {Object.entries(PredefinedDecorIconPrivate.icons).map(([name, iconValue]) => (
          <TableCell key={name}>
            <PredefinedDecorIconPrivate
              {...props}
              type={PredefinedDecorIconPrivate.types.Predefined}
              icon={iconValue}
              data-test-id={`predefinedDecorIcon-${name}-test`}
            />
          </TableCell>
        ))}
      </TableColumn>
    </TableWrapper>
  );
}

export const predefinedDecorIconPrivate: StoryObj<StoryProps> = {
  render: Template,

  args: {
    size: PredefinedDecorIconPrivate.sizes.Medium,
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
      url: 'https://www.figma.com/file/gCc4XarYocwWbficnQPInC/%F0%9F%93%9A-%5BLIB%5D-Platform-Design-System?node-id=8381%3A105892',
    },
    badges: [BADGE.STABLE],
  },
};
