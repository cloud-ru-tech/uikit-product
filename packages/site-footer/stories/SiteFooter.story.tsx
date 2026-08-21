import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { LAYOUT_TYPE } from '@cloud-ru/uikit-product-utils';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { FOOTER_CONTENT, SiteFooter, SiteFooterProps } from '../src';

const meta: Meta = {
  title: 'Site/Footer',
  component: SiteFooter,
};

export default meta;

const Template: StoryFn<SiteFooterProps> = ({ currentLocaleId: currentLocaleIdProp, ...args }) => {
  const [currentLocaleId, setCurrentLocaleId] = useState(currentLocaleIdProp);

  return (
    <SiteFooter
      {...args}
      currentLocaleId={currentLocaleId}
      onLocaleChange={locale => setCurrentLocaleId(locale.id)}
      onElementClick={payload => console.info('footer click', payload)}
      onNavigate={(url, event) => {
        console.info('footer navigate', url);
        event.preventDefault();
      }}
    />
  );
};

export const footer: StoryObj<SiteFooterProps> = {
  render: Template,
  args: {
    content: FOOTER_CONTENT,
    layoutType: LAYOUT_TYPE.Desktop,
    disableSubscribe: false,
    currentLocaleId: 'ru',
  },
  argTypes: {
    layoutType: {
      control: 'select',
      options: Object.values(LAYOUT_TYPE),
    },
    content: { control: false },
    onElementClick: { control: false },
    onNavigate: { control: false },
    onLocaleChange: { control: false },
  },
  parameters: {
    readme: {
      sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
    },
    packageName: componentPackage.name,
    design: {
      name: 'Figma',
      type: 'figma',
      url: 'https://www.figma.com/design/pCLrU1Wg1VsoMQGLmH1J8t/-LIB--SITE--Product-UI-Kit?node-id=2508-230464&t=A4xL9VSZge5jSWxX-11',
    },
  },
};
