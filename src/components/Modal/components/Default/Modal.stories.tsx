import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { withDesign } from 'storybook-addon-designs';

import { Button } from 'components/Button';
// import { toastDanger, toastSuccess, toastInProcess, ToastContainer } from "components/Toast";
// import { Form } from "components/FormControl";
// import { Input } from "components/Input";
// import { Drawer } from "components/Drawer";

import { Modal, IModalProps } from './Modal';
// import { ModalPreview, IModalPreviewProps } from "./ModalPreview";

export default {
  title: 'Components/Modal/Default',
  component: Modal,
} as Meta;

export const Default: Story<IModalProps> = () => {
  const [open, setOpen] = useState(false);
  const openDrawer = (): void => setOpen(true);
  const closeDrawer = (): void => setOpen(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = (): void => setIsOpen(true);
  // const closeModal = (): void => setIsOpen(false);

  return (
    <>
      <Button onClick={openModal}>Open Modal</Button>
      <Modal
        shouldCloseOnOverlayClick={false}
        shouldCloseOnEsc={false}
        overlayOffset={{ top: 44 }}
        zIndex={1}
        isOpen={modalIsOpen}
        // onRequestClose={closeModal}
        appElement={document.body}
        title='Удаление тега'
        description={`Вы действительно хотите удалить тег «ёлочек»?`}
        approve={openDrawer}
        approveText='Drawer'
        // cancel={(): void => {
        //   console.log("cancel");
        // }}
      />
      {/* <Drawer
        open={open}
        onClose={closeDrawer}
        onBackClick={() => console.log("re")}
        headerText={"Header"}
        footer={
          <Button
            onClick={(): void => {
              closeDrawer();
              toastInProcess({
                title: "Создание workspace",
                info: <>Процесс может занять несколько&nbsp;минут</>,
              });
            }}
          >
            Process
          </Button>
        }
      >
        <Form.Group
          number={1}
          label=" Группа"
          labelTooltip="Проверьте корректно ли указаны базовый образ и параметры доступа к S3, а также удалось ли скачать директорию с артефактами или serving-скрипт."
        >
          <Form.Item
            label="Не обязательное поле"
            labelTooltip="Проверьте корректно ли указаны базовый образ и параметры доступа к S3, а также удалось ли скачать директорию с артефактами или serving-скрипт."
          >
            <Input
              value={"test"}
              onChange={(e) => console.log(e.target.value)}
              placeholder={"Пример: Project1-bucket106"}
              allowClear
            ></Input>
          </Form.Item>
        </Form.Group>
      </Drawer>
      <ToastContainer /> */}
    </>
  );
};

// export const modalPreview: Story<IModalPreviewProps> = () => {
//   const [modalIsOpen, setIsOpen] = useState(false);
//   const openModal = (): void => setIsOpen(true);
//   const closeModal = (): void => setIsOpen(false);

//   return (
//     <>
//       {/* <Button onClick={openModal}>Open Modal</Button> */}
//       <ModalPreview
//         isOpen={modalIsOpen}
//         onRequestClose={closeModal}
//         appElement={document.body}
//         title="Screenshot 2020-10-30 at 15.22.41.png"
//         content={
//           <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Wikipedia-logo-v2-en.svg/440px-Wikipedia-logo-v2-en.svg.png" />
//         }
//       />
//     </>
//   );
// };

Default.parameters = {
};
