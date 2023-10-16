import { styled } from '@linaria/react';
import { Meta, StoryFn } from '@storybook/react';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Tag, TagProps } from '../src';

const meta: Meta = {
  title: 'Components/Tag/Tag',
  component: Tag,
};
export default meta;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  width: 130px;
`;

const Name = styled.span``;

type StoryProps = TagProps & { showRemoveButton: boolean };

function Template(args: StoryProps) {
  return (
    <Wrapper>
      {Object.entries(Tag.colors).map(([name, color]) => (
        <Row key={color}>
          <Name>{name}</Name>
          <Tag {...args} onRemoveClick={args.showRemoveButton ? args.onRemoveClick : undefined} color={color} />
        </Row>
      ))}
    </Wrapper>
  );
}

export const tag: StoryFn<StoryProps> = Template.bind({});
tag.args = { value: 'Tag', showRemoveButton: false };
tag.argTypes = {
  showRemoveButton: {
    type: 'boolean',
    name: '[Stories]: Show or not Remove Button',
  },
};
tag.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  packageName: componentPackage.name,
  badges: [BADGE.STABLE],
  design: {
    type: 'figma',
    name: 'Figma',
    url: 'https://www.figma.com/file/gCc4XarYocwWbficnQPInC/%F0%9F%93%9A-%5BLIB%5D-Platform-Design-System?node-id=4736%3A66452',
  },
};
