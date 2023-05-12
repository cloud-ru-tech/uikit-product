import { styled } from '@linaria/react';
import { Meta, StoryFn } from '@storybook/react';

import { TEXT_1_STYLES } from '@sbercloud/uikit-product-typography';
import { ConfigProvider, useLanguage } from '@sbercloud/uikit-product-utils';

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

const HooksCodeWrapper = styled.span`
  ${TEXT_1_STYLES};
`;

const Template: StoryFn = ({ showTime }) => {
  const { languageCode } = useLanguage();
  return (
    <>
      <Wrapper>
        <HooksCodeWrapper>
          <strong>HooksCode:</strong> {languageCode}
        </HooksCodeWrapper>
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
