import { Story, Meta } from '@storybook/react/types-6-0';

import { ContentHider, IContentHiderProps } from './ContentHider';

export default {
  title: 'Components/Content Hider',
  component: ContentHider,
} as Meta;

const contentString = 'lorem ipsum dolor sit amet ';
const content = [...new Array(300)].map(() => contentString).join('');

const Template: Story<IContentHiderProps> = ({ ...args }) => (
  <ContentHider {...args}>{content}</ContentHider>
);

export const contentHider = Template.bind({});
contentHider.args = {};
contentHider.parameters = {};
contentHider.argTypes = {
  backgroundColor: {
    control: {
      type: 'color',
    },
  },
};
