import { Meta, StoryFn } from '@storybook/react';
import { useMemo, useState } from 'react';

import { PlaceholderSVG } from '@sbercloud/uikit-product-icons';
import { ButtonFunction } from '@snack-uikit/button';
import { Counter } from '@snack-uikit/counter';
import { Status } from '@snack-uikit/status';
import { Typography } from '@snack-uikit/typography';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { MobilePageServices, MobilePageServicesProps } from '../src';
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
}): MobilePageServicesProps['sidebar'] => ({
  selected,
  onSelect: setSelected,
  items: [
    { id: 0, label: 'Инстансы', afterContent: <Counter value={5} size='m' /> },
    { id: 1, label: 'Мониторинг', disabledReason: 'У вас нет прав, чтобы зайти сюда' },
    { id: 2, label: 'Администрирование' },
    { id: 3, label: 'Сеть' },
    { id: 4, label: 'Инстансы' },
    { id: 5, label: 'Мониторинг' },
    { id: 6, label: 'Администрирование' },
    { id: 7, label: 'Сеть' },
    { id: 8, label: 'Пункт с очень-очень длинным названием' },
    { id: 9, label: 'Инстансы' },
    { id: 10, label: 'Мониторинг' },
    { id: 11, label: 'Администрирование' },
    { id: 12, label: 'Сеть' },
    { id: 13, label: 'Инстансы' },
    { id: 14, label: 'Мониторинг' },
    { id: 15, label: 'Администрирование' },
    { id: 16, label: 'Сеть' },
  ],
});

type PageServicesStoryProps = MobilePageServicesProps & {
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
      <MobilePageServices
        {...args}
        sidebar={showSidebar ? sidebar : undefined}
        actions={showActions ? args.actions : undefined}
        beforeHeadline={showBeforeHeadline ? args.beforeHeadline : undefined}
        afterHeadline={showAfterHeadline ? args.afterHeadline : undefined}
        subHeader={showSubheader ? args.subHeader : undefined}
      >
        {args.children}
      </MobilePageServices>
    </div>
  );
}

export const pageServices: StoryFn<PageServicesStoryProps> = Template.bind({});

pageServices.args = {
  title: 'Lorem ipsum dolor',
  actions: [
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
};

pageServices.argTypes = {
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
};

pageServices.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  packageName: componentPackage.name,
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/design/SZjPEs7Ac3a2wS0HapamrE/branch/Cmwj5iKjN1YQVClS16yh36/Product-components?node-id=78-9689&m=auto',
  },
};
