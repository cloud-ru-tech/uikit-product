import { styled } from '@linaria/react';
import { Meta, StoryFn } from '@storybook/react';
import { ReactElement } from 'react';

import { Button } from '@sbercloud/uikit-product-button';
import { CircleAddInterfaceSVG, SearchInterfaceSVG } from '@sbercloud/uikit-product-icons';
import { PredefinedDecorIconPrivate } from '@sbercloud/uikit-product-predefined-icons-private';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { NoData, NoDataProps } from '../src';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const icons = {
  SearchInterfaceSVG: (
    <PredefinedDecorIconPrivate type={PredefinedDecorIconPrivate.types.Custom} icon={<SearchInterfaceSVG />} />
  ),
};
const buttons = {
  Default: <Button text={'Button Text'} icon={<CircleAddInterfaceSVG />} variant={Button.variants.Transparent} />,
};

const meta: Meta = {
  title: 'Components/No Data/No Data',
  component: NoData,
};
export default meta;

type StoryProps = { image: string | ReactElement; button: string | ReactElement } & Omit<
  NoDataProps,
  'image' | 'button'
>;

function Template({ button, image, ...rest }: StoryProps) {
  return (
    <Wrapper>
      <NoData {...rest} image={image as ReactElement} button={button as ReactElement}></NoData>
    </Wrapper>
  );
}

export const noData: StoryFn<StoryProps> = Template.bind({});
noData.args = {
  title: 'Нет данных',
  description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam`,
  image: 'SearchInterfaceSVG',
  button: 'Default',
};
noData.argTypes = {
  description: {
    type: 'string',
  },
  image: {
    options: Object.keys(icons),
    mapping: icons,
    control: { type: 'radio' },
  },
  button: {
    options: Object.keys(buttons),
    mapping: buttons,
    control: { type: 'radio' },
  },
};
noData.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  badges: [BADGE.STABLE],
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/gCc4XarYocwWbficnQPInC/%F0%9F%93%9A-%5BLIB%5D-Platform-Design-System?node-id=241%3A0',
  },
};
