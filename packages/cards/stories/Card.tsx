import { styled } from '@linaria/react';
import { Checkbox } from '@sbercloud/uikit-react-checkbox';
import { EXPORT_VARS } from '@sbercloud/uikit-theme';
import { H4 } from '@sbercloud/uikit-typography';
import { Meta, Story } from '@storybook/react/types-6-0';
import { useState } from 'react';
import { withDesign } from 'storybook-addon-designs';
import { addReadme } from 'storybook-readme';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Card, CardProps } from '../src';

const { COLORS } = EXPORT_VARS;

export default {
  title: 'Not stable/Card',
  component: Card,
  decorators: [addReadme, withDesign],
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
card.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    type: 'figma',
    //TODO
    url: 'https://pocka.github.io/storybook-addon-designs/?path=/story/docs-quick-start--page',
  },
};
