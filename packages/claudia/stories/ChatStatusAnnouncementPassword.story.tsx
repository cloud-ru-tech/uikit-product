import { Meta, StoryObj } from '@storybook/react';
import cn from 'classnames';
import {
  ChatStatusAnnouncementPassword,
  ChatStatusAnnouncementPasswordProps,
} from 'claudia/src/components/ChatStatusAnnouncement';

import { LAYOUT_TYPE } from '@cloud-ru/uikit-product-utils';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Console/Claudia/Chat Status Announcement/Chat Status Announcement Password',
  component: ChatStatusAnnouncementPassword,
};
export default meta;

type StoryProps = ChatStatusAnnouncementPasswordProps;

const Template = ({ ...props }: StoryProps) => (
  <div>
    <div className={cn(styles.wrapper, styles.chatStatusAnnouncementWrapper)}>
      <ChatStatusAnnouncementPassword {...props} />
    </div>
  </div>
);

export const chatStatusAnnouncementPassword: StoryObj<StoryProps> = {
  render: Template,
  args: {
    onActionClick: () => alert('Action'),
    layoutType: LAYOUT_TYPE.Desktop,
  },
  argTypes: {
    layoutType: {
      options: [LAYOUT_TYPE.Desktop, LAYOUT_TYPE.Mobile],
      defaultValue: LAYOUT_TYPE.Desktop,
      control: {
        type: 'radio',
      },
    },
  },
  parameters: {
    readme: {
      sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
    },
    packageName: componentPackage.name,
    design: {
      name: 'Figma',
      type: 'figma',
      url: 'https://www.figma.com/design/SZjPEs7Ac3a2wS0HapamrE/branch/NLjwt91QgkB4gsCms0mJMG/Product-UI-Kit?node-id=39168-328052&t=86zvPuWnt5TuNi5x-0',
    },
  },
};
