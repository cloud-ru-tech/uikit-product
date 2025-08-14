import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { ButtonFilled } from '@snack-uikit/button';
import { Slider } from '@snack-uikit/slider';
import { Tabs } from '@snack-uikit/tabs';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { MobileDrawerCustom, MobileDrawerCustomProps } from '../src';
import { MODAL_MODE, MODE, POSITION, SIZE } from '../src/constants';
import { Size } from '../src/types';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Mobile/Drawer/Drawer Custom',
  component: MobileDrawerCustom,
};
export default meta;

type DrawerCustomStoryProps = Omit<MobileDrawerCustomProps, 'size' | 'nestedDrawer'> & {
  sizePredefined?: Size;
  sizeCustom?: string | number;
};

const tabsData = [
  { value: 'tab1', label: 'Tab one', disabled: false, counter: 12 },
  { value: 'tab2', label: 'Second', disabled: false },
  { value: 'tab3', label: 'Disabled', disabled: true },
  { value: 'tab4', label: 'Very very long name of tab', disabled: false },
  { value: 'tab5', label: 'tab', disabled: false },
  { value: 'tab6', label: 's', disabled: false },
  { value: 'tab7', label: 'some tab', disabled: false },
  { value: 'tab8', label: 'Еще', disabled: false },
  { value: 'tab9', label: 'Последний', disabled: false },
  { value: 'tab10', label: 'Tab 10' },
  { value: 'tab11', label: 'Tab 11' },
  { value: 'tab12', label: 'Tab 12' },
  { value: 'tab13', label: 'Tab 13' },
  { value: 'tab14', label: 'Tab 14' },
  { value: 'tab15', label: 'Tab 15' },
  { value: 'tab16', label: 'Tab 16' },
];

function Template({ open: openProp, sizePredefined, sizeCustom, ...args }: DrawerCustomStoryProps) {
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  return (
    <div>
      <ButtonFilled label={'Open drawer'} onClick={() => setOpen(!open)} />
      <MobileDrawerCustom {...args} size={sizeCustom || sizePredefined} open={openProp ?? open} onClose={handleClose}>
        <MobileDrawerCustom.Header title={'Title'} />
        <Tabs>
          <Tabs.TabBar>
            {tabsData.map(props => (
              <Tabs.Tab key={props.value} {...props} />
            ))}
          </Tabs.TabBar>
          {tabsData.map(({ value }) => (
            <Tabs.TabContent className={styles.tabContent} key={value} value={value}>
              Content of {value}
              <Slider min={1} max={10} step={1} marks={{ 1: 1, 4: 4, 7: 7, 10: 10 }} />
            </Tabs.TabContent>
          ))}
        </Tabs>
      </MobileDrawerCustom>
    </div>
  );
}

export const drawerCustom: StoryObj<DrawerCustomStoryProps> = {
  render: Template,

  args: {
    sizePredefined: SIZE.S,
    sizeCustom: undefined,
    position: POSITION.Left,
    mode: MODE.Regular,
    modalMode: MODAL_MODE.Regular,
    swipeEnabled: true,
    closeButtonEnabled: true,
    outline: false,
  },

  argTypes: {
    sizePredefined: {
      name: 'size predefined',
      control: {
        type: 'radio',
      },
      options: Object.values(SIZE),
      defaultValue: SIZE.S,
      if: {
        arg: 'sizeCustom',
        truthy: false,
      },
    },
    sizeCustom: {
      name: 'size custom (string | number)',
      defaultValue: undefined,
      control: {
        type: 'text',
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
      url: 'https://www.figma.com/design/SZjPEs7Ac3a2wS0HapamrE/branch/Cmwj5iKjN1YQVClS16yh36/Product-components?node-id=12611-169116&t=5MBjI3XDufBuMseR-0&m=auto',
    },
  },
};
