import { styled } from '@linaria/react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { useState } from 'react';

import { Input } from '@sbercloud/uikit-react-input';
import { Radio, RadioGroup } from '@sbercloud/uikit-react-radio';
import { Slider } from '@sbercloud/uikit-react-slider';
import { EXPORT_VARS } from '@sbercloud/uikit-theme';

import { FormField, FormGroup } from '../src';

const { COLORS_DRAWER } = EXPORT_VARS;

export default {
  title: 'Components/Form',
  component: FormGroup,
} as Meta;

const Wrapper = styled.div`
  padding: 24px;
  position: relative;
  background-color: var(${COLORS_DRAWER.BACKGROUND});
`;

const Template: Story = () => {
  const [value, setValue] = useState(8);
  const [limit, setLimit] = useState('unlimited');

  return (
    <Wrapper>
      <FormGroup number={1} title='Общая информация' hint={'Подсказка'}>
        <FormField label='Произвольное число'>
          <Input type='number' value={value} onChange={(e: any) => setValue(Number(e.target.value))} />
        </FormField>

        <FormField>
          <Slider value={value} onChange={setValue} />
        </FormField>

        <FormField label='Ограничение тарифа' hint='Подробнее об ограничениях читайте на сайте'>
          <RadioGroup value={limit} name='limit' onChange={(e: any) => setLimit(e.target.value)}>
            <Radio value='unlimited' label='Неограничено' />
            <Radio value='daily' label='Дневной' description='С 00:00 по 23:59' />
            <Radio value='monthly' label='Месячный' description='Со дня подключения' disabled />
          </RadioGroup>
        </FormField>
      </FormGroup>

      <FormGroup number={2} title='Общая информация' hint={'Подсказка'}>
        <FormField label='Произвольное число'>
          <Input type='number' value={value} onChange={(e: any) => setValue(Number(e.target.value))} />
        </FormField>

        <FormField>
          <Slider value={value} onChange={setValue} />
        </FormField>

        <FormField label='Ограничение тарифа' hint='Подробнее об ограничениях читайте на сайте'>
          <RadioGroup value={limit} name='limit' onChange={(e: any) => setLimit(e.target.value)}>
            <Radio value='unlimited' label='Неограничено' />
            <Radio value='daily' label='Дневной' description='С 00:00 по 23:59' />
            <Radio value='monthly' label='Месячный' description='Со дня подключения' disabled />
          </RadioGroup>
        </FormField>
      </FormGroup>
    </Wrapper>
  );
};

export const formGroup = Template.bind(null);
