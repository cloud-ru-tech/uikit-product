import { CONTROL, FormConfig } from '../../../../components';
import { generateRamItems, getObs } from '../../../utils';

export const DSC_MEMCACHED_FORM_CONFIG: FormConfig = {
  ui: ['instanceType', ['cacheSize', 'instancesCount'], 'alert', ['obs']],
  controls: {
    instanceType: {
      type: CONTROL.Carousel,
      defaultValue: 'Master/Standby',
      accessorKey: 'instanceType',
      items: [
        {
          value: 'Master/Standby',
          label: 'Master/Standby',
          description:
            'Каждый экземпляр работает на двух узлах кэша - один главный (для чтения/записи данных) и один резервный (реплицирует данныев режиме реального времени и берет на себя управление в случае сбоя основного кэш-узла)',
        },
        {
          value: 'Single-Node',
          label: 'Single-Node',
          description:
            'Каждый экземпляр работает только на одном узле кэша. В основном используются для временного хранения данных и не подходят для сценариев обслуживания с высокой надежностью, поддерживают интенсивные параллельные операции чтения/записи, но не обеспечивают сохранение данных',
        },
      ],
      decoratorProps: {
        label: 'Тип инстанса',
      },
    },
    cacheSize: {
      type: CONTROL.Segmented,
      accessorKey: 'cacheSize',
      defaultValue: '2',
      items: generateRamItems([2, 4, 8, 16, 32, 64]),
      decoratorProps: {
        label: 'Объем кэша',
        labelTooltip:
          'Брокер — это приложение, которое преобразует сообщения и выступает посредником между другими приложениями',
      },
    },
    instancesCount: {
      type: CONTROL.Stepper,
      accessorKey: 'instancesCount',
      defaultValue: 1,
      decoratorProps: {
        label: 'Количество инстансов',
      },
      uiProps: {
        min: 1,
        max: 100,
        postfix: 'Шт',
      },
    },
    alert: {
      type: CONTROL.Alert,
      uiProps: {
        description: 'Хранилище используется под бэкапы. Рекомендуем указывать объем не меньше объема кэша',
      },
      accessorKey: 'backup',
    },
    obs: getObs({
      space: {
        accessorKey: 'obs.space',
      },
      units: {
        accessorKey: 'obs.unitsOfCalculation',
      },
    }),
  },
};
