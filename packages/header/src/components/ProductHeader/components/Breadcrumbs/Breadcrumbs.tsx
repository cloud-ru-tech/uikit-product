import { Fragment, ReactNode } from 'react';

import styles from './styles.modules.scss';

type Breadcrumb = {
  label: string;
  icon?: ReactNode;
  onClick?(): void;
};

export type BreadcrumbsProps = {
  options: Breadcrumb[];
  separator?: string;
};

// TODO: to delete
export function Breadcrumbs({ options, separator = '/' }: BreadcrumbsProps) {
  return (
    <span className={styles.breadcrumbs}>
      {options.map((option, index) => (
        <Fragment key={`${option.label}_${index}`}>
          {index > 0 && <span className={styles.separator}>{separator}</span>}

          <span className={styles.breadcrumb} onClick={option.onClick} tabIndex={0} role={'link'}>
            {option.icon && <span className={styles.icon}>{option.icon}</span>}

            <span className={styles.label}>{option.label}</span>
          </span>
        </Fragment>
      ))}
    </span>
  );
}
