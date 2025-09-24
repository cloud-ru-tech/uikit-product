import { Typography } from '@snack-uikit/typography';

import { ArticleProduct } from '../../Products';
import styles from './styles.module.scss';

type ServiceLightProps = ArticleProduct;

export function ServiceLight(props: ServiceLightProps) {
  const { icon, name, href, onClick } = props;

  return (
    <a className={styles.serviceLight} href={href} onClick={onClick}>
      <img src={icon} alt={`Иконка-${name}`} width={24} height={24} />
      <Typography.SansBodyM>{name}</Typography.SansBodyM>
    </a>
  );
}
