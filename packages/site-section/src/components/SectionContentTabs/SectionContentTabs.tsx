import cn from 'classnames';
import { ReactNode } from 'react';
import { useUncontrolledProp } from 'uncontrollable';

import { RichText } from '@sbercloud/uikit-product-site-rich-text';
import { SiteVideo } from '@sbercloud/uikit-product-site-video';
import { extractSupportProps, WithLayoutType, WithSupportProps } from '@sbercloud/uikit-product-utils';
import { ButtonFilled, ButtonFilledProps } from '@snack-uikit/button';
import { Tabs } from '@snack-uikit/tabs';

import { SectionTitle } from '../../helperComponents';
import { MediaContentProps, SectionColor } from '../../types';
import { SectionBasic, SectionBasicProps } from '../SectionBasic';
import styles from './styles.module.scss';

type TabItem = {
  id: string;
  title: string;
  mediaTitle?: string;
  mediaSubtitle?: string;
  mediaDescription?: string;
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
  icon?: string | ReactNode;
} & MediaContentProps;

export type SectionContentTabsProps = WithSupportProps<
  WithLayoutType<
    {
      /** id секции */
      id?: string;
      /** CSS-класс */
      className?: string;
      /** Заголовок */
      title?: string;
      /** Список вкладок */
      tabs: TabItem[];
      /** Выбранная вкладок */
      activeTab?: string;
      /** колбэк на смену вкладки */
      onActiveTabChange?: () => void;
      /** Кнопка действия */
      button?: Omit<ButtonFilledProps, 'fullWidth' | 'size'>;
      /** Цвет фона */
      backgroundColor?: SectionColor;
    } & Pick<SectionBasicProps, 'titleTag'>
  >
>;

function TabIcon({ icon }: Pick<TabItem, 'icon'>) {
  if (icon && typeof icon === 'string') {
    return <img src={icon} alt='' className={styles.tabIconImage} />;
  }

  return icon;
}

export function SectionContentTabs({
  id,
  title,
  tabs,
  activeTab: activeTabProp,
  onActiveTabChange,
  button,
  className,
  layoutType,
  backgroundColor,
  titleTag,
  'data-test-id': dataTestId = 'section-content-tabs',
  ...rest
}: SectionContentTabsProps) {
  const [activeTab, setActiveTab] = useUncontrolledProp(activeTabProp, tabs[0].id, onActiveTabChange);
  const isDesktop = ['desktop', 'desktopSmall'].includes(layoutType);

  return (
    <SectionBasic
      id={id}
      layoutType={layoutType}
      title={title}
      className={className}
      backgroundColor={backgroundColor}
      data-test-id={dataTestId}
      titleTag={titleTag}
      {...extractSupportProps(rest)}
    >
      <Tabs value={activeTab} onChange={setActiveTab}>
        <div className={styles.sectionContent} data-layout-type={layoutType}>
          <div className={cn(styles.tabsWrapper, { [styles.desktopTabsWrapper]: isDesktop })}>
            <Tabs.TabBar
              orientation={isDesktop ? 'vertical' : 'horizontal'}
              markerPosition={isDesktop ? 'before' : 'after'}
              className={cn({ [styles.desktopTabs]: isDesktop })}
            >
              {tabs.map(({ id, title, disabled, icon }) => (
                <Tabs.Tab
                  key={id}
                  value={id}
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  label={
                    <>
                      <RichText richText={title} />
                      <TabIcon icon={icon} />
                    </>
                  }
                  disabled={disabled}
                />
              ))}
            </Tabs.TabBar>

            {Boolean(button) && (
              <ButtonFilled {...button} fullWidth={!isDesktop} size='l' data-test-id={`${dataTestId}__button`} />
            )}
          </div>

          {tabs.map(({ id, mediaTitle, mediaSubtitle, mediaDescription, image, video, onPlay }) => (
            <Tabs.TabContent key={id} value={id} className={styles.mediaWrapper}>
              {image && (
                <div className={styles.imageWrapper}>
                  <img
                    className={styles.image}
                    src={image.src}
                    alt={image.alt || title || 'section-content-image'}
                    data-test-id={`${dataTestId}__image`}
                  />
                </div>
              )}

              {video && <SiteVideo video={video} onPlay={onPlay} data-test-id={`${dataTestId}__video`} />}

              {/* TODO: избавиться от title/subtitle после обновления cms-ки */}
              {(mediaTitle || mediaSubtitle) && (
                <SectionTitle
                  titleSectionSize='s'
                  layoutType={layoutType}
                  title={mediaTitle}
                  description={mediaSubtitle}
                />
              )}

              {mediaDescription && <SectionTitle layoutType={layoutType} description={mediaDescription} />}
            </Tabs.TabContent>
          ))}
        </div>
      </Tabs>
    </SectionBasic>
  );
}
