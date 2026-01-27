import cn from 'classnames';

import { RichText } from '@cloud-ru/uikit-product-site-rich-text';
import { extractSupportProps, WithLayoutType, WithSupportProps } from '@cloud-ru/uikit-product-utils';
import { Typography } from '@snack-uikit/typography';

import { Icon, IconProps } from '../../helperComponents/Icon';
import { getTypographySize } from '../utils';
import styles from './styles.module.scss';
import { getIconSize } from './utils';

export type CardBasicProps = WithSupportProps<
  WithLayoutType<{
    /** Заголовок карточки*/
    title: string;
    /** Описание карточки */
    description?: string;
    /** Слот под иконку/картинку/кастомную ноду */
    icon?: IconProps['icon'] | null;
    /** CSS-класс */
    className?: string;
  }>
>;

export function CardBasic({
  title,
  description,
  className,
  icon,
  layoutType,
  'data-test-id': dataTestId = 'card-basic',
  ...rest
}: CardBasicProps) {
  return (
    <div
      {...extractSupportProps(rest)}
      data-layout-type={layoutType}
      className={cn(styles.wrapper, className)}
      data-test-id={dataTestId}
    >
      {icon && <Icon icon={icon} size={getIconSize(layoutType)} data-test-id={`${dataTestId}__icon`} />}

      <div
        className={cn(styles.content, {
          [styles.isEmptyDescription]: !description,
        })}
        data-test-id={`${dataTestId}__content`}
      >
        <Typography
          tag='h3'
          family='sans'
          purpose='title'
          size={getTypographySize(layoutType)}
          data-test-id={`${dataTestId}__title`}
          className={styles.title}
        >
          <RichText richText={title} />
        </Typography>

        {description && (
          <Typography
            tag='div'
            family='sans'
            purpose='body'
            size={getTypographySize(layoutType)}
            data-test-id={`${dataTestId}__description`}
          >
            <RichText className={styles.description} richText={description} />
          </Typography>
        )}
      </div>
    </div>
  );
}
