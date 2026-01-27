import cn from 'classnames';

import { ChevronRightSVG } from '@cloud-ru/uikit-product-icons';
import { extractSupportProps } from '@snack-uikit/utils';

import { TEST_IDS } from '../constants';
import { TitleClickableProps } from '../types';
import { TitleClickableContent } from './helperComponents';
import styles from './styles.module.scss';

export function TitleClickable({
  className,
  href,
  target,
  fullWidth,
  onClick,
  title,
  icon,
  children,
  titleTag,
  avatar,
  ...props
}: TitleClickableProps) {
  return (
    <a
      {...extractSupportProps(props)}
      className={cn(styles.titleClickable, className)}
      href={href}
      target={target}
      onClick={onClick}
      rel={target === '_blank' ? 'noopener noreferrer' : undefined}
      data-full-width={fullWidth || undefined}
    >
      <TitleClickableContent title={title} icon={icon} avatar={avatar} titleTag={titleTag} fullWidth={fullWidth}>
        {children}
      </TitleClickableContent>

      <div data-test-id={TEST_IDS.chevron} className={styles.iconWrapper}>
        <ChevronRightSVG size={24} />
      </div>
    </a>
  );
}
