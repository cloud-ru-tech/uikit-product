import { useState } from 'react';
import { css } from '@linaria/core';
import { styled } from '@linaria/react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { Input, Divider, Button, Radio, RadioGroup } from 'components';

import { Drawer, IDrawerProps } from './Drawer';

export default {
  title: 'Components/Drawer',
  component: Drawer,
} as Meta;

const buttonStyle = css`
  margin-left: 12px;
`;

const DrawerContent = styled.div`
  padding: 12px;
`;

const dividerClassName = css`
  margin: 24px -12px;
`;

const Template: Story<IDrawerProps> = ({ ...args }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open</Button>
      <Drawer
        {...args}
        open={open}
        onClose={() => setOpen(false)}
        onBackClick={() => {}}
        headerText='Header'
        footer={
          <>
            <Button>Создать деплой</Button>
            <Button className={buttonStyle} variant='outlined'>
              Отмена
            </Button>
          </>
        }
      >
        <DrawerContent>
          <Input
            label='Label'
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder='Пример: Project1-bucket106'
          />
          <Divider color='middle' className={dividerClassName} />
          <RadioGroup
            name='stories'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setValue(e.target.value)
            }
            value={value}
          >
            <Radio
              disabled={false}
              value='story1'
              label='story1'
              description='description1'
            />
            <Radio
              disabled={false}
              value='story2'
              label='story2'
              description='description2'
            />
            <Radio
              disabled={false}
              value='story3'
              label='story3'
              description='description3'
            />
          </RadioGroup>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export const drawer = Template.bind({});
drawer.args = {};
drawer.parameters = {};
