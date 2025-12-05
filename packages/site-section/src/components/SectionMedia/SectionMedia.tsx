import { SiteVideo } from '@sbercloud/uikit-product-site-media';
import { extractSupportProps, WithLayoutType, WithSupportProps } from '@sbercloud/uikit-product-utils';

import { MediaContentProps } from '../../types';
import { SectionBasic, SectionBasicProps } from '../SectionBasic';
import styles from './styles.module.scss';

export type SectionMediaProps = WithLayoutType<
  WithSupportProps<
    Pick<SectionBasicProps, 'id' | 'title' | 'titleTag' | 'description' | 'backgroundColor'> & MediaContentProps
  >
>;

export function SectionMedia({
  id,
  title,
  titleTag,
  layoutType,
  description,
  video,
  onPlay,
  onError,
  image,
  backgroundColor,
  'data-test-id': dataTestId = 'section-media',
  ...rest
}: SectionMediaProps) {
  return (
    <SectionBasic
      id={id}
      layoutType={layoutType}
      title={title}
      titleTag={titleTag}
      description={description}
      data-test-id={dataTestId}
      backgroundColor={backgroundColor ?? 'neutral-background'}
      {...extractSupportProps(rest)}
    >
      <div className={styles.content}>
        {image && (
          <img
            className={styles.image}
            src={image.src}
            alt={image?.alt || title}
            data-test-id={`${dataTestId}__image`}
          />
        )}

        {video && (
          <SiteVideo
            video={video}
            onPlay={onPlay}
            onError={onError}
            layoutType={layoutType}
            data-test-id={`${dataTestId}__video`}
          />
        )}
      </div>
    </SectionBasic>
  );
}
