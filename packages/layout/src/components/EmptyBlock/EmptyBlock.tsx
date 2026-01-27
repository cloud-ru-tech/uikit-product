import cn from 'classnames';

import { extractSupportProps, WithSupportProps } from '@cloud-ru/uikit-product-utils';
import { InfoBlock, InfoBlockProps } from '@snack-uikit/info-block';

import styles from './styles.module.scss';

export type EmptyBlockProps = WithSupportProps<
  Pick<InfoBlockProps, 'title' | 'description' | 'icon' | 'className'> &
    (
      | Pick<InfoBlock.FooterProps, 'primaryButton' | 'secondaryButton'>
      | { primaryButton?: never; secondaryButton?: never }
    )
>;

export function EmptyBlock({
  primaryButton,
  secondaryButton,
  className,
  title,
  description,
  icon,
  ...rest
}: EmptyBlockProps) {
  return (
    <div className={cn(styles.emptyBlock, className)} {...extractSupportProps(rest)}>
      <InfoBlock
        title={title}
        description={description}
        icon={icon}
        align='horizontal'
        size='l'
        footer={
          primaryButton ? (
            <InfoBlock.Footer primaryButton={primaryButton} secondaryButton={secondaryButton} />
          ) : undefined
        }
        className={styles.infoBlock}
      />
    </div>
  );
}
