import { CONTROL, FormConfig } from '../../../../components';

const configItems = [
  {
    value: '2, 4 (Freetier)',
    label: '2 vCPU / 4 RAM (Freetier)',
  },
  {
    value: '2, 4',
    label: '2 vCPU / 4 RAM',
  },
];

export const EVOLUTION_MANAGED_BI: FormConfig = {
  ui: ['serviceAlert', ['name']],
  controls: {
    serviceAlert: {
      type: CONTROL.Alert,
      uiProps: {
        description: 'Бесплатно предоставляем первый инстанс в заданной конфигурации',
      },
      accessorKey: 'tarification',
    },
    name: {
      type: CONTROL.SelectSingle,
      accessorKey: 'name',
      items: configItems,
      defaultValue: '2, 4 (freetier)',
      decoratorProps: {
        label: 'Конфигурация',
      },
    },
  },
};
