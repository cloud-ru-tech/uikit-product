import { Meta, StoryObj } from '@storybook/react';
import { useMemo, useState } from 'react';

import { PlaceholderSVG, PlusSVG } from '@sbercloud/uikit-product-icons';
import { QuotaCard } from '@sbercloud/uikit-product-quota';
import { LAYOUT_TYPE } from '@sbercloud/uikit-product-utils';
import { ButtonFunction } from '@snack-uikit/button';
import { Status } from '@snack-uikit/status';
import { Typography } from '@snack-uikit/typography';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { AdaptivePageServices, AdaptivePageServicesProps, MobilePageServices } from '../src';
import { SIDEBAR_ITEMS } from './constants';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Mobile/Layout/Page Services',
  component: MobilePageServices,
};
export default meta;

const getSidebarProps = ({
  selected,
  setSelected,
}: {
  selected: number;
  setSelected: (id: number) => void;
}): AdaptivePageServicesProps['sidebar'] => ({
  selected,
  onSelect: setSelected,
  items: SIDEBAR_ITEMS,
});

type PageServicesStoryProps = AdaptivePageServicesProps & {
  showSidebar: boolean;
  showActions: boolean;
  showBeforeHeadline: boolean;
  showAfterHeadline: boolean;
  showSubheader: boolean;
  showIcons: boolean;
};

function Template({
  showSidebar,
  showActions,
  showBeforeHeadline,
  showAfterHeadline,
  showSubheader,
  ...args
}: PageServicesStoryProps) {
  const [selected, setSelected] = useState(0);
  const sidebar = useMemo(() => getSidebarProps({ selected, setSelected }), [selected]);

  return (
    <div id='single-spa-wrapper' className={styles.fullPageHeight}>
      <AdaptivePageServices
        {...args}
        sidebar={showSidebar ? sidebar : undefined}
        actions={showActions ? args.actions : undefined}
        beforeHeadline={showBeforeHeadline ? args.beforeHeadline : undefined}
        afterHeadline={showAfterHeadline ? args.afterHeadline : undefined}
        subHeader={showSubheader ? args.subHeader : undefined}
      >
        {args.children}
      </AdaptivePageServices>
    </div>
  );
}

export const pageServices: StoryObj<PageServicesStoryProps> = {
  render: Template,

  args: {
    title: 'Lorem ipsum dolor',
    actions: [
      {
        variant: 'kebab',
        list: {
          closeDroplistOnItemClick: true,
          items: [
            {
              content: {
                option: 'Kebab action 1',
              },
            },
            {
              content: {
                option: 'Kebab action 2',
              },
            },
          ],
        },
      },
      {
        variant: 'filled',
        label: 'Primary action',
        icon: <PlaceholderSVG />,
      },
      {
        variant: 'outline',
        label: 'Secondary action',
        icon: <PlaceholderSVG />,
      },
      {
        variant: 'outline',
        label: 'Third action',
        icon: <PlaceholderSVG />,
      },
      {
        variant: 'droplist',
        button: {
          label: 'Documentation',
        },
        list: {
          closeDroplistOnItemClick: true,
          items: [
            {
              content: {
                option: 'Link 1',
              },
            },
            {
              content: {
                option: 'Link 2',
              },
            },
          ],
        },
      },
      {
        variant: 'droplist',
        button: {
          label: 'Documentation',
          buttonType: 'function',
        },
        list: {
          closeDroplistOnItemClick: true,
          items: [
            {
              content: {
                option: 'Link 1',
              },
            },
            {
              content: {
                option: 'Link 2',
              },
            },
          ],
        },
      },
      {
        variant: 'droplist',
        button: {
          label: 'Filled Droplist',
          buttonType: 'filled',
          icon: <PlusSVG />,
        },
        list: {
          closeDroplistOnItemClick: true,
          items: [
            {
              content: {
                option: 'Link 1',
              },
            },
            {
              content: {
                option: 'Link 2',
              },
            },
          ],
        },
      },
      {
        variant: 'dropdown',
        button: {
          label: 'Dropdown',
        },
        dropdown: {
          content: (
            <div
              style={{
                width: 200,
                height: 200,
                background: 'red',
              }}
            ></div>
          ),
        },
      },
      {
        variant: 'quota',
        title: 'Квоты',
        children: <QuotaCard title='Виртуальные машины' />,
      },
    ],
    beforeHeadline: <ButtonFunction icon={<PlaceholderSVG />} />,
    afterHeadline: <Status label='Label text' hasBackground appearance='green' size='s' />,
    subHeader: <Typography.SansBodyM>Subheader</Typography.SansBodyM>,
    children: (
      <>
        Demo content, for replacement, use the property: ◆ Slot...
        <br />
        <br />
        Connect your local component with unique content to this property
      </>
    ),
    showSidebar: true,
    showBeforeHeadline: true,
    showAfterHeadline: true,
    showActions: true,
    showSubheader: true,
    layoutType: LAYOUT_TYPE.Mobile,
  },

  argTypes: {
    layoutType: {
      name: 'Layout Type',
      options: Object.keys(LAYOUT_TYPE),
      mapping: LAYOUT_TYPE,
      control: {
        type: 'select',
      },
    },
    showActions: { name: '[Stories]: show headline actions' },
    showBeforeHeadline: { name: '[Stories]: show before headline' },
    showAfterHeadline: { name: '[Stories]: show after headline' },
    showSubheader: { name: '[Stories]: show subheader' },
    sidebar: { table: { disable: true } },
    afterHeadline: { table: { disable: true } },
    beforeHeadline: { table: { disable: true } },
    subHeader: { table: { disable: true } },
    actions: { table: { disable: true } },
    children: { table: { disable: true } },
  },

  parameters: {
    readme: {
      sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
    },
    packageName: componentPackage.name,
    design: {
      name: 'Figma',
      type: 'figma',
      url: 'https://www.figma.com/design/SZjPEs7Ac3a2wS0HapamrE/branch/Cmwj5iKjN1YQVClS16yh36/Product-components?node-id=78-9689&m=auto',
    },
  },
};
