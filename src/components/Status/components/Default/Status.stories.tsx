import { Story, Meta } from '@storybook/react/types-6-0';
import { styled } from '@linaria/react';

import { Status } from './Status';

export default {
  title: 'Components/Status',
  component: Status,
} as Meta;

const Wrapper = styled.div`
  display: grid;
  grid-row-gap: 16px;
`;

const Template: Story = ({ ...args }) => (
  <Wrapper>
    <Status type='failed'>Failed</Status>
    <Status type='success'>Success</Status>
    <Status type='warning'>Warning</Status>
    <Status type='unactive'>Unactive</Status>
    <Status {...args}>Custom Dot Color</Status>
  </Wrapper>
);

export const status = Template.bind(null);
status.args = { dotColor: '#000' };
status.argTypes = {
  dotColor: {
    control: {
      type: 'color',
    },
  },
};
