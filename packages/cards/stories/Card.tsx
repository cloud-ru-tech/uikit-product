import { styled } from '@linaria/react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { useState } from 'react';

import { Checkbox } from '@sbercloud/uikit-react-checkbox';
import { EXPORT_VARS } from '@sbercloud/uikit-theme';
import { H4 } from '@sbercloud/uikit-typography';

import { Card, CardProps } from '../src';

const { COLORS } = EXPORT_VARS;

export default {
  title: 'Components/Card',
  component: Card,
} as Meta;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledCardWrap = styled.div<{ showBackground?: boolean }>`
  background: ${({ showBackground }) => (showBackground ? `var(${COLORS.BLUE_1})` : 'transparent')};
  padding: 30px;
`;

const Template: Story<CardProps> = ({ ...args }) => {
  const [checked, setChecked] = useState(false);

  return (
    <StyledContainer>
      <StyledCardWrap showBackground>
        <Card {...args}>
          <Checkbox
            checked={checked}
            handleChange={(checked, e) => {
              e.stopPropagation();
              setChecked(checked);
            }}
          />
          <H4>Вступить группу</H4>
        </Card>
      </StyledCardWrap>
      <StyledCardWrap>
        <Card {...args}>
          <Checkbox
            checked={checked}
            handleChange={(checked, e) => {
              e.stopPropagation();
              setChecked(checked);
            }}
          />
          <H4>Вступить группу</H4>
        </Card>
      </StyledCardWrap>
    </StyledContainer>
  );
};

export const card = Template.bind({});
card.args = {};
card.parameters = {};
