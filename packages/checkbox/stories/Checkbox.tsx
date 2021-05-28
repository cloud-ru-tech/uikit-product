import { styled } from '@linaria/react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { withDesign } from 'storybook-addon-designs';
import { addReadme } from 'storybook-readme';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Checkbox, CheckboxProps } from '../src';

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
  decorators: [addReadme, withDesign],
} as Meta;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StyledCheckboxWrap = styled.div<{ showBackground?: boolean }>`
  padding: 10px;
  background: ${({ showBackground }) => (showBackground ? '#fff' : 'transparent')};
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Template: Story<CheckboxProps> = ({ ...args }) => (
  <StyledContainer>
    <StyledCheckboxWrap showBackground>
      <Checkbox {...args} />
    </StyledCheckboxWrap>
    <StyledCheckboxWrap>
      <Checkbox {...args} />
    </StyledCheckboxWrap>
    <StyledCheckboxWrap showBackground>
      <Checkbox {...args}>test</Checkbox>
    </StyledCheckboxWrap>
    <StyledCheckboxWrap>
      <Checkbox {...args}>test</Checkbox>
    </StyledCheckboxWrap>
  </StyledContainer>
);

export const checkbox = Template.bind({});
checkbox.args = {};
checkbox.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    type: 'figma',
    //TODO
    url: 'https://pocka.github.io/storybook-addon-designs/?path=/story/docs-quick-start--page',
  },
};
