import { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';

import { ButtonFilled } from '@snack-uikit/button';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { MobileDrawerCustom, MobileDrawerCustomProps } from '../src';
import { MODAL_MODE, POSITION, SIZE } from '../src/constants';
import { Size } from '../src/types';

const meta: Meta = {
  title: 'Mobile/Drawer/Drawer Custom',
  component: MobileDrawerCustom,
};
export default meta;

type DrawerCustomStoryProps = Omit<MobileDrawerCustomProps, 'size' | 'nestedDrawer'> & {
  sizePredefined?: Size;
  sizeCustom?: string | number;
};

function Template({ open: openProp, sizePredefined, sizeCustom, ...args }: DrawerCustomStoryProps) {
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  return (
    <div>
      <ButtonFilled label={'Open drawer'} onClick={() => setOpen(!open)} />
      <MobileDrawerCustom {...args} size={sizeCustom || sizePredefined} open={openProp ?? open} onClose={handleClose} />
    </div>
  );
}

export const drawerCustom: StoryFn<DrawerCustomStoryProps> = Template.bind({});

drawerCustom.args = {
  sizePredefined: SIZE.S,
  sizeCustom: undefined,
  position: POSITION.Left,
  modalMode: MODAL_MODE.Regular,
  swipeEnabled: true,
  closeButtonEnabled: true,
};

drawerCustom.argTypes = {
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
};

drawerCustom.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  packageName: componentPackage.name,
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/design/SZjPEs7Ac3a2wS0HapamrE/branch/Cmwj5iKjN1YQVClS16yh36/Product-components?node-id=12611-169116&t=5MBjI3XDufBuMseR-0&m=auto',
  },
};
