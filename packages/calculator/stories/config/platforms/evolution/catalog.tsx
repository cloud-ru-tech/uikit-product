import { CatalogConfig, CATEGORY, PLATFORM } from '@sbercloud/uikit-product-calculator';
import { Alert } from '@snack-uikit/alert';
import { Link } from '@snack-uikit/link';

import { EVOLUTION_PRODUCT } from './constants';

export const EVOLUTION_CATALOG: CatalogConfig['catalog'] = {
  [PLATFORM.Evolution]: [
    {
      id: CATEGORY.Popular,
      label: 'Популярное',
      dataTestId: 'popular',
      visibleProducts: [
        EVOLUTION_PRODUCT.EvolutionCloudServerFreeTier,
        EVOLUTION_PRODUCT.EvolutionBareMetal,
        EVOLUTION_PRODUCT.EvolutionStorageS3FreeTier,
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
      visibleProducts: [EVOLUTION_PRODUCT.EvolutionBareMetal],
    },
  ],
};
