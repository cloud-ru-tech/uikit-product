import cn from 'classnames';

import { InfoBlock, InfoBlockProps } from '@snack-uikit/info-block';
import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import styles from './styles.module.scss';

export type EmptyBlockProps = WithSupportProps<
  Pick<InfoBlockProps, 'title' | 'description' | 'icon' | 'className'> &
    Pick<InfoBlock.FooterProps, 'primaryButton' | 'secondaryButton'>
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
    // TODO: typescript error
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <div className={cn(styles.emptyBlock, className)} {...extractSupportProps(rest)}>
      <InfoBlock
        title={title}
        description={description}
        icon={icon}
        align='horizontal'
        size='l'
        footer={<InfoBlock.Footer primaryButton={primaryButton} secondaryButton={secondaryButton} />}
        className={styles.infoBlock}
      />
    </div>
  );
}
