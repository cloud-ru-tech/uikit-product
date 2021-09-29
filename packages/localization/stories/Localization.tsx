import { styled } from '@linaria/react';
import { Meta, Story } from '@storybook/react/types-6-0';

import { Text1 } from '@sbercloud/uikit-typography';
import { ConfigProvider, useLanguage } from '@sbercloud/uikit-utils';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { CurrencyFormatter, DateFormatter, NumberFormatter } from '../src';

export default {
  title: 'Not stable/Localization',
  component: ConfigProvider,
} as Meta;

const Wrapper = styled.div`
  margin: 1rem;
`;

const Template: Story = ({ showTime }) => {
  const { languageCode } = useLanguage();
  return (
    <>
      <Wrapper>
        <Text1>
          <strong>HooksCode:</strong> {languageCode}
        </Text1>
      </Wrapper>
      <Wrapper>
        <strong>CurrencyFormatter:</strong> <CurrencyFormatter value={1000e10} />
      </Wrapper>

      <Wrapper>
        <strong>NumberFormatter:</strong> <NumberFormatter value={1000e10} />
      </Wrapper>
      <Wrapper>
        <strong>DateFormatter:</strong> <DateFormatter showTime={showTime} value={new Date()} />
      </Wrapper>
    </>
  );
};

export const localization = Template.bind({});
localization.args = {};
localization.argTypes = {
  showTime: {
    type: 'boolean',
  },
};
localization.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    type: 'figma',
    //TODO
    url: 'https://pocka.github.io/storybook-addon-designs/?path=/story/docs-quick-start--page',
  },
};
