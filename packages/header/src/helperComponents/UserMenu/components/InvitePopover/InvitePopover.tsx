import { ReactNode } from 'react';

import { useLanguage } from '@sbercloud/uikit-product-utils';
import { ButtonFilled, ButtonFunction } from '@snack-uikit/button';
import { Popover } from '@snack-uikit/popover';
import { Typography } from '@snack-uikit/typography';

import { textProvider, Texts } from '../../../../helpers';
import styles from './styles.module.scss';

export type InvitePopoverProps = {
  onCloseButtonClick(): void;
  onAcceptButtonClick(): void;
  children: ReactNode;
};

export function InvitePopover({ onCloseButtonClick, onAcceptButtonClick, children }: InvitePopoverProps) {
  const { languageCode } = useLanguage();

  return (
    <Popover
      trigger='click'
      open
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
              onClick={onCloseButtonClick}
              label={textProvider(languageCode, Texts.InvitePopoverCancelButton)}
            />

            <ButtonFilled
              size='s'
              appearance='neutral'
              onClick={onAcceptButtonClick}
              label={textProvider(languageCode, Texts.InvitePopoverAcceptButton)}
            />
          </div>
        </div>
      }
    >
      {children}
    </Popover>
  );
}
