import { Meta, Story } from '@storybook/react/types-6-0';

import { QuestionSmallOutlineInterfaceSVG } from '@sbercloud/uikit-product-icons';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { PredefinedDecorIconPrivate, PredefinedDecorIconPrivateProps } from '../src';
import { TableCell, TableColumn, TableWrapper } from './helperComponents';

export default {
  title: 'Components/Icons/Predefined/Predefined Decor Icon Private',
  component: PredefinedDecorIconPrivate,
} as Meta;

type StoryProps = Exclude<PredefinedDecorIconPrivateProps, 'icon' | 'type'>;

const Template: Story<StoryProps> = props => (
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

export const predefinedDecorIconPrivate = Template.bind({});
predefinedDecorIconPrivate.args = {
  size: PredefinedDecorIconPrivate.sizes.Medium,
};
predefinedDecorIconPrivate.argTypes = {};
predefinedDecorIconPrivate.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/gCc4XarYocwWbficnQPInC/%F0%9F%93%9A-%5BLIB%5D-Platform-Design-System?node-id=8381%3A105892',
  },
  badges: [BADGE.STABLE],
};
