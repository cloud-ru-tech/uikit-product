import { styled } from '@linaria/react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { COLORS } from 'theme/color/vars';
import { H4 } from 'typography/Headers';
import { Checkbox } from 'components/Checkbox';

import { Card, ICardProps } from './Card';

export default {
  title: 'Components/Card',
  component: Card,
} as Meta;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledCardWrap = styled.div<{ showBackground?: boolean }>`
  background: ${({ showBackground }) =>
    showBackground ? `var(${COLORS.BLUE_1})` : 'transparent'};
  padding: 30px;
`;

const Template: Story<ICardProps> = ({ ...args }) => (
  <StyledContainer>
    <StyledCardWrap showBackground>
      <Card {...args}>
        <Checkbox value={args.selected} onChange={() => {}} />
        <H4>Вступить группу</H4>
      </Card>
    </StyledCardWrap>
    <StyledCardWrap>
      <Card {...args}>
        <Checkbox value={args.selected} onChange={() => {}} />
        <H4>Вступить группу</H4>
      </Card>
    </StyledCardWrap>
  </StyledContainer>
);

export const card = Template.bind({});
card.args = {};
card.parameters = {};
