import { styled } from '@linaria/react';
import { H3 } from '@sbercloud/uikit-typography';
import { Meta, Story } from '@storybook/react/types-6-0';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Attention, AttentionProps } from '../src';

export default {
  title: 'Not stable/Attention',
  component: Attention,
} as Meta;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  > * + * {
    margin-top: 24px;
  }
`;

const Template: Story<AttentionProps> = () => (
  <Wrapper>
    <Wrapper>
      <H3>{`1. Importance level: ${Attention.importanceLevels.Normal}`}</H3>
      <Attention importanceLevel={Attention.importanceLevels.Normal} data-test-id={'test-purpose'}>
        {`content `.repeat(25)}
      </Attention>
    </Wrapper>
    <Wrapper>
      <H3>{`2. Importance level: ${Attention.importanceLevels.High}`}</H3>
      <Attention importanceLevel={Attention.importanceLevels.High}>{`content `.repeat(100)}</Attention>
    </Wrapper>
  </Wrapper>
);

export const attention = Template.bind({});
attention.args = {};
attention.argTypes = {};
attention.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/VVqNc0dufYULpLuwIBB84U/%5BLIB%5D-Temp-Design-System?node-id=767%3A12',
  },
};
