import { LAYOUT_TYPE } from '@sbercloud/uikit-product-utils';
import { ButtonFilled } from '@snack-uikit/button';
import { Typography } from '@snack-uikit/typography';

import { useCalculatorContext } from '../../contexts';
import styles from './styles.module.scss';

type WelcomeProps = {
  bgImage?: string;
};

export function Welcome({ bgImage }: WelcomeProps) {
  const {
    setCatalogOpen,
    actions: { onStartClick },
  } = useCalculatorContext();

  const handleCatalogOpen = () => {
    onStartClick?.();
    setCatalogOpen(true);
  };

  const { layoutType } = useCalculatorContext();

  const isMobile = layoutType !== LAYOUT_TYPE.Desktop && layoutType !== LAYOUT_TYPE.DesktopSmall;
  const TitleComponent = isMobile ? Typography.SansHeadlineL : Typography.SansDisplayS;

  return (
    <div className={styles.welcome} data-mobile={isMobile || undefined}>
      <div className={styles.headline}>
        <TitleComponent>
          Калькулятор цен: узнайте, <br /> сколько будет стоить облако
        </TitleComponent>

        <Typography.SansBodyL>
          Соберите свою конфигурацию ресурсов, узнайте ее&nbsp;стоимость <br /> и&nbsp;подключите. Калькулятор предложит
          бесплатные <br /> конфигурации для экономии на&nbsp;старте
        </Typography.SansBodyL>
      </div>

      <div className={styles.action}>
        <ButtonFilled size='l' onClick={handleCatalogOpen} label='Начать расчет' fullWidth={isMobile} />
      </div>

      {bgImage && <img className={styles.image} src={bgImage} alt={''} />}
    </div>
  );
}
