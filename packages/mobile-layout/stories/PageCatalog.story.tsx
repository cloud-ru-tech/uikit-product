import { Meta, StoryObj } from '@storybook/react';

import { PlaceholderSVG, PlusSVG } from '@sbercloud/uikit-product-icons';
import { QuotaCard } from '@sbercloud/uikit-product-quota';
import { LAYOUT_TYPE } from '@sbercloud/uikit-product-utils';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { AdaptivePageCatalog, AdaptivePageCatalogProps, MobilePageCatalog } from '../src';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Mobile/Layout/Page Catalog',
  component: MobilePageCatalog,
};
export default meta;

type PageCatalogStoryProps = AdaptivePageCatalogProps & {
  showActions: boolean;
};

function Template({ showActions, ...args }: PageCatalogStoryProps) {
  return (
    <div id='single-spa-wrapper' className={styles.fullPageHeight}>
      <AdaptivePageCatalog {...args} actions={showActions ? args.actions : undefined}>
        {args.children}
      </AdaptivePageCatalog>
    </div>
  );
}

export const pageCatalog: StoryObj<PageCatalogStoryProps> = {
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
    children: (
      <>
        Demo content, for replacement, use the property: ◆ Slot...
        <br />
        <br />
        Connect your local component with unique content to this property
      </>
    ),
    showActions: true,
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
