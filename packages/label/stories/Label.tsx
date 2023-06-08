import { styled } from '@linaria/react';
import { Meta, StoryFn } from '@storybook/react';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Label, LabelProps } from '../src';

const LabelWrap = styled.div`
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const meta: Meta = {
  title: 'Components/Label',
  component: Label,
};
export default meta;

function Template({ ...args }: LabelProps) {
  return (
    <LabelWrap>
      <Label variant={Label.variants.Green} text={'Новое'} />
      <Label variant={Label.variants.Blue} text={'Рекомендуемое'} />
      <Label variant={Label.variants.Red} text={'Топ'} />
      <Label {...args} />
    </LabelWrap>
  );
}

export const label: StoryFn<LabelProps> = Template.bind({});
label.args = {
  text: 'Controls',
  variant: Label.variants.Red,
};
label.argTypes = {};
label.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/gCc4XarYocwWbficnQPInC/%F0%9F%93%9A-%5BLIB%5D-Platform-Design-System?node-id=5021%3A67033',
  },
  badges: [BADGE.STABLE],
};
