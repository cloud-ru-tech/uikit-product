import { styled } from '@linaria/react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { Checkbox, ICheckboxProps } from './Checkbox';

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
} as Meta;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StyledCheckboxWrap = styled.div<{ showBackground?: boolean }>`
  padding: 10px;
  background: ${({ showBackground }) =>
    showBackground ? '#fff' : 'transparent'};
  max-width: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Template: Story<ICheckboxProps> = ({ ...args }) => (
  <StyledContainer>
    <StyledCheckboxWrap showBackground>
      <Checkbox {...args} />
    </StyledCheckboxWrap>
    <StyledCheckboxWrap>
      <Checkbox {...args} />
    </StyledCheckboxWrap>
  </StyledContainer>
);

export const checkbox = Template.bind({});
checkbox.args = {};
checkbox.parameters = {};
