export const EVOLUTION_PRODUCT = {
  EvolutionCloudServer: 'evolutionCloudServer',
  EvolutionCloudServerGpu: 'evolutionCloudServerGpu',
  EvolutionCloudServerFreeTier: 'evolutionCloudServerFreeTier',
  EvolutionKubernetes: 'evolutionKubernetes',
  EvolutionStorageS3FreeTier: 'evolutionStorageS3FreeTier',
  EvolutionStorageS3: 'evolutionStorageS3',
  EvolutionManagedPostgreSQL: 'evolutionPostgreSql',
  EvolutionBareMetal: 'evolutionBareMetal',
  EvolutionContainerApps: 'evolutionContainerApps',
  EvolutionContainerAppsFreeTier: 'evolutionContainerAppsFreeTier',
  EvolutionArenadataDb: 'evolutionArenadataDb',
  EvolutionMlInference: 'evolutionMlInference',
  EvolutionSnatGateway: 'evolutionSnatGateway',
  EvolutionManagedMetastore: 'evolutionManagedMetastore',
  EvolutionPublicIp: 'evolutionPublicIp',
  EvolutionDNS: 'evolutionDNS',
  EvolutionArtifactRegistry: 'evolutionArtifactRegistry',
  EvolutionManagedTrino: 'evolutionManagedTrino',
  EvolutionManagedRedis: 'evolutionManagedRedis',
  EvolutionManagedSpark: 'evolutionManagedSpark',
  EvolutionLoadBalancer: 'evolutionLoadBalancer',
} as const;

const GuaranteedPartItem = {
  '10': '10',
  '30': '30',
  '100': '100',
  '120': '120',
};

export const guaranteedPartToVCpuMap = {
  [GuaranteedPartItem[10]]: [1, 2, 4, 8],
  [GuaranteedPartItem[30]]: [1, 2, 4, 8, 16, 24, 32],
  [GuaranteedPartItem[100]]: [1, 2, 4, 8, 16, 24, 32, 64],
};

export const guaranteedPartVCpuToRamMap: Record<string, Record<string, number[]>> = {
  [GuaranteedPartItem[10]]: {
    '1': [1, 2],
    '2': [4],
    '4': [8, 16, 32],
    '8': [16, 32],
  },
  [GuaranteedPartItem[30]]: {
    '1': [1, 2],
    '2': [4],
    '4': [8, 16, 32, 64],
    '8': [16, 32, 64],
    '16': [32, 64],
    '24': [48],
    '32': [64],
  },
  [GuaranteedPartItem[100]]: {
    '1': [1, 2],
    '2': [4],
    '4': [8, 16, 32, 64],
    '8': [16, 32, 64, 128],
    '16': [32, 64, 128, 256],
    '24': [32, 48],
    '32': [64, 128, 256],
    '64': [128, 256],
  },
};

export enum DeploymentMode {
  Standard = 'standart',
  Business = 'business',
}

export const deploymentModes = [
  {
    label: 'Стандарт',
    value: DeploymentMode.Standard,
    description: 'Для тестирования и несложных приложений',
  },
  {
    label: 'Бизнес',
    value: DeploymentMode.Business,
    description: 'Для высоконагруженных сервисов',
  },
];
