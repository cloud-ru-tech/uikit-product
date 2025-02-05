import { CONTROL, FormConfig } from '../../../../components';
import styles from '../../../styles.module.scss';
import { generateCpuItems, generateRamItems, getDisk } from '../../../utils';
import {
  cascadeLakeServerGenItem,
  ecsSpecificationGenCpuToRamMap,
  ecsSpecificationGenToCpuMap,
  EcsSpecificationItem,
  ecsSpecificationItems,
  ecsSpecificationToGenMap,
  EcsSpecificationType,
  iceLakeServerGenItem,
  OsItem,
  osItems,
  ServerGenType,
} from './AdvancedCloudServer';

const DeploymentZonesNumberItem = {
  '1AZ': '1AZ',
  '3AZ': '3AZ',
};

const deploymentZonesNumberItems = [
  {
    value: DeploymentZonesNumberItem['1AZ'],
    label: '1AZ',
  },
  {
    value: DeploymentZonesNumberItem['3AZ'],
    label: '3AZ',
  },
];

export const CLOUD_CONTAINER_ENGINE_FORM_CONFIG: FormConfig = {
  ui: [['deploymentZonesNumber', 'masterNodeNumber'], 'masterNodeNumberAlert', 'ecs'],
  controls: {
    deploymentZonesNumber: {
      type: CONTROL.Segmented,
      accessorKey: 'cce.deploymentZonesNumber',
      defaultValue: DeploymentZonesNumberItem['1AZ'],
      items: deploymentZonesNumberItems,
      decoratorProps: {
        label: 'Количество зон развертывания мастер-нод',
        labelTooltip:
          'При использовании режима 3AZ будут созданы три мастер-узла, а при отказе одного мастер-узла будет создаваться кластер.',
      },
    },
    masterNodeNumber: {
      type: CONTROL.Segmented,
      accessorKey: 'cce.masterNodeNumber',
      defaultValue: '50',
      items: generateCpuItems([50, 200, 1000]),
      decoratorProps: {
        label: 'Максимальное количество узлов',
        labelTooltip: ' Количество серверов (виртуальных машин), на которых разворачивают и запускают контейнеры',
      },
      watchedControls: { deploymentZonesNumber: 'cce.deploymentZonesNumber' },
      relateFn: ({ deploymentZonesNumber }) => {
        if (deploymentZonesNumber === DeploymentZonesNumberItem['3AZ']) {
          return {
            items: generateCpuItems([50, 200, 1000, 2000]),
          };
        }
      },
    },
    masterNodeNumberAlert: {
      type: CONTROL.Alert,
      uiProps: {
        description: 'При выборе 1 000 узлов и более активируется Kubernetes Turbo.',
        link: {
          target: '_blank',
          href: 'https://cloud.ru/docs/cce/ug/topics/overview__comparison.html',
          text: 'Сравнение Kubernetes и Kubernetes Turbo',
        },
        visible: false,
      },
      watchedControls: { masterNodeNumber: 'cce.masterNodeNumber' },
      relateFn: ({ masterNodeNumber }) => {
        if (Number(masterNodeNumber) >= 1000) {
          return {
            uiProps: {
              visible: true,
            },
          };
        }
      },
    },

    ecs: {
      type: CONTROL.ToggleObject,
      switchKey: 'cce.vmServerNeeded',
      decoratorProps: {
        label: 'Узлы для запуска контейнера',
      },
      control: {
        type: CONTROL.Object,
        ui: [
          ['ecsSpecification', 'ecsGen'],
          ['ecsCpu', 'ecsRam'],
          ['counter'],
          ['evsSystemDisk'],
          ['evsAdditionalDisks'],
        ],
        controls: {
          ecsSpecification: {
            type: CONTROL.SelectSingle,
            accessorKey: 'ecs.specification',
            defaultValue: EcsSpecificationItem.GeneralPurpose,
            items: ecsSpecificationItems,
            decoratorProps: {
              label: 'Спецификация узлов',
              labelTooltip: (
                <ul className={styles.tip}>
                  <li>General-Purpose для веб-серверов и приложений с небольшой рабочей нагрузкой;</li>
                  <li>Dedicated General-Purpose для баз данных и приложений средней и высокой нагрузки;</li>
                  <li>Memory-Optimized для приложений, обрабатывающих большие объемы данных;</li>
                  <li>Disk-intensive для Big Data и распределённых вычислений;</li>
                  <li>Ultra-high I/O для ElasticSearch и высокопроизводительных реляционных баз данных.</li>
                </ul>
              ),
            },
          },
          ecsOs: {
            type: CONTROL.Segmented,
            accessorKey: 'ecs.os',
            defaultValue: OsItem.Linux,
            items: osItems,
            decoratorProps: {
              label: 'Операционная система',
            },
          },
          counter: {
            type: CONTROL.Stepper,
            accessorKey: 'counter',
            defaultValue: 1,
            decoratorProps: {
              label: 'Количество узлов',
            },
            uiProps: {
              min: 1,
              max: 99,
            },
          },
          ecsCpu: {
            type: CONTROL.SelectSingle,
            accessorKey: 'ecs.cpu',
            defaultValue: '1',
            items: generateCpuItems([1, 2, 4, 8]),
            decoratorProps: {
              label: 'Количество vCPU',
              labelTooltip: 'Виртуальный процессор',
            },
            watchedControls: { ecsSpecification: 'ecs.specification', serverGen: 'ecs.gen' },
            relateFn: ({
              ecsSpecification,
              serverGen,
            }: {
              ecsSpecification: EcsSpecificationType;
              serverGen: ServerGenType;
            }) => {
              const items = ecsSpecificationGenToCpuMap?.[ecsSpecification]?.[serverGen] || [];

              if (items?.length > 0) {
                return {
                  items: generateCpuItems(items),
                };
              }
            },
          },

          ecsRam: {
            type: CONTROL.Segmented,
            accessorKey: 'ecs.ram',
            defaultValue: '1',
            items: generateRamItems([1, 2, 4]),
            decoratorProps: {
              label: 'Объём RAM',
              labelTooltip: 'Оперативная память',
            },
            watchedControls: { ecsSpecification: 'ecs.specification', serverGen: 'ecs.gen', cpu: 'ecs.cpu' },
            relateFn: ({
              ecsSpecification,
              serverGen,
              cpu,
            }: {
              ecsSpecification: EcsSpecificationType;
              serverGen: ServerGenType;
              cpu: string;
            }) => {
              const items = ecsSpecificationGenCpuToRamMap?.[ecsSpecification]?.[serverGen]?.[cpu];

              if (items?.length > 0) {
                return {
                  items: generateRamItems(items),
                };
              }
            },
          },

          ecsGen: {
            type: CONTROL.Segmented,
            accessorKey: 'ecs.gen',
            defaultValue: cascadeLakeServerGenItem.value,
            items: [cascadeLakeServerGenItem, iceLakeServerGenItem],
            decoratorProps: {
              label: 'Поколение',
              labelTooltip: 'Поколение сервера',
            },
            watchedControls: { ecsSpecification: 'ecs.specification' },
            relateFn: ({ ecsSpecification }: { ecsSpecification: EcsSpecificationType }) => ({
              items: ecsSpecificationToGenMap[ecsSpecification] || [],
            }),
          },

          evsSystemDisk: getDisk({
            space: {
              accessorKey: 'evs.systemDisk.diskSpace',
              defaultValue: 50,
              uiProps: {
                min: 50,
                max: 1_530,
              },
            },
            specification: {
              accessorKey: 'evs.systemDisk.specification',
            },
          }),

          evsAdditionalDisks: {
            type: CONTROL.Array,
            max: 23,
            accessorKey: 'evs.additionalDisks',
            defaultValue: [],
            addText: 'Добавить диск',
            ui: ['disk'],
            controls: {
              disk: getDisk({
                space: {
                  accessorKey: 'diskSpace',
                  defaultValue: 100,
                  uiProps: {
                    min: 100,
                    max: 32_760,
                  },
                },
                specification: {
                  accessorKey: 'specification',
                },
              }),
            },
          },
        },
      },
    },

    // Hidden
    ecsHidden: {
      type: 'stepper',
      accessorKey: 'ecs',
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      defaultValue: {
        specification: 'General-Purpose (ECS)',
        os: 'Linux', // Essentials только для partners
        gen: '6',
        cpu: '1',
        ram: '1',
        frequency: '2.6',
        assuredBandwidth: '0.1',
        maxBandwidth: '0.8',
        pps: '100',
      },
      decoratorProps: {
        label: '',
      },
      uiProps: {
        visible: false,
      },
    },
  },
};
