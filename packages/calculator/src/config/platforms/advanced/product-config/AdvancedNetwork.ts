import { CONTROL, FormConfig } from '../../../../components';

const NatSpecificationItem = {
  Small: 'NAT Gateway Small',
  Middle: 'NAT Gateway Middle',
  Large: 'NAT Gateway Large',
  ExtraLarge: 'NAT Gateway Extra large',
};

const natSpecificationItems = [
  {
    value: NatSpecificationItem.Small,
    label: '10 000 (Small)',
  },
  {
    value: NatSpecificationItem.Middle,
    label: '50 000 (Middle)',
  },
  {
    value: NatSpecificationItem.Large,
    label: '200 000 (Large)',
  },
  {
    value: NatSpecificationItem.ExtraLarge,
    label: '1 000 000 (Extra large)',
  },
];

export const NETWORK_FORM_CONFIG: FormConfig = {
  ui: [['ipQuantity'], 'nat', 'vpn', 'vpce'],
  controls: {
    ipQuantity: {
      type: CONTROL.Stepper,
      accessorKey: 'eip.ipQuantity',
      defaultValue: 1,
      decoratorProps: {
        label: 'Количество IP',
        labelTooltip: 'Количество публичных («белых») IP-адресов',
      },
      uiProps: {
        min: 1,
        max: 20,
      },
    },

    nat: {
      type: CONTROL.ToggleObject,
      switchKey: 'natIsNeeded',
      decoratorProps: {
        label: 'Шлюз NAT (Network Address Translation)',
        labelTooltip: 'Позволяет вычислительным ресурсам в частной подсети подключаться к интернету',
      },
      control: {
        type: CONTROL.Object,
        ui: [['specification']],
        controls: {
          specification: {
            type: CONTROL.SelectSingle,
            accessorKey: 'nat.specification',
            defaultValue: NatSpecificationItem.Small,
            items: natSpecificationItems,
            decoratorProps: {
              label: 'Количество соединений',
              labelTooltip: 'Тарификация зависит от выбранного количества инсталляций',
            },
          },
        },
      },
    },
    vpn: {
      type: CONTROL.ToggleObject,
      switchKey: 'vpnIsNeeded',
      decoratorProps: {
        label: 'VPN-соединение (Virtual Private Network)',
        labelTooltip: 'Зашифрованное интернет-соединение между сетью и виртуальным облаком',
      },
      control: {
        type: CONTROL.Object,
        ui: [['vpnAmount']],
        controls: {
          vpnAmount: {
            type: CONTROL.Stepper,
            accessorKey: 'vpn.vpnAmount',
            defaultValue: 1,
            decoratorProps: {
              label: 'Количество соединений',
            },
            uiProps: {
              min: 1,
              max: 9_999_999_999,
              showHint: false,
            },
          },
        },
      },
    },

    vpce: {
      type: CONTROL.ToggleObject,
      switchKey: 'vpceIsNeeded',
      decoratorProps: {
        label: 'VPC Endpoint',
        labelTooltip: 'Полностью изолированная и безопасная частная сеть',
      },
      control: {
        type: CONTROL.Object,
        ui: [['vpceAmount']],
        controls: {
          vpceAmount: {
            type: CONTROL.Stepper,
            accessorKey: 'vpce.vpceAmount',
            defaultValue: 1,
            decoratorProps: {
              label: 'Количество инсталляций',
            },
            uiProps: {
              min: 1,
              max: 9_999_999_999,
              showHint: false,
            },
          },
        },
      },
    },

    // HIDDEN
    eip: {
      type: 'stepper',
      accessorKey: 'eip',
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      defaultValue: {
        ipQuantity: 1,
        specification: 'velocity',
        traffic: 1,
        velocity: 100,
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
