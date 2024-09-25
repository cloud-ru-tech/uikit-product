import { ArgTypes } from '@storybook/react';

import { MODE, POSITION, SIZE } from '../src/constants';
import { DrawerHeaderProps } from '../src/helperComponents';
import image from './image.jpg';
import { DrawerCustomStoryProps, DrawerStoryProps } from './types';

export const IMAGE_PROP: DrawerHeaderProps['image'] = {
  src: image,
  alt: 'test image',
};

export const CONTROLLED_DRAWER_ID = 'drawer-controlled';

export const IMAGE_DRAWER_ID = 'drawer-image';

export const DEFAULT_ARGS: DrawerCustomStoryProps | DrawerStoryProps = {
  open: false,
  onClose: () => {},
  title: 'Headline',
  titleTooltip: 'tooltip',
  subtitle: 'Subheading',
  content: (
    <>
      Demo content
      <br />
      <br />
      For replacement, use the property: ◆Slot... Connect your local component with unique content to this property
      <br />
      <br />
      The maximum height of the modal window can be equal to the height of the browser view window with margins of 24 px
      <br />
      <br />
      Demo content
      <br />
      <br />
      For replacement, use the property: ◆Slot... Connect your local component with unique content to this property
      <br />
      <br />
      The maximum height of the modal window can be equal to the height of the browser view window with margins of 24 px
      <br />
      <br />
      Demo content
      <br />
      <br />
      For replacement, use the property: ◆Slot... Connect your local component with unique content to this property
      <br />
      <br />
      The maximum height of the modal window can be equal to the height of the browser view window with margins of 24 px
      <br />
      <br />
      Demo content
      <br />
      <br />
      For replacement, use the property: ◆Slot... Connect your local component with unique content to this property
      <br />
      <br />
      The maximum height of the modal window can be equal to the height of the browser view window with margins of 24 px
      <br />
      <br />
      Demo content
      <br />
      <br />
      For replacement, use the property: ◆Slot... Connect your local component with unique content to this property
      <br />
      <br />
      The maximum height of the modal window can be equal to the height of the browser view window with margins of 24 px
    </>
  ),
  mode: MODE.Regular,
  position: POSITION.Right,
  size: SIZE.S,
  approveButton: {
    label: 'Primary',
  },
  cancelButton: {
    label: 'Secondary',
  },
  additionalButton: {
    label: 'Tertiary',
  },
};

export const ARG_TYPES: ArgTypes<DrawerCustomStoryProps> = {
  open: {
    control: {
      disable: true,
    },
  },
  onClose: {
    control: {
      disable: true,
    },
  },
  title: {
    type: 'string',
  },
  titleTooltip: {
    type: 'string',
  },
  content: {
    type: 'string',
  },
};
