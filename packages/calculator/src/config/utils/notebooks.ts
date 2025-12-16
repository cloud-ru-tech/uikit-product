export type NotebookConfigParams = {
  vCpuCoreCount: number;
  ramAmount: number;
  hasGpu: boolean;
  gpuCount: number;
  gpuModel?: string;
};

export const DEFAULT_NOTEBOOKS_CONFIG_VALUE = 'ncpu.medium.4';

export function getNotebookConfigParamsByInstance(config: string): NotebookConfigParams {
  switch (config) {
    case 'ncpu.medium.4':
      return { vCpuCoreCount: 1, ramAmount: 4, hasGpu: false, gpuCount: 0, gpuModel: undefined };
    case 'ncpu.large.4':
      return { vCpuCoreCount: 2, ramAmount: 8, hasGpu: false, gpuCount: 0, gpuModel: undefined };
    case 'ncpu.xlarge.4':
      return { vCpuCoreCount: 4, ramAmount: 16, hasGpu: false, gpuCount: 0, gpuModel: undefined };
    case 'ncpu.2xlarge.4':
      return { vCpuCoreCount: 8, ramAmount: 32, hasGpu: false, gpuCount: 0, gpuModel: undefined };
    case 'nv100.xlarge.16':
      return { vCpuCoreCount: 3, ramAmount: 63, hasGpu: true, gpuCount: 1, gpuModel: 'V100' };
    default:
      return { vCpuCoreCount: 1, ramAmount: 4, hasGpu: false, gpuCount: 0, gpuModel: undefined };
  }
}

export function getDefaultNotebooksConfigParams(): NotebookConfigParams {
  const params = getNotebookConfigParamsByInstance(DEFAULT_NOTEBOOKS_CONFIG_VALUE);

  return params;
}
