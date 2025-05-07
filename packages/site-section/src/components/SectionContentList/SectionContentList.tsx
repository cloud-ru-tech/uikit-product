import { SiteVideo } from '@sbercloud/uikit-product-site-media';
import { extractSupportProps, WithLayoutType, WithSupportProps } from '@sbercloud/uikit-product-utils';

import { SectionTitle, SectionTitleProps } from '../../helperComponents';
import { MediaContentProps, SectionColor } from '../../types';
import { SectionBasic, SectionBasicProps } from '../SectionBasic';
import styles from './styles.module.scss';

type Item = {
  title: string;
  description: string;
} & Pick<SectionTitleProps, 'titleLink'>;

export type SectionContentListProps = WithSupportProps<
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
      /** Список элементов */
      items?: Item[];
      /** Цвет фона */
      backgroundColor?: SectionColor;
      /** Местоположение контента в секции */
      contentPosition: 'left' | 'right';
    } & MediaContentProps &
      Pick<SectionBasicProps, 'titleTag'>
  >
>;

export function SectionContentList({
  id,
  title,
  description,
  items,
  className,
  layoutType,
  backgroundColor,
  contentPosition = 'left',
  image,
  video,
  onPlay,
  titleTag,
  'data-test-id': dataTestId = 'section-content-list',
  ...rest
}: SectionContentListProps) {
  return (
    <SectionBasic
      id={id}
      layoutType={layoutType}
      title={title}
      description={description}
      className={className}
      backgroundColor={backgroundColor}
      data-test-id={dataTestId}
      titleTag={titleTag}
      {...extractSupportProps(rest)}
    >
      <div className={styles.sectionContent} data-layout-type={layoutType} data-content-position={contentPosition}>
        <div className={styles.mediaWrapper}>
          {image && (
            <img
              className={styles.image}
              src={image.src}
              alt={image.alt || title || 'section-content-image'}
              data-test-id={`${dataTestId}__image`}
            />
          )}

          {video && (
            <SiteVideo video={video} onPlay={onPlay} layoutType={layoutType} data-test-id={`${dataTestId}__video`} />
          )}
        </div>

        {items && items.length > 0 && (
          <ul className={styles.list}>
            {items.map((item, index) => (
              <li key={`${title}__${index}`} className={styles.item}>
                <SectionTitle
                  layoutType={layoutType}
                  title={item.title}
                  titleLink={item.titleLink}
                  description={item.description}
                  titleSectionSize='s'
                  titleTag='h3'
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </SectionBasic>
  );
}
