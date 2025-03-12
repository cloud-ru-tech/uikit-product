import cn from 'classnames';
import { useMemo } from 'react';

import { CloudMoveSVG, HeadphonesSVG, UsersSVG } from '@sbercloud/uikit-product-icons';
import { useLocale } from '@sbercloud/uikit-product-locale';
import { CardBasic, CardBasicProps } from '@sbercloud/uikit-product-site-cards';
import { extractSupportProps, WithLayoutType, WithSupportProps } from '@sbercloud/uikit-product-utils';
import { ButtonFilled } from '@snack-uikit/button';
import { Typography } from '@snack-uikit/typography';

import { SectionBasic } from '../SectionBasic';
import styles from './styles.module.scss';
import { getCardTitleTypographyProps } from './utils';

export type SectionPersonalManagerProps = WithSupportProps<
  WithLayoutType<{
    /** id секции */
    id?: string;
    title?: string;
    description?: string;
    manager: {
      img: string;
      title?: string;
      text?: string;
    };
    card?: {
      title: string;
      text: string;
    };
    benefits?: Pick<CardBasicProps, 'title' | 'icon'>[];
    withoutBenefits?: boolean;
    /** CSS-класс */
    className?: string;
    /** Хэндлер клика по кнопке "Получить консультацию" */
    onGetConsultationClick(): void;
  }>
>;

export function SectionPersonalManager({
  id,
  layoutType,
  title,
  description,
  manager,
  card,
  benefits,
  withoutBenefits,
  className,
  onGetConsultationClick,
  ...rest
}: SectionPersonalManagerProps) {
  const { t } = useLocale('SiteSection');

  const benefitsCards = useMemo<SectionPersonalManagerProps['benefits']>(() => {
    if (benefits) {
      return benefits;
    }

    return [
      {
        title: t('PersonalManager.argumentAmountOfExperts'),
        icon: UsersSVG,
      },
      {
        title: t('PersonalManager.argumentMethodologies'),
        icon: CloudMoveSVG,
      },
      {
        title: t('PersonalManager.argumentPersonalManager'),
        icon: HeadphonesSVG,
      },
    ];
  }, [benefits, t]);

  return (
    <SectionBasic
      id={id}
      title={title || t('PersonalManager.title')}
      description={description || t('PersonalManager.subtitle')}
      backgroundColor='neutral-background1-level'
      layoutType={layoutType}
      className={cn(className, styles.sectionPersonalManager)}
      {...extractSupportProps(rest)}
    >
      <div className={styles.content} data-layout-type={layoutType}>
        <div className={cn(styles.card, styles.leftSide)} data-layout-type={layoutType}>
          <div className={styles.approachTextWrapper}>
            <div className={styles.cardTextContent}>
              <Typography family='sans' {...getCardTitleTypographyProps(layoutType)}>
                {manager.title || t('PersonalManager.individualApproachTitle')}
              </Typography>
              <Typography family='sans' purpose='body' size='l'>
                {manager.text || t('PersonalManager.individualApproachDescription')}
              </Typography>
            </div>
            <ButtonFilled
              className={styles.consultationButton}
              size='l'
              appearance='primary'
              label={t('PersonalManager.consultationButton')}
              onClick={onGetConsultationClick}
              data-layout-type={layoutType}
              data-test-id='personal-manager_get-consultation-button'
            />
          </div>
          <div className={styles.imageWrapper} data-layout-type={layoutType}>
            <div className={styles.imageBackground}></div>
            <img
              src={manager.img}
              alt='personal_manager'
              className={styles.approachManager}
              data-layout-type={layoutType}
            />
          </div>
        </div>
        <div className={cn(styles.card, styles.cardTextContent)}>
          <Typography family='sans' {...getCardTitleTypographyProps(layoutType)}>
            {card?.title || t('PersonalManager.allDaySupportTitle')}
          </Typography>
          <Typography family='sans' purpose='body' size='l'>
            {card?.text || t('PersonalManager.allDaySupportDescription')}
          </Typography>
        </div>
      </div>

      {!withoutBenefits && (
        <div className={styles.expertiseCards} data-layout-type={layoutType}>
          {benefitsCards?.map(card => (
            <CardBasic key={card.title} title={card.title} icon={card.icon} layoutType={layoutType} />
          ))}
        </div>
      )}
    </SectionBasic>
  );
}
