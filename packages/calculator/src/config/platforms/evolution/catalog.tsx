import { Alert } from '@snack-uikit/alert';
import { Link } from '@snack-uikit/link';

import { CATEGORY, PLATFORM } from '../../../constants';
import { CatalogConfig } from '../../../types';
import { EVOLUTION_PRODUCT } from './constants';

export const EVOLUTION_CATALOG: CatalogConfig['catalog'] = {
  [PLATFORM.Evolution]: [
    {
      id: CATEGORY.Popular,
      label: 'Популярное',
      dataTestId: 'popular',
      visibleProducts: [
        EVOLUTION_PRODUCT.EvolutionCloudServer,
        EVOLUTION_PRODUCT.EvolutionCloudServerFreeTier,
        EVOLUTION_PRODUCT.EvolutionKubernetes,
        EVOLUTION_PRODUCT.EvolutionStorageS3FreeTier,
        EVOLUTION_PRODUCT.EvolutionStorageS3,
      ],
    },
    {
      id: CATEGORY.FreeTier,
      label: 'Free Tier',
      dataTestId: 'free-tier',
      visibleProducts: [
        EVOLUTION_PRODUCT.EvolutionCloudServerFreeTier,
        EVOLUTION_PRODUCT.EvolutionStorageS3FreeTier,
        EVOLUTION_PRODUCT.EvolutionContainerAppsFreeTier,
      ],
      banner: (
        <Alert
          appearance='info'
          outline
          description={
            <>
              Free tier&nbsp;&mdash; это облачные ресурсы, за&nbsp;которые не&nbsp;надо платить. После активации сервис
              останется навсегда бесплатным. Подробнее в&nbsp;
              <Link
                size='m'
                appearance='primary'
                textMode='accent'
                insideText
                target='_blank'
                href='https://cloud.ru/docs/evolution/overview/topics/free-tier.html'
                text='документации'
              />
            </>
          }
        />
      ),
    },
    {
      id: CATEGORY.Computations,
      label: 'Инфраструктура',
      dataTestId: 'computations',
      visibleProducts: [
        EVOLUTION_PRODUCT.EvolutionCloudServer,
        EVOLUTION_PRODUCT.EvolutionCloudServerFreeTier,
        EVOLUTION_PRODUCT.EvolutionBareMetal,
        EVOLUTION_PRODUCT.EvolutionCloudServerGpu,
      ],
    },
    {
      id: CATEGORY.Network,
      label: 'Сети',
      dataTestId: 'network',
      visibleProducts: [EVOLUTION_PRODUCT.EvolutionSnatGateway, EVOLUTION_PRODUCT.EvolutionPublicIp],
    },
    {
      id: CATEGORY.Storage,
      label: 'Хранение и резервное копирование',
      dataTestId: 'storage',
      visibleProducts: [EVOLUTION_PRODUCT.EvolutionStorageS3, EVOLUTION_PRODUCT.EvolutionStorageS3FreeTier],
    },
    {
      id: CATEGORY.Containerization,
      label: 'Контейнеры',
      dataTestId: 'containerization',
      visibleProducts: [
        EVOLUTION_PRODUCT.EvolutionKubernetes,
        EVOLUTION_PRODUCT.EvolutionContainerApps,
        EVOLUTION_PRODUCT.EvolutionContainerAppsFreeTier,
        EVOLUTION_PRODUCT.EvolutionArtifactRegistry,
      ],
    },
    {
      id: CATEGORY.Database,
      label: 'Платформы данных',
      dataTestId: 'database',
      visibleProducts: [
        EVOLUTION_PRODUCT.EvolutionManagedPostgreSQL,
        EVOLUTION_PRODUCT.EvolutionArenadataDb,
        EVOLUTION_PRODUCT.EvolutionManagedTrino,
        EVOLUTION_PRODUCT.EvolutionManagedMetastore,
        EVOLUTION_PRODUCT.EvolutionManagedRedis,
      ],
    },
    {
      id: CATEGORY.ML,
      label: 'ML/AI Инструменты',
      dataTestId: 'ml',
      visibleProducts: [EVOLUTION_PRODUCT.EvolutionMlInference],
    },
  ],
};
