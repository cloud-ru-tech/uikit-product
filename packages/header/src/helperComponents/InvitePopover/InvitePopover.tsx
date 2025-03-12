import { MouseEventHandler, useState } from 'react';

import { useLocale } from '@sbercloud/uikit-product-locale';
import { ButtonFilled, ButtonFunction } from '@snack-uikit/button';
import { Popover } from '@snack-uikit/popover';
import { Typography } from '@snack-uikit/typography';

import styles from './styles.module.scss';

export type InvitePopoverProps = {
  onOpenButtonClick(): void;
};

export function InvitePopover({ onOpenButtonClick }: InvitePopoverProps) {
  const { t } = useLocale('Header');

  const [isOpen, setOpen] = useState(true);

  const handleCloseClick: MouseEventHandler<HTMLButtonElement> = e => {
    e.stopPropagation();

    setOpen(false);
  };

  const handleAcceptClick: MouseEventHandler<HTMLButtonElement> = e => {
    e.stopPropagation();

    setOpen(false);
    onOpenButtonClick();
  };

  return (
    <div className={styles.invitePopoverTriggerStub}>
      <Popover
        trigger='click'
        open={isOpen}
        placement='bottom-end'
        className={styles.invitePopover}
        tip={
          <div className={styles.invitePopoverContent}>
            <div className={styles.invitePopoverTexts}>
              <Typography.SansTitleS>{t('invitePopoverTitle')}</Typography.SansTitleS>

              <Typography.LightLabelM>{t('invitePopoverText')}</Typography.LightLabelM>
            </div>

            <div className={styles.invitePopoverButtons}>
              <ButtonFunction
                size='s'
                appearance='neutral'
                onClick={handleCloseClick}
                label={t('invitePopoverCancelButton')}
              />

              <ButtonFilled
                size='s'
                appearance='neutral'
                onClick={handleAcceptClick}
                label={t('invitePopoverAcceptButton')}
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
