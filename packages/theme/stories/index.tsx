import { styled } from '@linaria/react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { withDesign } from 'storybook-addon-designs';
import { addReadme } from 'storybook-readme';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { EXPORT_VARS } from '../src';

export default {
  title: 'Variables/Colors',
  decorators: [addReadme, withDesign],
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

const Template: Story<typeof EXPORT_VARS.COLORS> = () => (
  <Wrapper>
    {Object.entries(EXPORT_VARS.COLORS).map(([key, color]) => (
      <Item key={key}>
        <Color background={color} />

        <p>{key}</p>
      </Item>
    ))}
  </Wrapper>
);

export const Primary = Template.bind({});

Primary.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    type: 'figma',
    //TODO
    url: 'https://pocka.github.io/storybook-addon-designs/?path=/story/docs-quick-start--page',
  },
};
