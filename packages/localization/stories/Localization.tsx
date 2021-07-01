import { styled } from '@linaria/react';
import { Text1 } from '@sbercloud/uikit-typography';
import { Meta, Story } from '@storybook/react/types-6-0';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { CurrencyFormatter, DateFormatter, LanguageProvider, NumberFormatter, useLanguage } from '../src';

export default {
  title: 'Not stable/Localization',
  component: LanguageProvider,
} as Meta;

const Wrapper = styled.div`
  margin: 1rem;
`;

const Template: Story = ({ showOnlyDate }) => {
  const hookCode = useLanguage();
  return (
    <>
      <Wrapper>
        <Text1>
          <strong>HooksCode:</strong> {hookCode}
        </Text1>
      </Wrapper>
      <Wrapper>
        <strong>CurrencyFormatter:</strong> <CurrencyFormatter value={1000e10} />
      </Wrapper>

      <Wrapper>
        <strong>NumberFormatter:</strong> <NumberFormatter value={1000e10} />
      </Wrapper>
      <Wrapper>
        <strong>DateFormatter:</strong> <DateFormatter showTime={showOnlyDate} value={new Date()} />
      </Wrapper>
    </>
  );
};

export const localization = Template.bind({});
localization.args = {};
localization.argTypes = {
  showOnlyDate: {
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
