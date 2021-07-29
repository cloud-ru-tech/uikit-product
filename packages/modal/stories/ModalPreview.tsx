import { styled } from '@linaria/react';
import { Button } from '@sbercloud/uikit-react-button';
import { DEPRECATED_EXPORT_VARS } from '@sbercloud/uikit-theme';
import { Meta, Story } from '@storybook/react/types-6-0';
import { useMemo, useRef, useState } from 'react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { ModalPreview, ModalPreviewProps } from '../src';

export default {
  title: 'Not stable/Modal/Modal Preview',
  component: ModalPreview,
} as Meta;

const { COLORS } = DEPRECATED_EXPORT_VARS;

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 50vh;
  margin-top: 24px;
  border: 1px solid var(${COLORS.GRAY_3});
`;

const Template: Story<ModalPreviewProps & { withParentNode: boolean }> = ({ withParentNode, ...args }) => {
  const wrapperEl = useRef<HTMLDivElement>(null);
  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = (): void => setIsOpen(true);
  const closeModal = (): void => setIsOpen(false);

  const parentSelector = useMemo(() => {
    if (wrapperEl.current) {
      return () => wrapperEl.current as HTMLElement;
    }

    return undefined;
  }, [wrapperEl.current]);

  const modal = (
    <ModalPreview
      {...args}
      parentSelector={parentSelector}
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      title='Screenshot 2020-10-30 at 15.22.41.png'
      additionalActions={
        <Button rounded size={Button.sizes.s} variant={Button.variants.Outlined}>
          Импорт
        </Button>
      }
      content={
        <img
          src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Wikipedia-logo-v2-en.svg/440px-Wikipedia-logo-v2-en.svg.png'
          alt=''
        />
      }
    />
  );

  return (
    <>
      <Button onClick={openModal}>Open Modal</Button>
      {withParentNode ? <Container ref={wrapperEl}>{modal}</Container> : modal}
    </>
  );
};

export const modalPreview = Template.bind({});
modalPreview.args = {};
modalPreview.argTypes = {
  withParentNode: {
    defaultValue: true,
    name: '[Stories]: show modal in parent node',
    control: {
      type: 'boolean',
    },
  },
};
modalPreview.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/Eo7qqu8rH4Eg2RGYUrmjra/SberCloud-%E2%86%92-Design_System-iter-2-violet?node-id=4167%3A149885',
  },
};
