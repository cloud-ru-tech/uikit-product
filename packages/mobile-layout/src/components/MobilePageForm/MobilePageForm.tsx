import cn from 'classnames';
import { useState } from 'react';

import { ChevronRightSVG, KebabSVG } from '@sbercloud/uikit-product-icons';
import { MobileDropdown, MobileDroplist } from '@sbercloud/uikit-product-mobile-dropdown';
import { MobileModalCustom } from '@sbercloud/uikit-product-mobile-modal';
import { PageFormProps } from '@sbercloud/uikit-product-page-layout';
import { useLanguage } from '@sbercloud/uikit-product-utils';
import { ButtonFilled, ButtonFunction, ButtonOutline, ButtonSimple } from '@snack-uikit/button';
import { Typography } from '@snack-uikit/typography';
import { extractSupportProps, ValueOf } from '@snack-uikit/utils';

import { Headline } from '../../helperComponents';
import { textProvider, Texts } from '../../helpers/texts-provider';
import { useButtonWithTooltip } from './hooks';
import styles from './styles.module.scss';

export const BUTTON_PRIMARY_VARIANT = {
  Continue: 'continue',
  Create: 'create',
  Save: 'save',
  Rent: 'rent',
  Send: 'send',
} as const;

export const BUTTON_SECONDARY_VARIANT = {
  Cancel: 'cancel',
  Back: 'back',
} as const;

export type ButtonPrimaryVariant = ValueOf<typeof BUTTON_PRIMARY_VARIANT>;
export type ButtonSecondaryVariant = ValueOf<typeof BUTTON_SECONDARY_VARIANT>;

export type MobilePageFormProps = PageFormProps;

export function MobilePageForm({
  children,
  title,
  subHeader,
  className,
  footer,
  stepper,
  priceSummary,
  sideBlock,
  ...rest
}: PageFormProps) {
  const { languageCode } = useLanguage();

  const PrimaryButton = useButtonWithTooltip({ Button: ButtonFilled, tooltip: footer?.buttonPrimary.tooltip });
  const SecondaryButton = useButtonWithTooltip({ Button: ButtonOutline, tooltip: footer?.buttonSecondary?.tooltip });
  const AdditionalButton = useButtonWithTooltip({ Button: ButtonSimple, tooltip: footer?.buttonAdditional?.tooltip });

  const [openPriceSummary, setOpenPriceSummary] = useState<boolean>(false);
  const [openMore, setOpenMore] = useState<boolean>(false);
  const [openMoreContentIndex, setOpenMoreContentIndex] = useState<number | undefined>(undefined);

  return (
    <div className={cn(styles.container, className)} {...extractSupportProps(rest)}>
      <Headline
        title={title}
        subHeader={subHeader}
        moreActions={
          sideBlock ? (
            <MobileDroplist
              size='l'
              open={openMore}
              onOpenChange={setOpenMore}
              items={sideBlock.map(({ label }, idx) => ({
                id: idx,
                content: {
                  option: label,
                },
                onClick: () => {
                  setOpenMoreContentIndex(idx), setOpenMore(false);
                },
              }))}
            >
              <ButtonFunction icon={<KebabSVG />} size='m' />
            </MobileDroplist>
          ) : undefined
        }
      />

      {sideBlock && (
        <MobileModalCustom open={openMoreContentIndex !== undefined} onClose={() => setOpenMoreContentIndex(undefined)}>
          <MobileModalCustom.Body content={sideBlock?.[openMoreContentIndex ?? 0].content} />
        </MobileModalCustom>
      )}

      {stepper && <div className={styles.stepper}>{stepper}</div>}

      <div className={styles.body}>{children}</div>

      {(priceSummary || footer) && (
        <div className={styles.footer}>
          {priceSummary && (
            <div className={styles.priceSummary}>
              <Typography.SansBodyM className={styles.priceSummaryText}>Оценка бюджета</Typography.SansBodyM>

              <MobileDropdown
                open={openPriceSummary}
                onOpenChange={setOpenPriceSummary}
                content={<div className={styles.modalContent}>{priceSummary.content}</div>}
              >
                <div className={styles.priceSummaryRight}>
                  <Typography.SansLabelL className={styles.priceSummaryTotal}>
                    {priceSummary.total}
                  </Typography.SansLabelL>
                  {priceSummary.content && <ButtonFunction size='m' icon={<ChevronRightSVG />} />}
                </div>
              </MobileDropdown>
            </div>
          )}

          {footer && (
            <div
              className={styles.actions}
              data-column={(footer.buttonAdditional && footer.buttonSecondary) || undefined}
            >
              {footer.buttonAdditional && <AdditionalButton {...footer.buttonAdditional} size='m' fullWidth />}

              {footer.buttonSecondary && (
                <SecondaryButton
                  {...footer.buttonSecondary}
                  size='m'
                  fullWidth
                  appearance='neutral'
                  label={
                    footer.buttonSecondary.variant === 'custom'
                      ? footer.buttonSecondary.label
                      : textProvider(languageCode, footer.buttonSecondary.variant as unknown as Texts)
                  }
                />
              )}

              <PrimaryButton
                {...footer.buttonPrimary}
                size='m'
                fullWidth
                label={
                  footer.buttonPrimary.variant === 'custom'
                    ? footer.buttonPrimary.label
                    : textProvider(languageCode, footer.buttonPrimary.variant as unknown as Texts)
                }
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
