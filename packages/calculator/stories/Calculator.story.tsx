import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { LAYOUT_TYPE } from '@sbercloud/uikit-product-utils';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Calculator, CALCULATOR_TYPE, CalculatorProps } from '../src';
import src from './bg.webp';
import { CATALOG_CONFIG } from './config';
import { getFetcherFn, getOnDownloadFileClick, getOnShareClick } from './services';

const meta: Meta = {
  title: 'Console/Calculator',
  component: Calculator,
};
export default meta;

const onShareClick = getOnShareClick();
const fetcherFn = getFetcherFn();
const onDownloadFileClick = getOnDownloadFileClick();

const Template: StoryFn<CalculatorProps> = ({ ...args }) => (
  <div
    style={{
      padding: '8px 0',
    }}
  >
    <Calculator
      {...args}
      config={CATALOG_CONFIG}
      fetcherFn={fetcherFn}
      actions={{
        onDownloadFileClick,
        onShareClick,
      }}
    />
  </div>
);

export const calculator: StoryObj<CalculatorProps> = {
  render: Template,
  args: {
    calculatorType: CALCULATOR_TYPE.Main,
    layoutType: LAYOUT_TYPE.Desktop,
    bgImage: src,
  },
  argTypes: {},
  parameters: {
    readme: {
      sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
    },
    packageName: componentPackage.name,
    design: {
      name: 'Figma',
      type: 'figma',
      //TODO: update to the correct one
      url: 'https://pocka.github.io/storybook-addon-designs/?path=/story/docs-quick-start--page',
    },
  },
};
