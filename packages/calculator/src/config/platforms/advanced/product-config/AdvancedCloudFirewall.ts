import { CONTROL, FormConfig } from '../../../../components';

export const CLOUD_FIREWALL_FORM_CONFIG: FormConfig = {
  ui: [['traffic']],
  controls: {
    traffic: {
      type: CONTROL.Stepper,
      accessorKey: 'traffic',
      defaultValue: 1,
      decoratorProps: {
        label: 'Объем защищенного трафика',
      },
      uiProps: {
        min: 1,
        max: 900,
        postfix: 'ГБ',
      },
    },
  },
};
