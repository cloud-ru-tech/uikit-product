import { styled } from '@linaria/react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { useState } from 'react';
import { withDesign } from 'storybook-addon-designs';
import { addReadme } from 'storybook-readme';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { IRangeProps, Range } from '../src';

export default {
  title: 'Components/Range',
  component: Range,
  decorators: [addReadme, withDesign],
} as Meta;

const RangeWrap = styled.div`
  padding: 0 20px;
`;

const Template: Story<IRangeProps> = () => {
  const [value, setValue] = useState<Array<number>>([0, 5]);

  return (
    <RangeWrap>
      <Range
        value={value}
        marks={{
          0: '0',
          20: '20',
          40: '40',
          60: '60',
          80: '80',
          100: '100',
        }}
        min={1}
        max={100}
        onChange={val => setValue(val)}
      />
    </RangeWrap>
  );
};

export const range = Template.bind({});

range.args = {};

range.argTypes = {};

range.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    type: 'figma',
    //TODO
    url: 'https://pocka.github.io/storybook-addon-designs/?path=/story/docs-quick-start--page',
  },
};
