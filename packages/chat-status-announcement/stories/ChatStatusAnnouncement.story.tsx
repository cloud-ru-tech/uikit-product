import { Meta, StoryObj } from '@storybook/react';
import { ChatStatusAnnouncement } from 'chat-status-announcement/src/ChatStatusAnnouncement';
import { ChatStatusAnnouncementProps } from 'chat-status-announcement/src/types';
import cn from 'classnames';

import { PasswordLockSVG, PlaceholderSVG } from '@sbercloud/uikit-product-icons';
import { LAYOUT_TYPE } from '@sbercloud/uikit-product-utils';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Console/Chat Status Announcement',
  component: ChatStatusAnnouncement,
};
export default meta;

type StoryProps = ChatStatusAnnouncementProps;

const Template = ({ ...props }: StoryProps) => (
  <div>
    <div className={cn(styles.wrapper, styles.chatStatusAnnouncementWrapper)}>
      <ChatStatusAnnouncement {...props} content='Single row description' />

      <ChatStatusAnnouncement
        {...props}
        content={[
          {
            content: 'Animated description 1',
          },
          {
            content: 'Animated accent description 2',
            shouldFocusOnHover: true,
          },
          {
            content: 'Animated very loooooooooooooooooooooooooooooong description 3',
          },
          {
            content: 'Animated description 4',
          },
        ]}
      />
    </div>
  </div>
);

export const chatStatusAnnouncement: StoryObj<StoryProps> = {
  render: Template,
  args: {
    icon: <PasswordLockSVG size={16} />,
    actionLabel: 'Action',
    onActionClick: () => alert('Action'),
    layoutType: LAYOUT_TYPE.Desktop,
  },
  argTypes: {
    icon: {
      defaultValue: <PlaceholderSVG size={16} />,
    },
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
