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
      visibleProducts: [EVOLUTION_PRODUCT.EvolutionCloudServerFreeTier, EVOLUTION_PRODUCT.EvolutionStorageS3FreeTier],
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
      label: 'Вычисления',
      dataTestId: 'computations',
      visibleProducts: [
        EVOLUTION_PRODUCT.EvolutionCloudServer,
        EVOLUTION_PRODUCT.EvolutionCloudServerFreeTier,
        EVOLUTION_PRODUCT.EvolutionBareMetal,
      ],
    },
    {
      id: CATEGORY.Containerization,
      label: 'Контейнеризация',
      dataTestId: 'containerization',
      visibleProducts: [EVOLUTION_PRODUCT.EvolutionKubernetes],
    },
    {
      id: CATEGORY.Storage,
      label: 'Хранилище',
      dataTestId: 'storage',
      visibleProducts: [EVOLUTION_PRODUCT.EvolutionStorageS3, EVOLUTION_PRODUCT.EvolutionStorageS3FreeTier],
    },
    {
      id: CATEGORY.Database,
      label: 'Базы данных',
      dataTestId: 'database',
      visibleProducts: [EVOLUTION_PRODUCT.EvolutionManagedPostgreSQL],
    },
  ],
};
