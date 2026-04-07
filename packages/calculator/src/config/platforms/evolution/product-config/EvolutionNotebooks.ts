import { CONTROL, FormConfig } from '../../../../components';
import { WORKING_HOURS_ITEMS, WorkingHoursSpecification } from '../../../../constants';
import {
  DEFAULT_NOTEBOOKS_CONFIG_VALUE,
  getDefaultNotebooksConfigParams,
  getMaxWorkingHoursAmount,
  getNotebookConfigParamsByInstance,
} from '../../../utils';

const DEFAULT_CONFIG_PARAMS = getDefaultNotebooksConfigParams();

const configItems = [
  { value: 'ncpu.medium.4', label: '1 vCPU, 4 ГБ RAM' },
  { value: 'ncpu.large.4', label: '2 vCPU, 8 ГБ RAM' },
  { value: 'ncpu.xlarge.4', label: '4 vCPU, 16 ГБ RAM' },
  { value: 'ncpu.2xlarge.4', label: '8 vCPU, 32 ГБ RAM' },
  { value: 'nv100.xlarge.16', label: '1 V100 GPU, 3 vCPU, 63 ГБ RAM' },
];

export const EVOLUTION_NOTEBOOKS_CONFIG: FormConfig = {
  ui: [['config'], ['workingHours', 'workingHoursSpecification']],
  controls: {
    config: {
      type: CONTROL.SelectSingle,
      accessorKey: 'config',
      items: configItems,
      defaultValue: DEFAULT_NOTEBOOKS_CONFIG_VALUE,
      decoratorProps: { label: 'Конфигурация' },
      onChangeFn: (value, setValue) => {
        const params = getNotebookConfigParamsByInstance(value);

        if (!params) {
          setValue([['config', value]]);

          return;
        }

        setValue([
          ['config', value],
          ['vCpuCoreCount', params.vCpuCoreCount],
          ['ramAmount', params.ramAmount],
          ['hasGpu', params.hasGpu],
          ['gpuCount', params.gpuCount],
          ['gpuModel', params.gpuModel],
        ]);
      },
    },
    vCpuCoreCount: {
      type: CONTROL.Stepper,
      accessorKey: 'vCpuCoreCount',
      defaultValue: DEFAULT_CONFIG_PARAMS.vCpuCoreCount,
      uiProps: { visible: false, min: 0 },
      decoratorProps: { label: 'vCPU cores' },
    },
    ramAmount: {
      type: CONTROL.Stepper,
      accessorKey: 'ramAmount',
      defaultValue: DEFAULT_CONFIG_PARAMS.ramAmount,
      uiProps: { visible: false, min: 0 },
      decoratorProps: { label: 'RAM (GiB)' },
    },
    hasGpu: {
      type: CONTROL.Toggle,
      accessorKey: 'hasGpu',
      defaultValue: DEFAULT_CONFIG_PARAMS.hasGpu,
      uiProps: { visible: false },
      decoratorProps: { label: 'GPU' },
    },
    gpuCount: {
      type: CONTROL.Stepper,
      accessorKey: 'gpuCount',
      defaultValue: DEFAULT_CONFIG_PARAMS.gpuCount,
      uiProps: { visible: false, min: 0 },
      decoratorProps: { label: 'GPU count' },
    },
    gpuModel: {
      type: CONTROL.SelectSingle,
      accessorKey: 'gpuModel',
      items: [{ value: 'V100', label: 'V100' }],
      defaultValue: DEFAULT_CONFIG_PARAMS.gpuModel,
      uiProps: { visible: false },
      decoratorProps: { label: 'GPU model' },
    },
    workingHours: {
      type: CONTROL.Stepper,
      accessorKey: 'workingHours',
      defaultValue: 1,
      uiProps: { min: 1 },
      decoratorProps: { label: 'Время работы' },
      watchedControls: { period: 'workingHoursSpecification' },
      relateFn: ({ period }) => {
        const maxWorkingAmount = getMaxWorkingHoursAmount(period, {
          hour: 24,
          day: 31,
          month: 12,
        });

        return {
          uiProps: {
            max: maxWorkingAmount,
          },
        };
      },
    },
    workingHoursSpecification: {
      type: CONTROL.SelectSingle,
      accessorKey: 'workingHoursSpecification',
      defaultValue: WorkingHoursSpecification.Hour,
      items: WORKING_HOURS_ITEMS,
      uiProps: { showClearButton: false, searchable: false },
      decoratorProps: { label: 'Период' },
      onChangePeriod: (period, setValue) => {
        setValue([['workingHoursSpecification', period]]);
      },
      canChangeWholePricePeriod: true,
    },
  },
};
