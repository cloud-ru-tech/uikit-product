import { useCalculatorContext } from '../../contexts';
import { Disclaimer } from '../Disclaimer';
import { PriceSummary } from '../PriceSummary';
import { ProductPage } from '../ProductPage/ProductPage';
import { Welcome } from '../Welcome';
import styles from './styles.module.scss';

type CalculatorContentProps = {
  bgImage?: string;
};

export function CalculatorContent({ bgImage }: CalculatorContentProps) {
  const { selectedProduct, layoutType } = useCalculatorContext();
  const isDesktop = layoutType === 'desktop';

  if (!selectedProduct) {
    return (
      <>
        <Welcome image={bgImage} />
        <Disclaimer className={styles.disclaimer} />
      </>
    );
  }

  return (
    <div className={styles.calculator} data-layout-type={layoutType}>
      <div className={styles.pageWrapper}>
        <ProductPage selectedProduct={selectedProduct} className={styles.page} />

        {isDesktop && <Disclaimer className={styles.disclaimer} />}
      </div>

      <PriceSummary className={styles.priceSummary} />

      {!isDesktop && <Disclaimer />}
    </div>
  );
}
