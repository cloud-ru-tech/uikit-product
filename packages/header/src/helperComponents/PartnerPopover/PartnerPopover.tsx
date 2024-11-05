import { MouseEventHandler, useState } from 'react';

import { useLanguage } from '@sbercloud/uikit-product-utils';
import { ButtonFunction } from '@snack-uikit/button';
import { Popover } from '@snack-uikit/popover';
import { Typography } from '@snack-uikit/typography';

import { textProvider, Texts } from '../../helpers';
import styles from './styles.module.scss';

export type PartnerPopoverProps = {
  onCloseClick?(): void;
};

export function PartnerPopover({ onCloseClick }: PartnerPopoverProps) {
  const { languageCode } = useLanguage();

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
              <Typography.SansTitleS>{textProvider(languageCode, Texts.PartnerPopoverTitle)}</Typography.SansTitleS>

              <Typography.LightLabelM>{textProvider(languageCode, Texts.PartnerPopoverText)}</Typography.LightLabelM>
              <Typography.LightLabelM>
                {textProvider(languageCode, Texts.PartnerPopoverDescription)}
              </Typography.LightLabelM>
            </div>

            <div className={styles.partnerPopoverButton}>
              <ButtonFunction
                size='s'
                appearance='neutral'
                onClick={handleCloseClick}
                label={textProvider(languageCode, Texts.PartnerPopoverCancelButton)}
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
