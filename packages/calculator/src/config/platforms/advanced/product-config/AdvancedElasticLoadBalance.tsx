import { ArrayControl, CONTROL, FormConfig, ObjectControl, SegmentedControl } from '../../../../components';
import styles from '../../../styles.module.scss';
import { generateBaseItems, getEip } from '../../../utils';

const loadBalancerTypeItem = {
  Shared: 'Shared',
  Dedicated: 'Dedicated',
};

const balancerWorkLevelItem = {
  HTTP: 'HTTP/HTTPS L7',
  TCP: 'TCP/UDP L4',
};

const getElbConfigControls = (
  prefix: string = 'elb',
): {
  loadBalancerType: SegmentedControl;
  accessibilityZoneQuantity: SegmentedControl;
  dedicatedObj: ObjectControl;
} => {
  const accessorKey = {
    loadBalancerType: `${prefix}.type`,
    accessibilityZoneQuantity: `${prefix}.accessibilityZoneQuantity`,
    balancerWorkLevel: `${prefix}.balancerWorkLevel`,
    lcu: `${prefix}.lcu`,
  };

  return {
    loadBalancerType: {
      type: CONTROL.Segmented,
      accessorKey: accessorKey.loadBalancerType,
      defaultValue: loadBalancerTypeItem.Shared,
      items: [
        {
          value: loadBalancerTypeItem.Shared,
          label: 'Общий (бесплатный)',
        },
        {
          value: loadBalancerTypeItem.Dedicated,
          label: 'Выделенный',
        },
      ],
      decoratorProps: {
        label: 'Тип балансировщика нагрузки',
        labelTooltip: (
          <ul className={styles.tip}>
            <li>
              Общий балансировщик нагрузки предоставляется бесплатно, ресурсы развертываются в кластерном режиме и
              распределяются между балансировщиками нагрузки
            </li>
            <li>
              Выделенный балансировщик нагрузки поддерживает двойной стек IPv4/IPv6 и развертывание в разных зонах
              доступности, несколько спецификаций обеспечивают гибкую настройку
            </li>
          </ul>
        ),
      },
    },
    accessibilityZoneQuantity: {
      type: CONTROL.Segmented,
      accessorKey: accessorKey.accessibilityZoneQuantity,
      defaultValue: '1',
      items: generateBaseItems([1, 2, 3, 4]),
      watchedControls: { loadBalancerType: accessorKey.loadBalancerType },
      relateFn: ({ loadBalancerType }) => {
        if (loadBalancerType === loadBalancerTypeItem.Shared) {
          return {
            uiProps: {
              visible: false,
            },
          };
        }
      },
      decoratorProps: {
        label: 'Количество зон доступности развертывания',
      },
    },
    dedicatedObj: {
      type: CONTROL.Object,
      ui: [['balancerWorkLevel', 'lcu']],
      visible: true,
      watchedControls: { loadBalancerType: accessorKey.loadBalancerType },
      relateFn: ({ loadBalancerType }) => {
        if (loadBalancerType === loadBalancerTypeItem.Shared) {
          return {
            visible: false,
          };
        }
      },
      controls: {
        balancerWorkLevel: {
          type: CONTROL.SelectSingle,
          accessorKey: accessorKey.balancerWorkLevel,
          defaultValue: balancerWorkLevelItem.HTTP,
          items: [
            { value: balancerWorkLevelItem.HTTP, label: 'Балансировка нагрузки приложений (HTTP/HTTPS)' },
            { value: balancerWorkLevelItem.TCP, label: 'Балансировка сетевой нагрузки (TCP/UDP)' },
          ],
          decoratorProps: {
            label: 'Уровень работы',
            labelTooltip: (
              <ul className={styles.tip}>
                <li>
                  Запросы направляются на разные внутренние серверы в зависимости от содержимого запроса. Балансировка
                  нагрузки приложений идеально подходит для сценариев, связанных с трафиком HTTP/HTTPS, например для
                  веб-приложений.
                </li>
                <li>
                  Базовая маршрутизация запросов выполняется для трафика TCP/UDP на уровне передачи. Балансировка
                  сетевой нагрузки идеально подходит для таких сценариев, как передача файлов, обмен мгновенными
                  сообщениями и потоковое видео.
                </li>
              </ul>
            ),
          },
        },
        lcu: {
          type: CONTROL.Segmented,
          accessorKey: accessorKey.lcu,
          defaultValue: '10',
          items: generateBaseItems([10, 20, 40, 80, 200, 400]),
          watchedControls: {
            balancerWorkLevel: accessorKey.balancerWorkLevel,
          },
          relateFn: ({ balancerWorkLevel }) => {
            if (balancerWorkLevel === balancerWorkLevelItem.HTTP) {
              return {
                items: generateBaseItems([10, 20, 40, 200, 400]),
              };
            }
          },
          decoratorProps: {
            label: 'LCU',
            labelTooltip: 'Единица ресурса балансировщика нагрузки',
          },
        },
      },
    },
  };
};

