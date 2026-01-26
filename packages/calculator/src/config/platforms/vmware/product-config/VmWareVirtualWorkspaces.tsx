import { Link } from '@snack-uikit/link';

import { CONTROL, FormConfig } from '../../../../components';

const networkSpeedValues = [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 2000, 3000, 5000, 10000];

const OsTypeItem = {
  Desktop: 'Desktop',
  Linux: 'Linux',
};

const osTypeItems = [
  {
    value: OsTypeItem.Desktop,
    label: 'Десктопная',
  },
  {
    value: OsTypeItem.Linux,
    label: 'Linux',
  },
];

const TariffPlanItem = {
  Advanced: 'Advanced',
};

const tariffPlanItems = [
  {
    value: TariffPlanItem.Advanced,
    label: 'Продвинутый',
    description: 'Удаленные рабочие столы будут развернуты на десктопной операционной системе или Linux',
  },
];

export const VM_WARE_VIRTUAL_WORKSPACES_FORM_CONFIG: FormConfig = {
  ui: [
    ['osType'],
    'tariffPlan',
    ['workSpacesCount'],
    ['vcpuCount'],
    ['ramVolume'],
    ['ssdVolume'],
    ['videoMemoryVolume'],
    ['networkSpeed'],
  ],
  controls: {
    osType: {
      type: CONTROL.Segmented,
      accessorKey: 'vdi.osType',
      defaultValue: OsTypeItem.Desktop,
      items: osTypeItems,
      decoratorProps: {
        label: 'Операционная система',
      },
      onChangeFn: (value, setValue) => {
        const minRam = value === OsTypeItem.Linux ? 2 : 4;
        setValue([
          ['vdi.osType', value],
          ['vdi.ramVolume', minRam],
        ]);
      },
    },
    tariffPlan: {
      type: CONTROL.ToggleCards,
      defaultValue: TariffPlanItem.Advanced,
      items: tariffPlanItems,
      accessorKey: 'vdi.tariffPlan',
      decoratorProps: {
        label: 'Тарифный план',
        labelTooltip: (
          <>
            Подробнее о возможностях каждого
            <br />
            из тарифов читайте в{' '}
            <Link
              target='_blank'
              href='https://cloud.ru/docs/vdi/ag/topics/tariffs'
              textMode='accent'
              text='документации'
              appearance='invert-neutral'
            />
          </>
        ),
      },
      uiProps: {
        visible: false,
      },
    },
    workSpacesCount: {
      type: CONTROL.Stepper,
      accessorKey: 'vdi.workSpacesCount',
      defaultValue: 1,
      decoratorProps: {
        label: 'Количество рабочих мест',
      },
      uiProps: {
        min: 1,
        max: 2_000,
        postfix: 'Шт',
      },
    },
    vcpuCount: {
      type: CONTROL.Stepper,
      accessorKey: 'vdi.vcpuCount',
      defaultValue: 2,
      decoratorProps: {
        label: 'Количество ядер vCPU',
      },
      uiProps: {
        min: 2,
        max: 18,
        postfix: 'Шт',
      },
    },
    ramVolume: {
      type: CONTROL.Stepper,
      accessorKey: 'vdi.ramVolume',
      decoratorProps: {
        label: 'Объем оперативной памяти RAM',
      },
      defaultValue: 2,
      uiProps: {
        min: 4,
        max: 64,
        postfix: 'ГБ',
      },
      watchedControls: { osType: 'vdi.osType' },
      relateFn: ({ osType }) => {
        switch (osType) {
          case OsTypeItem.Linux: {
            return {
              uiProps: {
                min: 2,
                max: 64,
              },
            };
          }
          case OsTypeItem.Desktop:
          default: {
            return {
              uiProps: {
                min: 4,
                max: 64,
              },
            };
          }
        }
      },
    },
    ssdVolume: {
      type: CONTROL.Stepper,
      accessorKey: 'vdi.ssdVolume',
      defaultValue: 40,
      decoratorProps: {
        label: 'Жесткий диск SSD',
      },
      uiProps: {
        min: 40,
        max: 40_000,
        postfix: 'ГБ',
      },
    },
    videoMemoryVolume: {
      type: CONTROL.Slider,
      accessorKey: 'vdi.videoMemoryVolume',
      decoratorProps: {
        label: 'Объем видеопамяти A40 vGPU',
      },
      items: [0, 2, 4, 8, 12, 16, 24, 48],
      uiProps: {
        step: 1,
        postfix: 'ГБ',
      },
    },
    networkSpeed: {
      type: CONTROL.Stepper,
      accessorKey: 'vdi.networkSpeed',
      defaultValue: 0,
      decoratorProps: {
        label: 'Скорость доступа в интернет',
      },
      uiProps: {
        min: 0,
        max: 10_000,
        postfix: 'Мбит/с',
        allowedValues: networkSpeedValues,
      },
    },
  },
};
