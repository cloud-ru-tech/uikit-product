import { BADGE } from '@geometricpanda/storybook-addon-badges';
import { styled } from '@linaria/react';
import { Meta, Story } from '@storybook/react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { TEXT_1_STYLES, TEXT_2_STYLES, TEXT_3_STYLES, TEXT_4_STYLES } from '../src';

export default {
  title: 'Typography/Text',
} as Meta;

const Text1 = styled.div`
  ${TEXT_1_STYLES};
`;

const Text2 = styled.div`
  ${TEXT_2_STYLES};
`;

const Text3 = styled.div`
  ${TEXT_3_STYLES};
`;

const Text4 = styled.div`
  ${TEXT_4_STYLES};
`;

const Template: Story = () => (
  <>
    <Text1>Пример (Text1)</Text1>
    <Text2>Пример (Text2)</Text2>
    <Text3>Пример (Text3)</Text3>
    <Text4>Пример (Text4)</Text4>
  </>
);

export const text = Template.bind({});
text.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  badges: [BADGE.STABLE],
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/VVqNc0dufYULpLuwIBB84U/%F0%9F%94%A5%5BLIB%5D-Platform-Design-System?node-id=1133%3A25062',
  },
};
