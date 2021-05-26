import { styled } from '@linaria/react';
import { Meta, Story } from '@storybook/react/types-6-0';

import { Status } from '../src';

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
    <Status type={Status.types.Failed}>Failed</Status>
    <Status type={Status.types.Success}>Success</Status>
    <Status type={Status.types.Warning}>Warning</Status>
    <Status type={Status.types.Unactive}>Unactive</Status>
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
