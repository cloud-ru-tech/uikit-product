import * as React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { COLORS } from 'theme/color/vars';
import { Wrapper, Item, Color } from './styled';

export default {
  title: 'Variables/Colors',
} as Meta;

const Template: Story<typeof COLORS> = () => (
  <Wrapper>
    {Object.entries(COLORS).map(([key, color]) => (
      <Item key={key}>
        <Color background={color} />

        <p>{key}</p>
      </Item>
    ))}
  </Wrapper>
);

export const Primary = Template.bind({});
