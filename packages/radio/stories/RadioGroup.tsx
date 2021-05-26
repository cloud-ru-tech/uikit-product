import { styled } from '@linaria/react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { useState } from 'react';

import { EXPORT_VARS } from '@sbercloud/uikit-theme';

import { IRadioProps, Radio, RadioGroup } from '../src';

const { COLORS_DRAWER } = EXPORT_VARS;

export default {
  title: 'Components/Radio',
  component: Radio,
} as Meta;

const Wrapper = styled.div`
  background-color: var(${COLORS_DRAWER.BACKGROUND});
  padding: 10px;
`;

const Template: Story<IRadioProps> = ({ ...args }) => {
  const [value, setValue] = useState('story2');

  return (
    <Wrapper>
      <RadioGroup
        name='stories'
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
      >
        {[...new Array(3)].map((_value, index) => (
          <Radio
            {...args}
            key={index}
            value={`story${index}`}
            label={`story${index}`}
            description={`description${index}`}
          />
        ))}
      </RadioGroup>
    </Wrapper>
  );
};

export const radioGroup = Template.bind({});
radioGroup.args = {};
radioGroup.parameters = {};
