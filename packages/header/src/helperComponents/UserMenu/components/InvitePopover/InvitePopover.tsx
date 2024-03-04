import { MouseEventHandler, useState } from 'react';

import { useLanguage } from '@sbercloud/uikit-product-utils';
import { ButtonFilled, ButtonFunction } from '@snack-uikit/button';
import { Popover } from '@snack-uikit/popover';
import { Typography } from '@snack-uikit/typography';

import { textProvider, Texts } from '../../../../helpers';
import styles from './styles.module.scss';

export type InvitePopoverProps = {
  onCloseButtonClick(): void;
  onAcceptButtonClick(): void;
};

export function InvitePopover({ onCloseButtonClick, onAcceptButtonClick }: InvitePopoverProps) {
  const { languageCode } = useLanguage();

  const [isOpen, setOpen] = useState(true);

  const handleCloseClick: MouseEventHandler<HTMLButtonElement> = e => {
    e.stopPropagation();

    setOpen(false);
    onCloseButtonClick();
  };

  const handleAcceptClick: MouseEventHandler<HTMLButtonElement> = e => {
    e.stopPropagation();

    setOpen(false);
    onAcceptButtonClick();
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
              <Typography.SansTitleS>{textProvider(languageCode, Texts.InvitePopoverTitle)}</Typography.SansTitleS>

              <Typography.LightLabelM>{textProvider(languageCode, Texts.InvitePopoverText)}</Typography.LightLabelM>
            </div>

            <div className={styles.invitePopoverButtons}>
              <ButtonFunction
                size='s'
                appearance='neutral'
                onClick={handleCloseClick}
                label={textProvider(languageCode, Texts.InvitePopoverCancelButton)}
              />

              <ButtonFilled
                size='s'
                appearance='neutral'
                onClick={handleAcceptClick}
                label={textProvider(languageCode, Texts.InvitePopoverAcceptButton)}
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
