import { useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { styled } from '@linaria/react';
import { css } from '@linaria/core';

import {
  Divider,
  RadioGroup,
  Radio,
  Input,
  FormField,
  Select,
  Slider,
} from 'components';

import { COLORS_DRAWER } from 'theme/color/vars';

import { FormGroup } from './FormGroup';

export default {
  title: 'Components/Form',
  component: FormGroup,
} as Meta;

const Wrapper = styled.div`
  padding: 24px;
  background-color: var(${COLORS_DRAWER.BACKGROUND});
`;

const dividerClassName = css`
  margin: 0 -24px;
`;

const Template: Story = () => {
  const [value, setValue] = useState(8);
  const [limit, setLimit] = useState('unlimited');
  const [selected, setSelected] = useState({ value: 'ipv4', label: 'IPv4' });

  return (
    <Wrapper>
      <Divider className={dividerClassName} />

      <FormGroup number={1} title='Общая информация'>
        <FormField label='Произвольное число'>
          <Input
            type='number'
            value={value}
            onChange={e => setValue(Number(e.target.value))}
          />
        </FormField>

        <FormField>
          <Slider value={value} onChange={setValue} />
        </FormField>

        <FormField
          label='Ограничение тарифа'
          hint='Подробнее об ограничениях читайте на сайте'
        >
          <RadioGroup
            value={limit}
            name='limit'
            onChange={e => setLimit(e.target.value)}
          >
            <Radio value='unlimited' label='Неограничено' />
            <Radio
              value='daily'
              label='Дневной'
              description='С 00:00 по 23:59'
            />
            <Radio
              value='monthly'
              label='Месячный'
              description='Со дня подключения'
              disabled
            />
          </RadioGroup>
        </FormField>
      </FormGroup>

      <Divider className={dividerClassName} />

      <FormGroup
        number={2}
        title='Настройки'
        hint='Укажите необходимые значения для запуска'
      >
        <FormField label='IPv4/IPv6' error='Некорректный формат'>
          <Select
            type='large'
            value={selected}
            onChange={setSelected}
            options={[
              { value: 'ipv4', label: 'IPv4' },
              { value: 'ipv6', label: 'IPv6' },
            ]}
          />
        </FormField>
      </FormGroup>

      <Divider className={dividerClassName} />
    </Wrapper>
  );
};

export const formGroup = Template.bind(null);
