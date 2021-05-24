export default [
  {
    value: 'bucket-user-23236724-ec4e-443d-b66a-9fdd83515a9c-id-3xkie8id',
    label: 'bucket-user-23236724-ec4e-443d-b66a-9fdd83515a9c-id-3xkie8id',
  },
  {
    value: 'bigquery',
    label: 'BigQuery',
  },
  {
    value: 'hdfs',
    label: 'HDFS',
  },
  {
    value: 'hive',
    label: 'Hive',
  },
  {
    value: 'mssql',
    label: 'MS SQL',
  },
  {
    value: 'mysql',
    label: 'MySQL',
  },
  {
    value: 'postgresql',
    label: 'PostgreSQL',
  },
  {
    value: 's3amazon',
    label: 'S3 Amazon',
  },
];

export const groupedServices = [
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
