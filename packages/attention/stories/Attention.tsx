import { styled } from '@linaria/react';
import { Meta, Story } from '@storybook/react/types-6-0';

import { H3_STYLES } from '@sbercloud/uikit-product-typography';

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

const Title = styled.h3`
  ${H3_STYLES};
`;

const Template: Story<AttentionProps> = ({ ...args }) => (
  <Wrapper>
    <Wrapper>
      <Title>{`1. Importance level: ${Attention.importanceLevels.Normal}`}</Title>
      <Attention importanceLevel={Attention.importanceLevels.Normal} data-test-id={'test-purpose'}>
        {`content `.repeat(25)}
      </Attention>
    </Wrapper>
    <Wrapper>
      <Title>{`2. Importance level: ${Attention.importanceLevels.High}`}</Title>
      <Attention importanceLevel={Attention.importanceLevels.High}>{`content `.repeat(100)}</Attention>
    </Wrapper>
    <Wrapper>
      <Title>{`3. Importance level: from controls`}</Title>
      <Attention {...args}>{`content `.repeat(88)}</Attention>
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
    url: 'https://www.figma.com/file/VVqNc0dufYULpLuwIBB84U/%F0%9F%94%A5%5BLIB%5D-Design-System-2.0--%3E-Atoms?node-id=767%3A12',
  },
};
