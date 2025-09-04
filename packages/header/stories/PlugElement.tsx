import { ReactNode } from 'react';

import { extractSupportProps } from '@sbercloud/uikit-product-utils';

import styles from './styles.module.scss';

type PlugProps = {
  label: ReactNode;
  height?: number;
  width?: number;
  dataTestId?: string;
};

export function Plug({ label, height, width, ...rest }: PlugProps) {
  return (
    <div className={styles.plug} style={{ height, width }} {...extractSupportProps(rest)}>
      {label}
    </div>
  );
}

export const DATA_TEST_ID = {
  headerLayout: 'headerLayout',
  banners: 'banners',
  productSelect: 'product-select',
  projectSelect: 'projectSelect',
  projectSelectMobile: 'projectSelectMobile',
  toolbar: 'toolbar',
  breadcrumbs: 'breadcrumbs',
  breadcrumbsMobile: 'breadcrumbs-mobile',
  logo: 'logo',
  menu: 'menu',
};

export function Banners() {
  return <Plug label='Banners' height={88} dataTestId={DATA_TEST_ID.banners} />;
}
export function ProductSelect() {
  return <Plug label='Product Select' height={56} dataTestId={DATA_TEST_ID.productSelect} />;
}

export function ProjectSelect() {
  return <Plug label='Project Select' height={40} width={176} dataTestId={DATA_TEST_ID.projectSelect} />;
}

export function ProjectSelectMobile() {
  return <Plug label='Project Select' height={56} dataTestId={DATA_TEST_ID.projectSelectMobile} />;
}

export function Breadcrumbs() {
  return <Plug label='Breadcrumbs' height={40} width={300} dataTestId={DATA_TEST_ID.breadcrumbs} />;
}

export function BreadcrumbsMobile() {
  return <Plug label='Breadcrumbs' height={32} width={300} dataTestId={DATA_TEST_ID.breadcrumbsMobile} />;
}

export function Logo() {
  return <Plug label='Logo' height={40} dataTestId={DATA_TEST_ID.logo} />;
}

export function Menu() {
  return <Plug label='Menu' height={40} dataTestId={DATA_TEST_ID.menu} />;
}

export function Toolbar() {
  return <Plug label='Toolbar' height={40} width={160} dataTestId={DATA_TEST_ID.toolbar} />;
}
