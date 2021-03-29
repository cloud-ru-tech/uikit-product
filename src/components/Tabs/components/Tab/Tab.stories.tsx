import { styled } from '@linaria/react';
import { Meta, Story } from '@storybook/react/types-6-0';

import { TabsContext } from 'components/Tabs/helpers/context';

import { Tab, ITabProps } from './Tab';

export default {
  title: 'Components/Tabs',
  component: Tab,
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
tab.parameters = {};
tab.argTypes = {
  label: {
    defaultValue: 'label',
  },
  identKey: {
    defaultValue: 1,
  },
};
