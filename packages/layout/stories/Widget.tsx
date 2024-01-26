import { Meta, StoryFn } from '@storybook/react';
import { useMemo } from 'react';

import { IconPredefinedProps } from '@snack-uikit/icon-predefined';
import { PlaceholderSVG } from '@snack-uikit/icons';
import { Link } from '@snack-uikit/link';
import { ValueOf } from '@snack-uikit/utils';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Widget, WidgetProps } from '../src';
import { ICONS } from './constants';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Snack Uikit/Layout/Widget',
  component: Widget,
};
export default meta;

const HEADER_SLOT_VARIANT = {
  none: 'none',
  custom: 'custom',
} as const;

type StoryProps = Omit<WidgetProps, 'emblem'> & {
  emblem: Omit<WidgetProps['emblem'], 'icon'>;
  icon: IconPredefinedProps['icon'];
  showIcon?: boolean;
  headerSlot: ValueOf<typeof HEADER_SLOT_VARIANT>;
};

function Template({ emblem, icon, headerSlot: headerSlotProp, showIcon, ...args }: StoryProps) {
  const headerSlot = useMemo<WidgetProps['headerSlot']>(() => {
    switch (headerSlotProp) {
      case HEADER_SLOT_VARIANT.custom: {
        return <Link text='Link text' external={true} appearance='neutral' href='#' size='m' />;
      }
      case HEADER_SLOT_VARIANT.none:
      default: {
        return undefined;
      }
    }
  }, [headerSlotProp]);

  return (
    <div className={styles.wrapperResize}>
      <Widget {...args} headerSlot={headerSlot} emblem={showIcon ? { ...emblem, icon } : undefined} />
    </div>
  );
}

export const widget: StoryFn<StoryProps> = Template.bind({});

widget.args = {
  title: 'Widget name',
  children: `Demo content
For replacement, use the property: ◆Slot... Connect your local component with unique content to this property
The maximum height of the modal window can be equal to the height of the browser view window with margins of 24 px`,
  emblem: {
    decor: true,
    appearance: 'primary',
  },
  icon: PlaceholderSVG,
  showIcon: true,
  headerSlot: HEADER_SLOT_VARIANT.custom,
};

widget.argTypes = {
  showIcon: {
    name: '[Stories]: Show icon',
  },
  icon: {
    name: '[Stories]: Choose icon',
    options: Object.keys(ICONS),
    mapping: ICONS,
    control: {
      type: 'select',
    },
    if: {
      arg: 'showIcon',
      eq: true,
    },
  },
  headerSlot: {
    name: '[Stories]: Preview header slot variant',
    options: Object.values(HEADER_SLOT_VARIANT),
    control: {
      type: 'radio',
    },
  },
};

widget.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  packageName: componentPackage.name,
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/SZjPEs7Ac3a2wS0HapamrE/Product-components?type=design&node-id=578%3A15410&mode=design&t=rMYCa7WGV6xrL5wY-1',
  },
};
