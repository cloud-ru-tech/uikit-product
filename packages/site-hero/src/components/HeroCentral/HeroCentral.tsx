import cn from 'classnames';

import { WithLayoutType, WithSupportProps } from '@cloud-ru/uikit-product-utils';
import { Breadcrumbs, type Item } from '@snack-uikit/breadcrumbs';
import { TooltipProps } from '@snack-uikit/tooltip';
import { Typography } from '@snack-uikit/typography';

import { AnchorMenu, AnchorTypeProps, HeroCentralButtons, HeroTooltip } from './helperComponents';
import { HeroCentralButton } from './helperComponents/HeroCentralButtons';
import styles from './styles.module.scss';
import { TYPOGRAPHY_BY_LAYOUT } from './utils';

type HeroBlockProps = WithSupportProps<{
  /** CSS - класснейм */
  className?: string;
  /** Заголовок */
  title: string;
  /** Подзаголовок */
  subtitle: string;
  /** ClassName для фоновой картинки */
  classNameImage?: string;
  /** Настройки кнопкок */
  buttons?: HeroCentralButton[];
  /** Якорное меню  */
  anchors?: AnchorTypeProps[];
  /** Хлебные крошки */
  breadcrumbs: Item[];
  /** Текст подсказки */
  tooltipText?: string;
  /** Расположение подсказки */
  tooltipPlacement?: TooltipProps['placement'];
  /** Фоновое изображение */
  backgroundImage?: {
    desktop: string;
    desktopSmall: string;
    tablet: string;
    mobile: string;
  };
}> &
  WithLayoutType;

const DEFAULT_BG_IMAGES = {
  desktop: 'https://cdn.cloud.ru/backend/images/solutions/hero_preview_bg_desktop.webp',
  desktopSmall: 'https://cdn.cloud.ru/backend/images/solutions/hero_preview_bg_desktop.webp',
  tablet: 'https://cdn.cloud.ru/backend/images/solutions/hero_preview_bg_tablet.webp',
  mobile: 'https://cdn.cloud.ru/backend/images/solutions/hero_preview_bg_mobile.webp',
};

export function HeroCentral({
  title,
  subtitle,
  buttons,
  anchors,
  breadcrumbs,
  layoutType,
  className,
  classNameImage,
  tooltipText,
  tooltipPlacement,
  backgroundImage = DEFAULT_BG_IMAGES,
}: HeroBlockProps) {
  const { title: titleTypography, subtitle: subtitleTypography } = TYPOGRAPHY_BY_LAYOUT[layoutType];

  return (
    <section className={cn(styles.root, className)}>
      <div className={styles.sectionWrapper}>
        <div className={cn(styles.imageWrapper, classNameImage)} data-layout-type={layoutType}>
          <img loading='lazy' src={backgroundImage[layoutType]} width={1408} height={436} alt='background' />
        </div>
        <div className={styles.wrapperContent} data-layout-type={layoutType}>
          <Breadcrumbs size='xs' items={breadcrumbs} className={styles.breadcrumbs} />

          <div
            className={cn(styles.content, {
              [styles.withoutAnchors]: !anchors,
            })}
            data-layout-type={layoutType}
          >
            <div className={styles.titles} data-layout-type={layoutType}>
              <Typography family='sans' {...titleTypography} className={styles.title} tag='h1'>
                <span dangerouslySetInnerHTML={{ __html: title }} />
                <HeroTooltip tooltipText={tooltipText} tooltipPlacement={tooltipPlacement} layoutType={layoutType} />
              </Typography>

              <Typography family='sans' {...subtitleTypography} className={styles.subtitle} tag='h2'>
                {subtitle}
              </Typography>
            </div>
            <HeroCentralButtons buttons={buttons} layoutType={layoutType} />
          </div>

          <AnchorMenu anchorsList={anchors} layoutType={layoutType} />
        </div>
      </div>
    </section>
  );
}
