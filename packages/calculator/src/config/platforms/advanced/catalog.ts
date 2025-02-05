import { CATEGORY, PLATFORM } from '../../../constants';
import { CatalogConfig } from '../../../types';
import { ADVANCED_PRODUCT } from './constants';

export const ADVANCED_CATALOG: CatalogConfig['catalog'] = {
  [PLATFORM.Advanced]: [
    {
      id: CATEGORY.Popular,
      label: 'Популярное',
      dataTestId: 'popular',
      visibleProducts: [
        ADVANCED_PRODUCT.AdvancedCloudServer,
        ADVANCED_PRODUCT.AdvancedMySqlDataBase,
        ADVANCED_PRODUCT.AdvancedPostgreSqlDatabase,
        ADVANCED_PRODUCT.AdvancedSqlDatabase,
        ADVANCED_PRODUCT.AdvancedObjectStorage,
      ],
    },
    {
      id: CATEGORY.Computations,
      label: 'Вычисления',
      dataTestId: 'computations',
      visibleProducts: [ADVANCED_PRODUCT.AdvancedCloudServer, ADVANCED_PRODUCT.AdvancedServerlessFunctions],
    },
    {
      id: CATEGORY.Network,
      label: 'Сеть',
      dataTestId: 'network',
      visibleProducts: [ADVANCED_PRODUCT.AdvancedNetwork, ADVANCED_PRODUCT.AdvancedElasticLoadBalance],
    },
    {
      id: CATEGORY.Containerization,
      label: 'Контейнеры',
      dataTestId: 'containerization',
      visibleProducts: [ADVANCED_PRODUCT.AdvancedCloudContainerEngine],
    },
    {
      id: CATEGORY.Database,
      label: 'Базы данных',
      dataTestId: 'database',
      visibleProducts: [
        ADVANCED_PRODUCT.AdvancedMySqlDataBase,
        ADVANCED_PRODUCT.AdvancedPostgreSqlDatabase,
        ADVANCED_PRODUCT.AdvancedSqlDatabase,
        ADVANCED_PRODUCT.AdvancedDocumentDatabase,
      ],
    },
    {
      id: CATEGORY.Storage,
      label: 'Хранилище',
      dataTestId: 'storage',
      visibleProducts: [
        ADVANCED_PRODUCT.AdvancedObjectStorage,
        ADVANCED_PRODUCT.AdvancedCloudBackup,
        ADVANCED_PRODUCT.AdvancedScalableFile,
        ADVANCED_PRODUCT.AdvancedDataWarehouseService,
      ],
    },
    {
      id: CATEGORY.Analytic,
      label: 'Аналитика данных',
      dataTestId: CATEGORY.Analytic,
      visibleProducts: [
        ADVANCED_PRODUCT.AdvancedMapReduce,
        ADVANCED_PRODUCT.AdvancedDataLakeInsight,
        ADVANCED_PRODUCT.AdvancedDataAsYouUse,
        ADVANCED_PRODUCT.AdvancedElasticsearch,
      ],
    },
    {
      id: CATEGORY.Development,
      label: 'Разработка',
      dataTestId: 'development',
      visibleProducts: [
        ADVANCED_PRODUCT.AdvancedDmsRabbitMq,
        ADVANCED_PRODUCT.AdvancesDmsKafka,
        ADVANCED_PRODUCT.AdvancedDcsRedis,
        ADVANCED_PRODUCT.AdvancedDcsMemcached,
      ],
    },
  ],
};
