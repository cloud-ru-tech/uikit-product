import { RocketInterfaceSVG } from '@sbercloud/uikit-product-icons';
import { Tooltip } from '@sbercloud/uikit-product-tooltip';

export const items = [
  { text: 'Профиль', link: 'url' },
  { text: 'Организации', link: 'url1', isActive: true },
];

export const longItems = [
  { text: 'Обзор хранилища', link: 'view' },
  { text: '1-257566c0-de87-484e-be24-94afda5436b8-bucket', link: 'url' },
  { text: '2-257566c0-de87-484e-be24-94afda5436b8-bucket', link: 'url1' },
  { text: '257566c0-de87-484e-be24-94afda5436b8-bucket', link: 'url2' },
  { text: '257566c0-de87-484e-be24-94afda5436b8-bucket', link: 'url3' },
  { text: '257566c0-de87-484e-be24-94afda5436b8-bucket', link: 'url4' },
  { text: '257566c0-de87-484e-be24-94afda5436b8-bucket', link: 'url5' },
  { text: '257566c0-de87-484e-be24-94afda5436b8-bucket', link: 'url6' },
  { text: '257566c0-de87-484e-be24-94afda5436b8-bucket', link: 'url7' },
  { text: '257566c0-de87-484e-be24-94afda5436b8-bucket', link: 'url8' },
  { text: '257566c0-de87-484e-be24-94afda5436b8-bucket', link: 'url9' },
  { text: '257566c0-de87-484e-be24-94afda5436b8-bucket', link: 'url10' },
  { text: '257566c0-de87-484e-be24-94afda5436b8-bucket', link: 'url11' },
  { text: '257566c0-de87-484e-be24-94afda5436b8-bucket', link: 'url12' },
  { text: '257566c0-de87-484e-be24-94afda5436b8-bucket', link: 'url13' },
  { text: '257566c0-de87-484e-be24-94afda5436b8-bucket', link: 'url14' },
  {
    text: 'last-257566c0-de87-484e-be24-94afda5436b8-bucket',
    link: 'url_last',
    isActive: true,
  },
];

export const longSingle = [
  {
    text: 'last-257566c0-de87-484e-be24-94afda5436b8-bucket',
    link: 'url_last',
    isActive: true,
  },
];

export const longTwice = [
  {
    text: 'first-257566c0-de87-484e-be24-94afda5436b8-bucket',
    link: 'url_first',
  },
  {
    text: 'last-257566c0-de87-484e-be24-94afda5436b8-bucket',
    link: 'url_last',
    isActive: true,
  },
];

export const docker = [
  { text: 'Docker registry', link: 'url_first' },
  { text: 'alpine', link: 'url_second' },
  {
    text: 'sha256:e83c5993870954be9986451775e258dc723d6cca77cb0313c061d67958b91bb2',
    link: 'url_last',
    isActive: true,
  },
];

export const fm = [
  {
    text: (
      <Tooltip content={'virgin page'} placement={Tooltip.placements.BottomStart}>
        <RocketInterfaceSVG />
      </Tooltip>
    ),
    key: 'VIRGIN_PAGE',
    link: {},
    isActive: false,
    fullVisible: true,
  },
  {
    text: 'Обзор хранилища',
    key: '/file-manager/',
    link: {},
    isActive: false,
  },
  {
    text: 'bucket-user-19ea8cbb-43e1-4d31-b76f-b2a5e5a9c058-id-ntm0w79t',
    key: 'bucket-user-19ea8cbb-43e1-4d31-b76f-b2a5e5a9c058-id-ntm0w79t',
    link: {
      bucket: 'bucket-user-19ea8cbb-43e1-4d31-b76f-b2a5e5a9c058-id-ntm0w79t',
    },
    isActive: false,
  },
  {
    text: 'aicloud',
    key: 'aicloudaicloud/',
    link: {
      bucket: 'bucket-user-19ea8cbb-43e1-4d31-b76f-b2a5e5a9c058-id-ntm0w79t',
      path: 'aicloud/',
    },
    isActive: false,
  },
  {
    text: 'airflow',
    key: 'airflowaicloud/airflow/',
    link: {
      bucket: 'bucket-user-19ea8cbb-43e1-4d31-b76f-b2a5e5a9c058-id-ntm0w79t',
      path: 'aicloud/airflow/',
    },
    isActive: false,
  },
  {
    text: 'airflow',
    key: 'airflowaicloud/airflow/airflow/',
    link: {
      bucket: 'bucket-user-19ea8cbb-43e1-4d31-b76f-b2a5e5a9c058-id-ntm0w79t',
      path: 'aicloud/airflow/airflow/',
    },
    isActive: false,
  },
  {
    text: 'www',
    key: 'wwwaicloud/airflow/airflow/www/',
    link: {
      bucket: 'bucket-user-19ea8cbb-43e1-4d31-b76f-b2a5e5a9c058-id-ntm0w79t',
      path: 'aicloud/airflow/airflow/www/',
    },
    isActive: false,
  },
  {
    text: 'templates',
    key: 'templatesaicloud/airflow/airflow/www/templates/',
    link: {
      bucket: 'bucket-user-19ea8cbb-43e1-4d31-b76f-b2a5e5a9c058-id-ntm0w79t',
      path: 'aicloud/airflow/airflow/www/templates/',
    },
    isActive: true,
  },
];
