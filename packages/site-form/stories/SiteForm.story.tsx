import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { LAYOUT_TYPE } from '@cloud-ru/uikit-product-utils';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { CompanySuggestion, SiteForm, SiteFormProps, SiteFormValues } from '../src';

const meta: Meta = {
  title: 'Site/Form',
  component: SiteForm,
};
export default meta;

const COMPANIES: CompanySuggestion[] = [
  { id: '1', company: 'Облачные технологии, ООО', inn: '7736279160', address: 'г. Москва' },
  { id: '2', company: 'Ромашка, АО', inn: '7701234567', address: 'г. Санкт-Петербург' },
  { id: '3', company: 'Вектор, ООО', inn: '5408123456', address: 'г. Новосибирск' },
];

const getCompanySuggestions = (query: string) =>
  new Promise<CompanySuggestion[]>(resolve => {
    const search = query.toLowerCase();

    setTimeout(
      () =>
        resolve(COMPANIES.filter(({ company, inn }) => company.toLowerCase().includes(search) || inn.includes(search))),
      300,
    );
  });

type StoryProps = SiteFormProps & {
  withCompanySuggestions: boolean;
};

const Template: StoryFn<StoryProps> = ({ withCompanySuggestions, ...args }) => {
  const [submitted, setSubmitted] = useState<SiteFormValues>();

  return (
    <>
      <SiteForm
        {...args}
        getCompanySuggestions={withCompanySuggestions ? getCompanySuggestions : undefined}
        onSubmit={(values, { reset }) => {
          setSubmitted(values);
          reset();
        }}
      />
      {submitted && <pre data-test-id='submitted-values'>{JSON.stringify(submitted, null, 2)}</pre>}
    </>
  );
};

export const siteForm: StoryObj<StoryProps> = {
  render: Template,
  args: {
    layoutType: LAYOUT_TYPE.Desktop,
    withCompanySuggestions: true,
    loading: false,
    fields: [
      { type: 'name', required: true },
      { type: 'lastName', required: true },
      { type: 'email', required: true },
      { type: 'phone', required: true },
      { type: 'company', required: true },
      { type: 'inn' },
      { type: 'position', size: 'full' },
      { type: 'comment', size: 'full' },
    ],
    content: {
      title: 'Оставьте заявку',
      subtitle: 'Менеджер свяжется с вами в течение рабочего дня',
      buttonTitle: 'Отправить',
    },
    agreement: {
      name: 'site_services_consent',
      withUserAgreement: true,
      withSubscribeForMailing: true,
      isSubscribeForMailingRequired: false,
    },
  },
  argTypes: {
    withCompanySuggestions: {
      name: '[Stories]: getCompanySuggestions',
      control: { type: 'boolean' },
    },
  },
  parameters: {
    readme: {
      sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
    },
    packageName: componentPackage.name,
  },
};
