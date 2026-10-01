import { CONTROL, FormConfig } from '../../../../components';

export const EVOLUTION_WORKFLOW_STUDIO_FORM_CONFIG: FormConfig = {
  ui: [['runsPerMonth']],
  controls: {
    runsPerMonth: {
      type: CONTROL.Stepper,
      defaultValue: 50,
      accessorKey: 'runsPerMonth',
      decoratorProps: {
        label: 'Количество запусков шагов в месяц (50 бесплатно)',
        labelTooltip: '1 деплой в Services = состоит минимум из 3 шагов',
      },
      uiProps: {
        min: 0,
        step: 10,
        max: 30000,
        postfix: 'шт',
      },
    },
  },
};
