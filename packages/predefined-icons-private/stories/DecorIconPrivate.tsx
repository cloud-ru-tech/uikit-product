import { Meta, Story } from '@storybook/react/types-6-0';

import { QuestionSmallOutlineInterfaceSVG } from '@sbercloud/uikit-product-icons';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { DecorIconProps, PredefinedDecorIconPrivate, PredefinedDecorIconProps } from '../src';
import { PredefinedDecorIconType } from '../src/components/decor/constants';
import { notReachable } from '../src/helpers';

export default {
  title: 'Components/Icons/Predefined/Predefined Decor Icon Private',
  component: PredefinedDecorIconPrivate,
} as Meta;

type StoryProps = Omit<DecorIconProps, 'icon'> | PredefinedDecorIconProps;

const Template: Story<StoryProps> = props => {
  switch (props.type) {
    case PredefinedDecorIconType.Predefined: {
      const { icon = PredefinedDecorIconPrivate.icons.Info } = props;
      return (
        <div>
          <PredefinedDecorIconPrivate {...props} icon={icon} />
        </div>
      );
    }
    case PredefinedDecorIconType.Custom: {
      return (
        <div>
          <PredefinedDecorIconPrivate {...props} icon={<QuestionSmallOutlineInterfaceSVG />} />
        </div>
      );
    }

    default:
      notReachable(props);
      return <div />;
  }
};

export const predefinedDecorIconPrivate = Template.bind({});
predefinedDecorIconPrivate.args = {
  type: PredefinedDecorIconPrivate.types.Predefined,
  icon: PredefinedDecorIconPrivate.icons.Info,
  size: PredefinedDecorIconPrivate.sizes.Medium,
};
predefinedDecorIconPrivate.argTypes = {
  icon: {
    control: {
      type: 'select',
    },
    options: Object.values(PredefinedDecorIconPrivate.icons),
    defaultValue: PredefinedDecorIconPrivate.icons.Info,
  },
};
predefinedDecorIconPrivate.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/gCc4XarYocwWbficnQPInC/%F0%9F%93%9A-%5BLIB%5D-Platform-Design-System?node-id=8381%3A105892',
  },
  badges: [BADGE.STABLE],
};
