import { CONTROL, FormConfig } from '../../../../components';
import { generateInstanceConfigItems, getDisk, getObs } from '../../../utils';

const nodeValueItems = generateInstanceConfigItems([
  [4, 32],
  [8, 64],
  [32, 256],
  [64, 512],
]);

export const DATA_WAREHOUSE_SERVICE_FORM_CONFIG: FormConfig = {
  ui: [
    ['nodeValue', 'nodeCount'],
    ['evs', 'obs'],
  ],
  controls: {
    nodeValue: {
      type: CONTROL.SelectSingle,
      accessorKey: 'node.value',
      defaultValue: nodeValueItems[0].value,
      items: nodeValueItems,
      decoratorProps: {
        label: 'Конфигурация узла',
      },
    },
    nodeCount: {
      type: CONTROL.Stepper,
      accessorKey: 'node.count',
      defaultValue: 3,
      decoratorProps: {
        label: 'Количество узлов (нод)',
      },
      uiProps: {
        min: 3,
        max: 256,
        postfix: 'Шт',
      },
    },
    evs: getDisk({
      space: {
        accessorKey: 'evs.systemDisk.diskSpace',
        defaultValue: 20,
        label: 'Горячее хранилище',
        decoratorProps: {
          labelTooltip: 'Хранилище на базе сервиса EVS',
        },
        uiProps: {
          min: 20,
          max: 2_000,
        },
        watchedControls: { nodeValue: 'node.value' },
        relateFn: ({ nodeValue }) => {
          if (nodeValue === nodeValueItems[1].value) {
            return {
              uiProps: {
                min: 100,
                max: 4_000,
              },
            };
          }
          if (nodeValue === nodeValueItems[2].value) {
            return {
              uiProps: {
                min: 100,
                max: 16_000,
              },
            };
          }
          if (nodeValue === nodeValueItems[3].value) {
            return {
              uiProps: {
                min: 100,
                max: 32_000,
              },
            };
          }
        },
      },
      specification: {
        accessorKey: 'evs.systemDisk.specification',
        defaultValue: 'SSD',
        uiProps: {
          disabled: true,
        },
      },
    }),
    obs: getObs({
      space: {
        defaultValue: 1,
      },
      units: {},
    }),
  },
};
