import { CONTROL, FormConfig } from '../../../../components';

export const EVOLUTION_PUBLIC_IP_FORM_CONFIG: FormConfig = {
  ui: [['directCount', 'floatingCount']],
  controls: {
    directCount: {
      type: CONTROL.Stepper,
      defaultValue: 0,
      accessorKey: 'directCount',
      decoratorProps: {
        label: 'Аренда прямого IP-адреса',
        labelTooltip:
          'Публичный IP, который позволяет подключаться к интернету напрямую. Можно назначить только виртуальной машине',
      },
      uiProps: {
        min: 0,
        step: 1,
        max: 50,
        postfix: 'шт',
      },
    },
    floatingCount: {
      type: CONTROL.Stepper,
      accessorKey: 'floatingCount',
      defaultValue: 0,
      decoratorProps: {
        label: 'Аренда плавающего IP-адреса',
        labelTooltip:
          'Публичный IP, который позволяет подключаться к интернету через подсеть. Можно назначить ресурсам, которые подключены к подсети',
      },
      uiProps: {
        min: 0,
        step: 1,
        max: 50,
        postfix: 'шт',
      },
    },
  },
};
