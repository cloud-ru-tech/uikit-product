import { MouseEventHandler, useEffect, useRef, useState } from 'react';

import { CheckFilledSVG, DownloadSVG, HeadphonesSVG, LinkSVG } from '@sbercloud/uikit-product-icons';
import { ButtonTonal } from '@snack-uikit/button';
import { Tooltip } from '@snack-uikit/tooltip';

import { useCalculatorContext } from '../../../../contexts';
import styles from './styles.module.scss';

export function ProductListActions() {
  const {
    products,
    calculatorType,
    actions: { onShareClick, onDownloadFileClick, onRequestConsultationClick },
  } = useCalculatorContext();

  const [isChecked, setIsCheckedOpen] = useState(false);
  const timerId = useRef<NodeJS.Timeout>();
  const openChecked = () => setIsCheckedOpen(true);
  const closeChecked = () => setIsCheckedOpen(false);

  const handleShareClick: MouseEventHandler<HTMLButtonElement> = async event => {
    event.stopPropagation();

    onShareClick?.({
      products,
      calculatorType,
    }).then(() => {
      openChecked();
      clearTimeout(timerId.current);
      timerId.current = setTimeout(closeChecked, 1000);
    });
  };

  useEffect(
    () => () => {
      closeChecked();
      clearTimeout(timerId.current);
    },
    [],
  );

  const handleDownloadFileClick = () =>
    onDownloadFileClick?.({
      products,
      calculatorType,
    });

  const handleRequestConsultationClick = () =>
    onRequestConsultationClick?.({
      products,
      calculatorType,
    });

  return (
    <div className={styles.footerLinks}>
      {onShareClick && (
        <Tooltip
          tip={
            isChecked ? (
              <div className={styles.container}>
                <span className={styles.icon}>
                  <CheckFilledSVG />
                </span>
                Ccылка скопирована
              </div>
            ) : (
              <>Поделиться ссылкой</>
            )
          }
          hoverDelayOpen={600}
          open={isChecked || undefined}
        >
          <ButtonTonal size='m' icon={<LinkSVG />} appearance='neutral' fullWidth onClick={handleShareClick} />
        </Tooltip>
      )}

      <Tooltip tip='Скачать расчет' hoverDelayOpen={600}>
        <ButtonTonal size='m' icon={<DownloadSVG />} appearance='neutral' fullWidth onClick={handleDownloadFileClick} />
      </Tooltip>

      {onRequestConsultationClick && (
        <Tooltip tip='Запросить консультацию' hoverDelayOpen={600}>
          <ButtonTonal
            size='m'
            icon={<HeadphonesSVG />}
            appearance='neutral'
            fullWidth
            onClick={handleRequestConsultationClick}
          />
        </Tooltip>
      )}
    </div>
  );
}