const elbTypeControls = getElbConfigControls('configs[0]');

const getArrConfigControl = (multiple?: boolean): ObjectControl => {
  const { loadBalancerType, accessibilityZoneQuantity, dedicatedObj } = getElbConfigControls();

  return {
    type: CONTROL.Object,
    ui: [['loadBalancerType', 'accessibilityZoneQuantity'], 'dedicatedObj'],
    decoratorProps: multiple ? { label: 'Конфигурация' } : undefined,
    controls: {
      loadBalancerType: {
        ...loadBalancerType,
        defaultValue: loadBalancerTypeItem.Dedicated,
        items: [
          {
            value: loadBalancerTypeItem.Shared,
            label: 'Общий (бесплатный)',
            disabled: multiple || false,
          },
          {
            value: loadBalancerTypeItem.Dedicated,
            label: 'Выделенный',
          },
        ],
      },
      accessibilityZoneQuantity,
      dedicatedObj,
    },
  };
};

const getArrayControl = (multiple?: boolean): ArrayControl => ({
  type: CONTROL.Array,
  accessorKey: 'configs',
  addText: 'Добавить балансировщик',
  min: 1,
  max: 3,
  defaultValue: [],
  ui: ['config'],
  controls: {
    config: getArrConfigControl(multiple),
  },
  invertTrashOffset: true,
});

const accessorKey = {
  elbType: 'configs[0].elb.type',
  configs: 'configs',
};

export const ELASTIC_LOAD_BALANCE_FORM_CONFIG: FormConfig = {
  ui: ['elbTypeObj', 'arrObj', 'arrMoreObj', 'eipIsNeeded'],
  controls: {
    elbTypeObj: {
      type: CONTROL.Object,
      ui: ['loadBalancerType'],
      visible: true,
      controls: {
        loadBalancerType: { ...elbTypeControls.loadBalancerType, accessorKey: accessorKey.elbType },
      },
      watchedControls: { elbType: accessorKey.elbType },
      relateFn: ({ elbType }) => {
        if (elbType === loadBalancerTypeItem.Dedicated) {
          return {
            visible: false,
          };
        }
      },
    },
    arrObj: {
      type: CONTROL.Object,
      ui: ['arr'],
      controls: {
        arr: getArrayControl(false),
      },
      visible: false,
      watchedControls: { elbType: accessorKey.elbType, configs: accessorKey.configs },
      relateFn: ({ elbType, configs }) => {
        if (elbType === loadBalancerTypeItem.Dedicated && configs.length === 1) {
          return {
            visible: true,
          };
        }
      },
    },
    arrMoreObj: {
      type: CONTROL.Object,
      ui: ['arr'],
      controls: {
        arr: getArrayControl(true),
      },
      visible: false,
      watchedControls: { elbType: accessorKey.elbType, configs: accessorKey.configs },
      relateFn: ({ elbType, configs }) => {
        if (elbType === loadBalancerTypeItem.Dedicated && configs.length > 1) {
          return {
            visible: true,
          };
        }
      },
    },

    eipIsNeeded: getEip({
      switchKey: 'eipIsNeeded',
      velocityKey: 'eip.velocity',
      specificationKey: 'eip.specification',
      trafficKey: 'eip.traffic',
    }),
  },
};
