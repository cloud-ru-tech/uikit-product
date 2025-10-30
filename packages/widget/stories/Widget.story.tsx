import { Meta, StoryObj } from '@storybook/react';
import { useMemo } from 'react';

import { PlaceholderSVG, PlusSVG } from '@sbercloud/uikit-product-icons';
import { IconPredefinedProps } from '@snack-uikit/icon-predefined';
import { Skeleton } from '@snack-uikit/skeleton';
import { ValueOf } from '@snack-uikit/utils';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Widget, WidgetProps } from '../src';
import { ICONS } from './constants';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Console/Widget/Widget',
  component: Widget,
};
export default meta;

const STATE_VARIANT = {
  default: 'default',
  loading: 'loading',
  error: 'error',
} as const;

const HEADER_VARIANT = {
  title: 'title',
  avatar: 'avatar',
} as const;

type StoryProps = Omit<WidgetProps, 'header'> & {
  headerTitle: string;
  headerIcon: IconPredefinedProps['icon'];
  showHeaderIcon?: boolean;
  headerHref: string;
  state: ValueOf<typeof STATE_VARIANT>;
  showActions?: boolean;
  headerVariant: ValueOf<typeof HEADER_VARIANT>;
  avatarName: string;
  avatarSubtitle: string;
  useCustomLoadingContent?: boolean;
};

function Template({
  headerTitle,
  headerIcon,
  showHeaderIcon,
  headerHref,
  state,
  wide,
  showActions,
  headerVariant,
  avatarName,
  avatarSubtitle,
  useCustomLoadingContent,
  ...args
}: StoryProps) {
  const header = useMemo<WidgetProps['header']>(() => {
    if (headerVariant === HEADER_VARIANT.avatar) {
      return {
        avatar: {
          name: avatarName,
          subtitle: avatarSubtitle,
          showTwoSymbols: true,
        },
        href: headerHref,
        fullWidth: true,
      };
    }

    return {
      title: headerTitle,
      icon: showHeaderIcon ? headerIcon : undefined,
      href: headerHref,
      fullWidth: !wide ? true : undefined,
    };
  }, [headerVariant, headerTitle, showHeaderIcon, headerIcon, headerHref, wide, avatarName, avatarSubtitle]);

  const actions = useMemo(() => {
    if (!showActions) return undefined;

    return [
      {
        variant: 'kebab' as const,
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
        variant: 'outline' as const,
        label: 'Primary action',
        appearance: 'neutral' as const,
        icon: <PlusSVG />,
      },
    ];
  }, [showActions]);

  const loadingState = useMemo(() => {
    if (state !== 'loading') return undefined;

    if (useCustomLoadingContent) {
      return {
        loadingContent: (
          <div style={{ padding: 16 }}>
            <div style={{ marginBottom: 12 }}>
              <Skeleton loading width={'100%'} height={20} borderRadius={6} />
            </div>
            <Skeleton loading width={'80%'} height={20} borderRadius={6} />
          </div>
        ),
      };
    }

    return { showSkeleton: true };
  }, [state, useCustomLoadingContent]);

  const errorState = useMemo(() => {
    if (state !== 'error') return undefined;

    return {
      errorTitle: 'Не удалось получить данные',
      errorDescription: 'Попробуйте обновить виджет',
    };
  }, [state]);

  return (
    <div className={styles.wrapperResize}>
      <Widget
        {...args}
        header={header}
        actions={actions}
        state={state}
        wide={wide}
        loadingState={loadingState}
        errorState={errorState}
      />
    </div>
  );
}

export const widget: StoryObj<StoryProps> = {
  render: Template,

  args: {
    headerTitle: 'Widget name',
    headerHref: '#',
    children: `Demo content
For replacement, use the property: ◆Slot... Connect your local component with unique content to this property
The maximum height of the modal window can be equal to the height of the browser view window with margins of 24 px`,
    headerIcon: PlaceholderSVG,
    showHeaderIcon: true,
    state: STATE_VARIANT.default,
    wide: true,
    showActions: true,
    headerVariant: HEADER_VARIANT.title,
    avatarName: 'Denis Villeneuve',
    avatarSubtitle: 'duna@gmail.com',
    useCustomLoadingContent: false,
  },

  argTypes: {
    headerVariant: {
      name: '[Stories]: Header variant',
      options: Object.values(HEADER_VARIANT),
      control: {
        type: 'radio',
      },
    },
    showHeaderIcon: {
      name: '[Stories]: Show header icon',
      if: {
        arg: 'headerVariant',
        eq: HEADER_VARIANT.title,
      },
    },
    headerIcon: {
      name: '[Stories]: Choose header icon',
      options: Object.keys(ICONS),
      mapping: ICONS,
      control: {
        type: 'select',
      },
      if: {
        arg: 'showHeaderIcon',
        eq: true,
      },
    },
    avatarName: {
      name: '[Stories]: Avatar name',
      if: {
        arg: 'headerVariant',
        eq: HEADER_VARIANT.avatar,
      },
    },
    avatarSubtitle: {
      name: '[Stories]: Avatar subtitle',
      if: {
        arg: 'headerVariant',
        eq: HEADER_VARIANT.avatar,
      },
    },
    showActions: {
      name: '[Stories]: Show actions',
    },
    useCustomLoadingContent: {
      name: '[Stories]: Use custom loading content',
      if: {
        arg: 'state',
        eq: STATE_VARIANT.loading,
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
      url: 'https://www.figma.com/design/SZjPEs7Ac3a2wS0HapamrE/branch/U01Z7A8fMuUCGzNEZ9rdqz/Product-UI-Kit?node-id=620-73&m=dev',
    },
  },
};
