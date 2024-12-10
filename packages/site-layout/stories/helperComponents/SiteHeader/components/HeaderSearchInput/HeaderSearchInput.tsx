import cn from 'classnames';

import { SearchSVG } from '@sbercloud/uikit-product-icons';
import { ButtonSimple } from '@snack-uikit/button';

import { useWindowWidth } from '../../hooks';
import styles from './styles.module.scss';

type HeaderSearchInputProps = {
  onClick(): void;
  active?: boolean;
};

export function HeaderSearchInput({ onClick, active }: HeaderSearchInputProps) {
  const {
    windowWidth,
    breakpoints: { MD },
  } = useWindowWidth();

  return (
    <ButtonSimple
      className={cn(styles.root, {
        [styles.active]: Boolean(active),
        [styles.adaptive]: windowWidth && windowWidth < MD,
      })}
      appearance='neutral'
      icon={<SearchSVG size={24} />}
      onClick={onClick}
    />
  );
}
