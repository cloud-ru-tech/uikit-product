import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { PlaceholderSVG } from '@cloud-ru/uikit-product-icons';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { MobileAlertTop, MobileAlertTopProps } from '../src';
import { APPEARANCE } from '../src/constants';

const meta: Meta = {
  title: 'Mobile/Alert/AlertTop',
  component: MobileAlertTop,
};
export default meta;

type StoryProps = MobileAlertTopProps & {
  showCloseButton?: boolean;
  link: string;
  action: string;
};

const DEFAULT_ACTION: MobileAlertTopProps['action'] = {
  text: 'Button Text',
  icon: <PlaceholderSVG />,
  onClick: () => {},
};

const DEFAULT_LINK: MobileAlertTopProps['link'] = {
  text: 'Link text',
  href: '#',
  onClick: e => {
    e.preventDefault();
  },
};

const Template: StoryFn<StoryProps> = ({ link, action, showCloseButton, ...args }: StoryProps) => (
  <MobileAlertTop
    {...args}
    action={action ? { ...DEFAULT_ACTION, text: action } : undefined}
    link={link ? { ...DEFAULT_LINK, text: link } : undefined}
    onClose={showCloseButton ? args.onClose : undefined}
  />
);

export const alertTop: StoryObj<StoryProps> = {
  render: Template,

  args: {
    appearance: APPEARANCE.Success,
    title: 'Title with long long long long long long long long long long content',
    description:
      'Description with long long long long long long long long long long long long long long long long content',
    link: DEFAULT_LINK.text,
    action: DEFAULT_ACTION.text,
    showCloseButton: true,
    onClose: () => {},
  },

  argTypes: {
    showCloseButton: {
      name: '[Stories]: showCloseButton',
    },
    description: {
      type: 'string',
    },
    link: {
      type: 'string',
    },
    action: {
      type: 'string',
    },
    onClose: { table: { disable: true } },
    icon: { table: { disable: true } },
    truncate: { table: { disable: true } },
  },

  parameters: {
    readme: {
      sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
    },
    packageName: componentPackage.name,
    design: {
      name: 'Figma',
      type: 'figma',
      url: 'https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-1.1.0?node-id=41%3A182904&mode=design',
    },
  },
};
