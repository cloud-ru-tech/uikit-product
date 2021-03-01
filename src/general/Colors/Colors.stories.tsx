import * as React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { Wrapper, Item, Color } from './styled';
import { COLORS } from 'theme/color/vars';

export default {
  title: 'Variables/Colors',
} as Meta;

const Template: Story<typeof COLORS> = () => (
  <Wrapper>
    {Object.entries(COLORS).map(([key, value]) => (
      <Item key={key}>
        <Color background={value} />

        <p>{key}</p>
      </Item>
    ))}
  </Wrapper>
);

export const Primary = Template.bind({});
