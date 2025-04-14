import { CONTROL, FormConfig } from '../../../../components';

export const EVOLUTION_SNAT_GATEWAY_FORM_CONFIG: FormConfig = {
  ui: [['sNatCount']],
  controls: {
    sNatCount: {
      type: CONTROL.Stepper,
      defaultValue: 1,
      accessorKey: 'sNatCount',
      decoratorProps: {
        label: 'Аренда публичного sNAT-шлюза',
        labelTooltip: 'Предназначен для организации доступа нескольких виртуальных машин в интернет',
      },
      uiProps: {
        min: 1,
        step: 1,
        max: 50,
        postfix: 'шт',
      },
    },
  },
};
