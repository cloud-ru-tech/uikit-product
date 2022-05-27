import { Meta, Story } from '@storybook/react/types-6-0';
import { ReactText, useState } from 'react';

import { Button } from '@sbercloud/uikit-product-button';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { ToasterSmallProps, useToast } from '../src';
import { ToasterSmall } from '../src/components/ToasterSmall';

export default {
  title: 'Components/Toaster/Toaster Small',
  component: ToasterSmall,
} as Meta;

const Template: Story<ToasterSmallProps> = ({ ...args }) => {
  const { openToast, updateToast, types, statuses } = useToast();

  const [currentToasterId, setToasterId] = useState<ReactText>();

  const clickToOpen = async () => {
    const id = await openToast({
      type: types.Small,
      toastProps: args,
    });

    setToasterId(id);
  };

  const clickToUpdate = () => {
    if (!currentToasterId) return;

    updateToast(currentToasterId, {
      type: types.Small,
      toastProps: {
        ...args,
        text: 'updated text',
        status: statuses[types.Small].Error,
      },
      toastOptions: {
        onClose: () => setToasterId(undefined),
      },
    });
  };

  return (
    <>
      <Button data-test-id='trigger-toaster' onClick={clickToOpen} text={`Open ${args.status} toaster`} />

      <br />
      <br />

      <Button
        data-test-id='update-toaster'
        onClick={clickToUpdate}
        text={`Update toaster to ${statuses[types.Small].Error}`}
      />
    </>
  );
};

export const toasterSmall = Template.bind({});
toasterSmall.args = {};
toasterSmall.argTypes = {
  status: {
    defaultValue: useToast.statuses.Small.Success,
    options: Object.values(useToast.statuses.Small),
    control: {
      type: 'radio',
    },
  },
  text: {
    defaultValue: 'Перенос данных завершен',
    control: {
      type: 'text',
    },
  },
};
toasterSmall.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/VVqNc0dufYULpLuwIBB84U/%F0%9F%94%A5%5BLIB%5D-Platform-Design-System?node-id=8412%3A105710',
  },
  badges: [BADGE.STABLE],
};
