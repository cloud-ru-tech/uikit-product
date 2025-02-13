import { CONTROL, FormConfig } from '../../../../components';
import { generateInstanceConfigItems } from '../../../utils';

const configItems = generateInstanceConfigItems([[120, 480]]);

export const EVOLUTION_CONTAINER_APPS_FREE_TIER_CONFIG: FormConfig = {
  ui: ['serviceAlert', ['config']],
  controls: {
    serviceAlert: {
      type: CONTROL.Alert,
      uiProps: {
        description: 'Не тарифицируется каждый месяц',
      },
    },
    config: {
      type: CONTROL.SelectSingle,
      accessorKey: 'config',
      items: configItems,
      defaultValue: '120 480',
      uiProps: {
        disabled: true,
      },
      decoratorProps: {
        label: 'Конфигурация',
      },
    },
  },
};
