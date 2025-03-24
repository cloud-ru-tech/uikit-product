import cn from 'classnames';

import { Layout } from '@sbercloud/uikit-product-site-layout';
import { SiteVideo } from '@sbercloud/uikit-product-site-video';
import { extractSupportProps, WithLayoutType, WithSupportProps } from '@sbercloud/uikit-product-utils';
import { ButtonFilled, ButtonFilledProps } from '@snack-uikit/button';

import { SECTION_COLORS } from '../../constants';
import { SectionTitle, SectionTitleProps } from '../../helperComponents';
import { MediaContentProps, SectionColor } from '../../types';
import styles from './styles.module.scss';

export type SectionContentProps = WithSupportProps<
  WithLayoutType<
    {
      /** id секции */
      id?: string;
      /** CSS-класс */
      className?: string;
      /** Заголовок */
      title?: string;
      /** Описание */
      description?: string;
      /** Кнопка действия */
      button?: Omit<ButtonFilledProps, 'fullWidth' | 'size'>;
      /** Цвет фона */
      backgroundColor?: SectionColor;
      /** Местоположение контента в секции */
      contentPosition: 'left' | 'right';
    } & MediaContentProps &
      Pick<SectionTitleProps, 'titleTag'>
  >
>;

export function SectionContent({
  id,
  title,
  description,
  button,
  className,
  layoutType,
  backgroundColor = SECTION_COLORS.NeutralBackground1Level,
  contentPosition = 'left',
  image,
  video,
  onPlay,
  titleTag,
  'data-test-id': dataTestId = 'section-content',
  ...rest
}: SectionContentProps) {
  const isDesktop = ['desktop', 'desktopSmall'].includes(layoutType);

  return (
    <Layout.SectionWrapper
      id={id}
      layoutType={layoutType}
      className={cn(className, styles.wrapper)}
      data-section-background={backgroundColor}
      data-test-id={dataTestId}
      {...extractSupportProps(rest)}
    >
      <div className={styles.sectionContent} data-layout-type={layoutType} data-content-position={contentPosition}>
        {Boolean(title || description || button) && (
          <div className={styles.content}>
            {Boolean(title || description) && (
              <SectionTitle
                layoutType={layoutType}
                title={title}
                description={description}
                titleSectionSize='m'
                titleTag={titleTag}
              />
            )}

            {Boolean(button) && (
              <ButtonFilled {...button} fullWidth={!isDesktop} size='l' data-test-id={`${dataTestId}__button`} />
            )}
          </div>
        )}

        <div className={styles.mediaWrapper}>
          {image && (
            <img
              className={styles.image}
              src={image.src}
              alt={image.alt || title || 'section-content-image'}
              data-test-id={`${dataTestId}__image`}
            />
          )}

          {video && <SiteVideo video={video} onPlay={onPlay} data-test-id={`${dataTestId}__video`} />}
        </div>
      </div>
    </Layout.SectionWrapper>
  );
}
