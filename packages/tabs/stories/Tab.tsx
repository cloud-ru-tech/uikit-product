import { styled } from '@linaria/react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { withDesign } from 'storybook-addon-designs';
import { addReadme } from 'storybook-readme';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { ITabProps, Tab } from '../src';
import { TabsContext } from '../src/helpers/context';

export default {
  title: 'Components/Tabs',
  component: Tab,
  decorators: [addReadme, withDesign],
} as Meta;

const TabWrapStyled = styled.ul`
  padding: 0px;
  list-style-type: none;
`;

const Template: Story<ITabProps> = ({ ...args }) => (
  <TabWrapStyled>
    <TabsContext.Provider value={{ state: { value: 1 }, dispatch: () => {} }}>
      <Tab {...args}>Избранное</Tab>
    </TabsContext.Provider>
  </TabWrapStyled>
);

export const tab = Template.bind({});
tab.args = {};
tab.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    type: 'figma',
    //TODO
    url: 'https://pocka.github.io/storybook-addon-designs/?path=/story/docs-quick-start--page',
  },
};
tab.argTypes = {
  label: {
    defaultValue: 'label',
  },
  identKey: {
    defaultValue: 1,
  },
};
