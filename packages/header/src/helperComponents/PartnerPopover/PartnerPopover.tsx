import { MouseEventHandler, useState } from 'react';

import { useLocale } from '@sbercloud/uikit-product-locale';
import { ButtonFunction } from '@snack-uikit/button';
import { Popover } from '@snack-uikit/popover';
import { Typography } from '@snack-uikit/typography';

import styles from './styles.module.scss';

export type PartnerPopoverProps = {
  onCloseClick?(): void;
};

export function PartnerPopover({ onCloseClick }: PartnerPopoverProps) {
  const { t } = useLocale('Header');

  const [isOpen, setOpen] = useState(true);

  const handleCloseClick: MouseEventHandler<HTMLButtonElement> = e => {
    e.stopPropagation();

    setOpen(false);
    onCloseClick?.();
  };

  return (
    <div className={styles.partnerPopoverTriggerStub}>
      <Popover
        trigger='click'
        open={isOpen}
        placement='bottom-end'
        className={styles.partnerPopover}
        tip={
          <div className={styles.partnerPopoverContent}>
            <div className={styles.partnerPopoverTexts}>
              <Typography.SansTitleS>{t('partnerPopoverTitle')}</Typography.SansTitleS>

              <Typography.LightLabelM>{t('partnerPopoverText')}</Typography.LightLabelM>
              <Typography.LightLabelM>{t('partnerPopoverDescription')}</Typography.LightLabelM>
            </div>

            <div className={styles.partnerPopoverButton}>
              <ButtonFunction
                size='s'
                appearance='neutral'
                onClick={handleCloseClick}
                label={t('partnerPopoverCancelButton')}
              />
            </div>
          </div>
        }
      >
        <></>
      </Popover>
    </div>
  );
}
