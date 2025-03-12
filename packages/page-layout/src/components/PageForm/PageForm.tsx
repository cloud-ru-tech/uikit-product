import cn from 'classnames';
import { PropsWithChildren, ReactNode, useMemo } from 'react';

import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';
import {
  ButtonFilled,
  ButtonFilledProps,
  ButtonOutline,
  ButtonOutlineProps,
  ButtonSimple,
  ButtonSimpleProps,
} from '@snack-uikit/button';
import { TooltipProps } from '@snack-uikit/tooltip';

import { Headline, HeadlineProps } from '../Headline';
import { useButtonWithTooltip, useGetButtonLabel } from './hooks';
import styles from './styles.module.scss';
import { ButtonPrimaryVariant, ButtonSecondaryVariant } from './types';

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
  const getButtonLabel = useGetButtonLabel();

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
                    : getButtonLabel(footer.buttonSecondary.variant)
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
                    : getButtonLabel(footer.buttonPrimary.variant)
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
