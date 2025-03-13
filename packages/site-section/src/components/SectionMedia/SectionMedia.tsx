import { SiteVideo, SiteVideoProps } from '@sbercloud/uikit-product-site-video';
import { extractSupportProps, WithLayoutType, WithSupportProps } from '@sbercloud/uikit-product-utils';

import { SectionBasic, SectionBasicProps } from '../SectionBasic';
import styles from './styles.module.scss';

type SectionMediaVideoProps = Pick<SiteVideoProps, 'video' | 'onPlay'> & {
  image?: never;
};

type SectionMediaImageProps = {
  video?: never;
  onPlay?: never;
  image: {
    src: string;
    alt?: string;
  };
};

type SectionMediaContentProps = SectionMediaImageProps | SectionMediaVideoProps;

export type SectionMediaProps = WithLayoutType<
  WithSupportProps<Pick<SectionBasicProps, 'id' | 'title' | 'titleTag' | 'description'> & SectionMediaContentProps>
>;

export function SectionMedia({
  id,
  title,
  titleTag,
  layoutType,
  description,
  video,
  onPlay,
  image,
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

        {video && <SiteVideo video={video} onPlay={onPlay} data-test-id={`${dataTestId}__video`} />}
      </div>
    </SectionBasic>
  );
}
