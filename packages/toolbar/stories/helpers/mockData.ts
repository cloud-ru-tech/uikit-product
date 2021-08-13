import { TFilterValueType } from '@sbercloud/uikit-react-filter';

const groupedServices = [
  {
    label: 'S3 Connectors',
    open: true,
    options: [
      {
        value: 'AmazonS3',
        label: 'Amazon S3',
      },
      { value: 'Ds', label: 'AICloud' },
      {
        value: 'GoogleCloudstorage',
        label: 'Google Cloud storage',
      },
    ],
  },
  {
    label: 'Custom',
    options: [
      {
        value: 'AmazonS3',
        label: 'Amazon S3',
        labelText: 'Amazon S3',
      },
      {
        value: 'BigQuery',
        label: 'BigQuery',
        labelText: 'BigQuery',
      },
    ],
  },
];

export const defOpt = [
  {
    value: 'connector_type_group',
    label: 'Коннектор',
    sourceData: groupedServices,
    includeConditions: ['eq', 'neq'],
  },
];

export const defValue: TFilterValueType[] = [
  {
    id: 'connector_type_group',
    value: ['Ds'],
    condition: 'eq',
  },
];
