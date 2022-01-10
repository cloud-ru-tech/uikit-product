import { css } from '@linaria/core';
import { styled } from '@linaria/react';
import { Meta, Story } from '@storybook/react/types-6-0';
import React, { useState } from 'react';

import { Button } from '@sbercloud/uikit-react-button';
import { Divider } from '@sbercloud/uikit-react-divider';
import { Input } from '@sbercloud/uikit-react-input';
import { Radio, RadioGroup } from '@sbercloud/uikit-react-radio';
import { Select } from '@sbercloud/uikit-react-select';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Drawer, IDrawerProps } from '../src';

export default {
  title: 'Not stable/Drawer',
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

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: -1rem;
`;

const DrawerWrap = styled.div`
  height: calc(100vh - 84px);
  width: 100%;
  position: relative;
  overflow: hidden;
`;

const ButtonWrap = styled.div`
  margin: 1rem;
`;

const radioClassName = css`
  margin: 12px 0;
`;

const selectOptions = [
  {
    value: '2d2b998d-43f6-4213-9ba7-93875a3e4ebc',
    label: 'bucket-ws-ed1fbb37-3355-4d15-8eaa-50929db2e536-id-jajmetf9',
    labelText: 'bucket-ws-ed1fbb37-3355-4d15-8eaa-50929db2e536-id-jajmetf9',
    logo: 'http://192.168.67.113/api/data_catalog/static/s3mlspace.svg',
  },
  {
    value: '5c6cdcdd-7a80-4251-bedd-ed86598006ad',
    label: 'bucket-ws-2d1f3532-cb35-4c80-8dfb-60eede2dc2d4-id-i62x0req',
    labelText: 'bucket-ws-2d1f3532-cb35-4c80-8dfb-60eede2dc2d4-id-i62x0req',
    logo: 'http://192.168.67.113/api/data_catalog/static/s3mlspace.svg',
  },
];

const Template: Story<IDrawerProps> = ({ ...args }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string>('');
  const [radioValue, setRadioValue] = useState<React.ReactText>('');

  return (
    <Wrap>
      <ButtonWrap>
        <Button
          onClick={e => {
            e.stopPropagation();
            setOpen(true);
          }}
          text='Open'
        />
      </ButtonWrap>
      <DrawerWrap id='drawer-wrap'>
        <Drawer
          {...args}
          open={open}
          onClose={() => setOpen(false)}
          onBackClick={() => {}}
          headerText='Header'
          container={args.container ? '#drawer-wrap' : undefined}
          footer={
            <>
              <Button text='Создать деплой' />
              <Button className={buttonStyle} variant={Button.variants.Outline} text='Отмена' />
            </>
          }
        >
          <DrawerContent>
            <Input value={value} onChange={setValue} placeholder='Пример: Project1-bucket106' />
            <Select options={selectOptions} />
            <Divider className={dividerClassName} />
            <RadioGroup onChange={setRadioValue} value={radioValue}>
              <Radio disabled={false} value='story1' label='story1' className={radioClassName} />
              <Radio disabled={false} value='story2' label='story2' className={radioClassName} />
              <Radio disabled={false} value='story3' label='story3' className={radioClassName} />
            </RadioGroup>
            <Input value={value} onChange={setValue} placeholder='Пример: Project1-bucket106' />
            <Divider className={dividerClassName} />
            <RadioGroup onChange={setRadioValue} value={radioValue}>
              <Radio disabled={false} value='story1' label='story1' className={radioClassName} />
              <Radio disabled={false} value='story2' label='story2' className={radioClassName} />
              <Radio disabled={false} value='story3' label='story3' className={radioClassName} />
            </RadioGroup>
            <Input value={value} onChange={setValue} placeholder='Пример: Project1-bucket106' />
            <Divider className={dividerClassName} />
            <RadioGroup onChange={setRadioValue} value={radioValue}>
              <Radio disabled={false} value='story1' label='story1' className={radioClassName} />
              <Radio disabled={false} value='story2' label='story2' className={radioClassName} />
              <Radio disabled={false} value='story3' label='story3' className={radioClassName} />
            </RadioGroup>
            <Input value={value} onChange={setValue} placeholder='Пример: Project1-bucket106' />
            <Divider className={dividerClassName} />
            <RadioGroup onChange={setRadioValue} value={radioValue}>
              <Radio disabled={false} value='story1' label='story1' className={radioClassName} />
              <Radio disabled={false} value='story2' label='story2' className={radioClassName} />
              <Radio disabled={false} value='story3' label='story3' className={radioClassName} />
            </RadioGroup>
            <Input value={value} onChange={setValue} placeholder='Пример: Project1-bucket106' />
            <Divider className={dividerClassName} />
            <RadioGroup onChange={setRadioValue} value={radioValue}>
              <Radio disabled={false} value='story1' label='story1' className={radioClassName} />
              <Radio disabled={false} value='story2' label='story2' className={radioClassName} />
              <Radio disabled={false} value='story3' label='story3' className={radioClassName} />
            </RadioGroup>
          </DrawerContent>
        </Drawer>
      </DrawerWrap>
    </Wrap>
  );
};

export const drawer = Template.bind({});
drawer.args = {};
drawer.argTypes = {
  container: {
    control: {
      type: 'boolean',
    },
  },
};
drawer.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/9UAhwzTGUnOFaczS5Q5v5c/SberCloud-%E2%86%92-Design_System?node-id=2726%3A88020',
  },
};
