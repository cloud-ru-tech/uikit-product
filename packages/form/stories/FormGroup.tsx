import { css } from '@linaria/core';
import { styled } from '@linaria/react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { ReactText, useState } from 'react';

import { Input } from '@sbercloud/uikit-product-input';
import { Radio, RadioGroup } from '@sbercloud/uikit-product-radio';
import { Select } from '@sbercloud/uikit-product-select';
import { Slider } from '@sbercloud/uikit-product-slider';
import { DEPRECATED_EXPORT_VARS } from '@sbercloud/uikit-product-theme';
import { TruncateString } from '@sbercloud/uikit-product-truncate-string';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { FormField, FormGroup } from '../src';

const { COLORS_DRAWER } = DEPRECATED_EXPORT_VARS;

export default {
  title: 'Not stable/Form/Form Group',
  component: FormGroup,
} as Meta;

const Wrapper = styled.div`
  padding: 24px;
  position: relative;
  background-color: var(${COLORS_DRAWER.BACKGROUND});
`;

const RadioClassName = css`
  margin: 12px 0;
`;

const Template: Story = () => {
  const [value, setValue] = useState(8);
  const [limit, setLimit] = useState<ReactText>('unlimited');

  return (
    <Wrapper>
      <FormGroup number={1} title='Общая информация' hint={{ content: 'Подсказка' }}>
        <FormField label='Произвольное число'>
          <Input value={value.toString()} onChange={x => setValue(Number(x))} />
        </FormField>

        <FormField label='Выбрать'>
          <Select
            options={[
              {
                value: 'bucket-user-19ea8cbb-43e1-4d31-b76f-b2a5e5a9c058-id-ntm0w79t',
                label: (
                  <TruncateString
                    key='bucket-user-19ea8cbb-43e1-4d31-b76f-b2a5e5a9c058-id-ntm0w79t'
                    text='bucket-user-19ea8cbb-43e1-4d31-b76f-b2a5e5a9c058-id-ntm0w79t'
                  />
                ),
              },
            ]}
          />
        </FormField>

        <FormField>
          <Slider value={value} onChange={setValue} />
        </FormField>

        <FormField label='Ограничение тарифа' hint={{ content: 'Подробнее об ограничениях читайте на сайте' }}>
          <RadioGroup value={limit} onChange={setLimit}>
            <Radio value='unlimited' label='Неограниченно' className={RadioClassName} />
            <Radio value='daily' label='Дневной' className={RadioClassName} />
            <Radio value='monthly' label='Месячный' disabled className={RadioClassName} />
          </RadioGroup>
        </FormField>
      </FormGroup>

      <FormGroup number={2} title='Общая информация' hint={{ content: 'Подсказка' }}>
        <FormField label='Произвольное число'>
          <Input value={value.toString()} onChange={x => setValue(Number(x))} />
        </FormField>

        <FormField>
          <Slider value={value} onChange={setValue} />
        </FormField>

        <FormField label='Ограничение тарифа' hint={{ content: 'Подробнее об ограничениях читайте на сайте' }}>
          <RadioGroup value={limit} onChange={setLimit}>
            <Radio value='unlimited' label='Неограниченно' className={RadioClassName} />
            <Radio value='daily' label='Дневной' className={RadioClassName} />
            <Radio value='monthly' label='Месячный' disabled className={RadioClassName} />
          </RadioGroup>
        </FormField>
      </FormGroup>
    </Wrapper>
  );
};

export const formGroup = Template.bind(null);
formGroup.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    type: 'figma',
    //TODO
    url: 'https://pocka.github.io/storybook-addon-designs/?path=/story/docs-quick-start--page',
  },
};
