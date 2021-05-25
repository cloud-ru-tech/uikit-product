import { styled } from '@linaria/react';
import { Meta, Story } from '@storybook/react/types-6-0';

import { COLORS } from '../src';

export default {
  title: 'Variables/Colors',
} as Meta;

const Wrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  margin: 8px;
`;

const Color = styled.div<{ background: string }>`
  width: 244px;
  height: 120px;
  border-radius: 8px;

  background: ${p => `var(${p.background})`};
`;

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
