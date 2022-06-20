import { css } from '@linaria/core';
import { styled } from '@linaria/react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { useState } from 'react';

import { Button } from '@sbercloud/uikit-product-button';
import { Modal } from '@sbercloud/uikit-product-modal';
import { SwitchRow } from '@sbercloud/uikit-product-switch';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { OverlayPrivate, OverlayPrivateProps } from '../src';

export default {
  title: 'Components/Overlay Private',
  component: OverlayPrivate,
} as Meta;

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fff;
  position: absolute;
  top: 0;
  left: 0;
  padding: 1rem;
`;

const modalOverlayClassName = css`
  background-color: transparent;
`;

const Template: Story<OverlayPrivateProps> = ({ ...args }) => {
  const [isOpen, setOpen] = useState(false);
  const [isEnabled, setEnabled] = useState(true);

  return (
    <Container>
      <Button data-test-id='open_overlay' text='Show overlay' onClick={() => setOpen(true)} />

      {isOpen && isEnabled && <OverlayPrivate {...args} />}

      <Modal
        appElement={document.body}
        description={<SwitchRow title='toggle overlay' checked={isEnabled} onChange={setEnabled} />}
        isOpen={isOpen}
        onRequestClose={() => setOpen(false)}
        overlayClassName={modalOverlayClassName}
      />
    </Container>
  );
};

export const overlayPrivate = Template.bind({});

overlayPrivate.args = {};
overlayPrivate.argTypes = {};
overlayPrivate.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/gCc4XarYocwWbficnQPInC/%F0%9F%93%9A-%5BLIB%5D-Platform-Design-System?node-id=1015%3A1',
  },
  badges: [BADGE.STABLE, BADGE.PRIVATE],
};
