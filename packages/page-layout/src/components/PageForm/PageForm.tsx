import cn from 'classnames';
import { PropsWithChildren, ReactNode, useMemo } from 'react';

import { extractSupportProps, useLanguage, WithSupportProps } from '@sbercloud/uikit-product-utils';
import {
  ButtonFilled,
  ButtonFilledProps,
  ButtonOutline,
  ButtonOutlineProps,
  ButtonSimple,
  ButtonSimpleProps,
} from '@snack-uikit/button';
import { TooltipProps } from '@snack-uikit/tooltip';
import { ValueOf } from '@snack-uikit/utils';

import { textProvider, Texts } from '../../helpers/texts-provider';
import { Headline, HeadlineProps } from '../Headline';
import { useButtonWithTooltip } from './hooks';
import styles from './styles.module.scss';

export const BUTTON_PRIMARY_VARIANT = {
  Continue: 'continue',
  Create: 'create',
  Save: 'save',
  Rent: 'rent',
  Send: 'send',
  Restore: 'restore',
} as const;

export const BUTTON_SECONDARY_VARIANT = {
  Cancel: 'cancel',
  Back: 'back',
} as const;

export type ButtonPrimaryVariant = ValueOf<typeof BUTTON_PRIMARY_VARIANT>;
export type ButtonSecondaryVariant = ValueOf<typeof BUTTON_SECONDARY_VARIANT>;

export type PageFormProps = WithSupportProps<
  PropsWithChildren<
    Pick<HeadlineProps, 'title' | 'subHeader'> & {
      className?: string;

      stepper?: ReactNode;

      priceSummary?: {
        total: ReactNode;
        content?: ReactNode;
      };

      sideBlock?: {
        label: string;
        content: ReactNode;
      }[];

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
          tooltip?: TooltipProps;
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
          tooltip?: TooltipProps;
        } & Omit<ButtonOutlineProps, 'label'>;
        buttonAdditional?: ButtonSimpleProps & {
          tooltip?: TooltipProps;
        };
      };
    }
  >
>;

export function PageForm({
  children,
  stepper,
  title,
  subHeader,
  className,
  footer,
  sideBlock,
  priceSummary,
  ...rest
}: PageFormProps) {
  const { languageCode } = useLanguage();

  const moreItems = useMemo(
    () => [priceSummary?.content].concat(sideBlock?.map(item => item.content)).filter(Boolean),
    [priceSummary?.content, sideBlock],
  );

  const PrimaryButton = useButtonWithTooltip({ Button: ButtonFilled, tooltip: footer?.buttonPrimary.tooltip });
  const SecondaryButton = useButtonWithTooltip({ Button: ButtonOutline, tooltip: footer?.buttonSecondary?.tooltip });
  const AdditionalButton = useButtonWithTooltip({ Button: ButtonSimple, tooltip: footer?.buttonAdditional?.tooltip });

  return (
    <div className={cn(styles.container, className)} {...extractSupportProps(rest)}>
      <div className={styles.form}>
        <div className={styles.headline}>
          <Headline title={title} subHeader={subHeader} />
        </div>

        {stepper}

        <div className={styles.body}>{children}</div>

        {footer && (
          <div className={styles.footer}>
            {footer.buttonSecondary && (
              <SecondaryButton
                {...footer.buttonSecondary}
                size='m'
                appearance='neutral'
                label={
                  footer.buttonSecondary.variant === 'custom'
                    ? footer.buttonSecondary.label
                    : textProvider(languageCode, footer.buttonSecondary.variant as unknown as Texts)
                }
              />
            )}

            <div className={styles.mainActions}>
              {footer.buttonAdditional && <AdditionalButton {...footer.buttonAdditional} size='m' />}

              <PrimaryButton
                {...footer.buttonPrimary}
                size='m'
                label={
                  footer.buttonPrimary.variant === 'custom'
                    ? footer.buttonPrimary.label
                    : textProvider(languageCode, footer.buttonPrimary.variant as unknown as Texts)
                }
              />
            </div>
          </div>
        )}
      </div>

      {moreItems?.length > 0 && <div className={styles.sideItems}>{moreItems}</div>}
    </div>
  );
}
