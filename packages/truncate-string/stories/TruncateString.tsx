import { styled } from '@linaria/react';
import { Slider } from '@sbercloud/uikit-react-slider';
import { Meta, Story } from '@storybook/react/types-6-0';
import { useState } from 'react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { ITruncateStringProps, TruncateString } from '../src';

export default {
  title: 'Not stable/Truncate String',
  component: TruncateString,
} as Meta;

const Column = styled.div<{ width: number }>`
  display: flex;
  width: ${({ width }) => width}px;
  flex-direction: column;
`;

const Template: Story<ITruncateStringProps> = ({ ...args }) => {
  const [width, setWidth] = useState<number>(200);

  return (
    <Column width={width}>
      <TruncateString {...args} />
      <Slider value={width} min={100} max={1100} onChange={setWidth} />
    </Column>
  );
};

export const truncateString = Template.bind({});
truncateString.args = {};
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
truncateString.argTypes = {
  text: {
    defaultValue: 'bucket-user-19ea8cbb-43e1-4d31-b76f-b2a5e5a9c058-id-qgoiku6b',
  },
};
