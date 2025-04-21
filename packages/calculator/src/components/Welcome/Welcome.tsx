import { PlusSVG } from '@sbercloud/uikit-product-icons';
import { LAYOUT_TYPE } from '@sbercloud/uikit-product-utils';
import { ButtonFilled } from '@snack-uikit/button';
import { FieldStepper } from '@snack-uikit/fields';
import { Typography } from '@snack-uikit/typography';

import { useCalculatorContext, useProductContext } from '../../contexts';
import { PRICE_PERIOD } from '../../types';
import { parseKeyToDataTest } from '../../utils';
import { HeaderContainer } from '../HeaderContainer';
import { PriceSummary, SummaryAppearance } from '../PriceSummary';
import { PriceCount } from '../ProductHeadline/components';
import styles from './styles.module.scss';

const WELCOME_STEPS = [
  'Нажмите Добавить сервис',
  'Выберите платформу и продукт',
  'Настройте конфигурацию',
  'Подключите сразу или оставьте заявку',
];

type WelcomeProps = { image?: string };

export function Welcome({ image }: WelcomeProps) {
  const {
    setCatalogOpen,
    actions: { onStartClick },
  } = useCalculatorContext();

  const { price } = useProductContext();

  const handleCatalogOpen = () => {
    onStartClick?.();
    setCatalogOpen(true);
  };

  const { layoutType } = useCalculatorContext();

  const isTablet = layoutType !== LAYOUT_TYPE.Desktop && layoutType !== LAYOUT_TYPE.DesktopSmall;
  const isDesctopSmall = layoutType === LAYOUT_TYPE.DesktopSmall;
  const isMobile = layoutType === LAYOUT_TYPE.Mobile;

  const TitleComponent = isTablet ? Typography.SansTitleL : Typography.SansHeadlineS;

  return (
    <div
      data-test-id={parseKeyToDataTest('welcome')}
      className={styles.wrapper}
      data-desktop-small={isDesctopSmall || undefined}
      data-tablet={isTablet || undefined}
    >
      <div
        className={styles.configurator}
        data-test-id={parseKeyToDataTest('welcome', 'configurator')}
        data-desktop-small={isDesctopSmall || undefined}
        data-tablet={isTablet || undefined}
      >
        <HeaderContainer dataTestId={parseKeyToDataTest('welcome', 'header')}>
          <div className={styles.left}>
            <TitleComponent data-test-id={parseKeyToDataTest('product', 'title')}>Калькулятор</TitleComponent>
          </div>

          <div className={styles.right} data-tablet={isTablet || undefined}>
            <PriceCount price={price} pricePeriod={PRICE_PERIOD.Month} mobile={isMobile} />

            <div className={styles.counter} data-test-id={parseKeyToDataTest('product', 'counter')}>
              <FieldStepper size='m' step={1} min={1} max={1} value={1} disabled allowMoreThanLimits={false} />
            </div>

            {!isTablet && (
              <ButtonFilled
                fullWidth={isTablet}
                label='Подключить'
                size='m'
                appearance='primary'
                onClick={() => {}}
                disabled
              />
            )}
          </div>
        </HeaderContainer>
        <div
          className={styles.body}
          data-mobile={isMobile || undefined}
          data-tablet={isTablet || undefined}
          data-test-id={parseKeyToDataTest('welcome', 'body')}
        >
          <div className={styles.headings}>
            <div className={styles.headingsText}>
              <Typography.SansTitleL data-test-id={parseKeyToDataTest('welcome', 'title')}>
                Узнайте, сколько будет стоить облако
              </Typography.SansTitleL>
              <Typography.SansBodyM className={styles.desc} data-test-id={parseKeyToDataTest('welcome', 'desc')}>
                Соберите свою конфигурацию ресурсов, узнайте ее стоимость
                <br />и подключите. Калькулятор предложит бесплатные
                <br />
                конфигурации для экономии на старте
              </Typography.SansBodyM>
            </div>
            {(isTablet || isDesctopSmall) && (
              <ButtonFilled
                onClick={handleCatalogOpen}
                size='m'
                icon={<PlusSVG />}
                label='Добавить сервис'
                appearance='primary'
                data-test-id={parseKeyToDataTest('welcome', 'button')}
              />
            )}
          </div>
          <div className={styles.steps} data-test-id={parseKeyToDataTest('welcome', 'steps')}>
            {WELCOME_STEPS.map((item, index) => (
              <div className={styles.step} key={index} data-test-id={parseKeyToDataTest('welcome', 'step')}>
                <div className={styles.number}>
                  <Typography.SansLabelL>{index + 1}</Typography.SansLabelL>
                </div>
                <Typography.SansTitleS>{item}</Typography.SansTitleS>
              </div>
            ))}
          </div>
          {image && (
            <img
              className={styles.image}
              src={image}
              alt='calculator'
              data-test-id={parseKeyToDataTest('welcome', 'image')}
              data-mobile={isMobile || undefined}
              data-tablet={isTablet || undefined}
            />
          )}
        </div>
      </div>
      <div
        className={styles.priceSummary}
        data-desktop-small={isDesctopSmall || undefined}
        data-tablet={isTablet || undefined}
        data-test-id={parseKeyToDataTest('welcome', 'summary')}
      >
        <PriceSummary appearance={SummaryAppearance.Welcome} />
      </div>
    </div>
  );
}
