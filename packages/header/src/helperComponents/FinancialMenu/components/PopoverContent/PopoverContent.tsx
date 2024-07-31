import { MouseEventHandler } from 'react';

import { formatNumber } from '@sbercloud/ft-formatters';
import { EyeClosedSVG, EyeSVG } from '@sbercloud/uikit-product-icons';
import { useLanguage } from '@sbercloud/uikit-product-utils';
import { ButtonFunction } from '@snack-uikit/button';
import { Link, LinkProps } from '@snack-uikit/link';
import { PromoTag, PromoTagProps } from '@snack-uikit/promo-tag';
import { SkeletonText } from '@snack-uikit/skeleton';
import { Tooltip } from '@snack-uikit/tooltip';
import { TruncateString } from '@snack-uikit/truncate-string';

import { textProvider, Texts } from '../../../../helpers';
import { CURRENCY_MAP } from '../../constants';
import { PopoverRow, PopoverRowProps } from '../PopoverRow';
import styles from './styles.module.scss';

export type PopoverContentProps = {
  loading?: boolean;
  onClose(): void;
  tag?: Pick<PromoTagProps, 'text' | 'appearance'>;
  link: Required<Pick<LinkProps, 'onClick' | 'href'>>;
  agreement?: string;
  balance: Pick<PopoverRowProps, 'tip' | 'onAddClick' | 'description' | 'status'> & {
    value: number;
    onOpenChange?(isOpen: boolean): void;
  };
  bonuses: Pick<PopoverRowProps, 'tip' | 'onAddClick' | 'description'> & {
    value: number;
    onOpenChange?(isOpen: boolean): void;
  };
  eyeButton: {
    dataVisible: boolean;
    onClick?: MouseEventHandler<HTMLButtonElement>;
  };
};

export function PopoverContent({
  loading = false,
  onClose,
  tag,
  link,
  agreement,
  bonuses,
  balance,
  eyeButton,
}: PopoverContentProps) {
  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });

  const handleLinkClick: MouseEventHandler<HTMLAnchorElement> = event => {
    link?.onClick?.(event);
    onClose();
  };

  return (
    <div className={styles.content}>
      <SkeletonText lines={6} loading={loading}>
        <div className={styles.header}>
          {tag && <PromoTag {...tag} />}

          <div className={styles.title}>
            <div className={styles.linkWrapper}>
              <Link
                size='m'
                appearance='primary'
                textMode='accent'
                text={textProvider(languageCode, Texts.FinancialMenuTitle)}
                {...link}
                onClick={handleLinkClick}
              />
            </div>

            <Tooltip
              tip={
                eyeButton.dataVisible
                  ? textProvider(languageCode, Texts.FinancialMenuEyeButtonDavaVisibleTip)
                  : textProvider(languageCode, Texts.FinancialMenuEyeButtonDataHiddenTip)
              }
              placement='top'
            >
              <ButtonFunction
                size='xs'
                icon={eyeButton.dataVisible ? <EyeClosedSVG /> : <EyeSVG />}
                onClick={eyeButton.onClick}
              />
            </Tooltip>
          </div>

          {agreement && (
            <span className={styles.agreement}>
              <TruncateString text={agreement} />
            </span>
          )}
        </div>

        <PopoverRow
          {...balance}
          label={textProvider(languageCode, Texts.FinancialMenuBalance)}
          value={`${formatNumber(balance.value, { type: formatNumber.types.DigitSpaces })} ${CURRENCY_MAP.ruble}`}
        />

        <PopoverRow
          {...bonuses}
          label={textProvider(languageCode, Texts.FinancialMenuBonuses)}
          value={`${formatNumber(bonuses.value, { type: formatNumber.types.DigitSpaces })} ${textProvider(
            languageCode,
            Texts.FinancialMenuBonusSign,
          )}`}
        />
      </SkeletonText>
    </div>
  );
}
