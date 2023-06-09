import { styled } from '@linaria/react';
import { Meta, StoryFn } from '@storybook/react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { TruncateString, TruncateStringProps } from '../src';

const meta: Meta = {
  title: 'Not stable/Truncate String',
  component: TruncateString,
};
export default meta;

const Column = styled.div`
  display: flex;
  width: 250px;
  resize: horizontal;
  overflow: hidden;
`;

type TruncateProps = TruncateStringProps & { columnWidth?: number };

function Template({ ...args }: TruncateProps) {
  return (
    <Column>
      <TruncateString {...args} />
    </Column>
  );
}

export const truncateString: StoryFn<TruncateProps> = Template.bind({});
truncateString.args = {
  maxLines: 2,
  text: 'какой-то длинный текст который обрезается на самом интересном',
  textEntity: TruncateString.textEntities.Text2,
  placement: TruncateString.placements.Auto,
  hideTooltip: false,
  variant: TruncateString.variants.End,
};
truncateString.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    type: 'figma',
    //TODO
    url: 'https://pocka.github.io/storybook-addon-designs/?path=/story/docs-quick-start--page',
  },
};
truncateString.argTypes = {};
