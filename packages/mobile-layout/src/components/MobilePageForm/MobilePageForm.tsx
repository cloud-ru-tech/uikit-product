import cn from 'classnames';
import { PropsWithChildren } from 'react';

import { MobileTooltipProps } from '@sbercloud/uikit-product-mobile-tooltip';
import { extractSupportProps, useLanguage, WithSupportProps } from '@sbercloud/uikit-product-utils';
import {
  ButtonFilled,
  ButtonFilledProps,
  ButtonOutline,
  ButtonOutlineProps,
  ButtonSimple,
  ButtonSimpleProps,
} from '@snack-uikit/button';
import { ValueOf } from '@snack-uikit/utils';

import { Headline, HeadlineProps } from '../../helperComponents';
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

export type MobilePageFormProps = WithSupportProps<
  PropsWithChildren<
    Pick<HeadlineProps, 'title' | 'subHeader'> & {
      className?: string;
      footer?: {
        buttonPrimary: (
          | {
              variant: ButtonPrimaryVariant;
            }
          | {
              variant: 'custom';
              label: string;
            }
        ) & {
          tooltip?: MobileTooltipProps;
        } & Omit<ButtonFilledProps, 'label'>;
        buttonSecondary?: (
          | {
              variant: ButtonSecondaryVariant;
            }
          | {
              variant: 'custom';
              label: string;
            }
        ) & {
          tooltip?: MobileTooltipProps;
        } & Omit<ButtonOutlineProps, 'label'>;
        buttonAdditional?: ButtonSimpleProps & {
          tooltip?: MobileTooltipProps;
        };
      };
    }
  >
>;

export function MobilePageForm({ children, title, subHeader, className, footer, ...rest }: MobilePageFormProps) {
  const { languageCode } = useLanguage();

  const PrimaryButton = useButtonWithTooltip({ Button: ButtonFilled, tooltip: footer?.buttonPrimary.tooltip });
  const SecondaryButton = useButtonWithTooltip({ Button: ButtonOutline, tooltip: footer?.buttonSecondary?.tooltip });
  const AdditionalButton = useButtonWithTooltip({ Button: ButtonSimple, tooltip: footer?.buttonAdditional?.tooltip });

  return (
    <div className={cn(styles.container, className)} {...extractSupportProps(rest)}>
      <div className={styles.form}>
        <Headline title={title} subHeader={subHeader} />

        <div className={styles.body}>{children}</div>

        {footer && (
          <div className={styles.footer}>
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
    </div>
  );
}
