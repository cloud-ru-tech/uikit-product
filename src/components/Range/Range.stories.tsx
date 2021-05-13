import { useState } from 'react';
import { styled } from '@linaria/react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { Range } from './Range';

export default {
  title: 'Components/Range',
  component: Range,
} as Meta;

const RangeWrap = styled.div`
  padding: 0px 20px;
`;

const Template: Story = () => {
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
