import { Meta, StoryObj } from '@storybook/react';
import cn from 'classnames';

import { PlaceholderSVG } from '@cloud-ru/uikit-product-icons';
import { LAYOUT_TYPE } from '@cloud-ru/uikit-product-utils';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { ChatStatusAnnouncement, ChatStatusAnnouncementProps } from '../src/components/ChatStatusAnnouncement';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Console/Claudia/Chat Status Announcement',
  component: ChatStatusAnnouncement,
};
export default meta;

type StoryProps = ChatStatusAnnouncementProps;

const Template = ({ ...props }: StoryProps) => {
  const { layoutType, actionLabel, appearance, icon } = props;

  return (
    <div>
      <div className={cn(styles.wrapper, styles.chatStatusAnnouncementWrapper)}>
        <ChatStatusAnnouncement
          icon={icon}
          actionLabel={actionLabel}
          appearance={appearance}
          layoutType={layoutType}
          content='Single row description'
        />

        <ChatStatusAnnouncement
          icon={icon}
          actionLabel={actionLabel}
          appearance={appearance}
          layoutType={layoutType}
          items={[
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
};

export const chatStatusAnnouncement: StoryObj<StoryProps> = {
  render: Template,
  args: {
    icon: <PlaceholderSVG size={16} />,
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
