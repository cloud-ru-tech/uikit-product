import { useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { Button } from 'components/Button';
// import { toastDanger, toastSuccess, toastInProcess, ToastContainer } from "components/Toast";
// import { Form } from "components/FormControl";
// import { Input } from "components/Input";
// import { Drawer } from "components/Drawer";

import { Modal, IModalProps } from './Modal';

export default {
  title: 'Components/Modal',
  component: Modal,
} as Meta;

const Template: Story<IModalProps> = ({ ...args }) => {
  const [, /* open */ setOpen] = useState(false);
  const openDrawer = (): void => setOpen(true);
  // const closeDrawer = (): void => setOpen(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = (): void => setIsOpen(true);
  const closeModal = (): void => setIsOpen(false);

  return (
    <>
      <Button onClick={openModal}>Open Modal</Button>
      <Modal
        shouldCloseOnOverlayClick={false}
        shouldCloseOnEsc={false}
        zIndex={1}
        // onRequestClose={closeModal}
        appElement={document.body}
        title='Удаление тега'
        description='Вы действительно хотите удалить тег «ёлочек»?'
        approve={openDrawer}
        approveText='Drawer'
        {...args}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
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

export const modal = Template.bind({});
modal.args = {};
modal.argTypes = {};
