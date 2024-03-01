import cn from 'classnames';
import { PropsWithChildren, ReactNode } from 'react';

import { useLanguage } from '@sbercloud/uikit-product-utils';
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
} as const;

export const BUTTON_SECONDARY_VARIANT = {
  Cancel: 'cancel',
  Back: 'back',
} as const;

export type ButtonPrimaryVariant = ValueOf<typeof BUTTON_PRIMARY_VARIANT>;
export type ButtonSecondaryVariant = ValueOf<typeof BUTTON_SECONDARY_VARIANT>;

export type PageFormProps = PropsWithChildren<
  Pick<HeadlineProps, 'title'> & {
    prefix?: ReactNode;
    className?: string;
    footer?: {
      buttonPrimary: {
        variant: ButtonPrimaryVariant;
        tooltip?: TooltipProps;
      } & Omit<ButtonFilledProps, 'label'>;
      buttonSecondary?: {
        variant: ButtonSecondaryVariant;
        tooltip?: TooltipProps;
      } & Omit<ButtonOutlineProps, 'label'>;
      buttonAdditional?: ButtonSimpleProps & {
        tooltip?: TooltipProps;
      };
    };
  }
>;

export function PageForm({ children, title, className, prefix, footer }: PageFormProps) {
  const { languageCode } = useLanguage();

  const PrimaryButton = useButtonWithTooltip({ Button: ButtonFilled, tooltip: footer?.buttonPrimary.tooltip });
  const SecondaryButton = useButtonWithTooltip({ Button: ButtonOutline, tooltip: footer?.buttonSecondary?.tooltip });
  const AdditionalButton = useButtonWithTooltip({ Button: ButtonSimple, tooltip: footer?.buttonAdditional?.tooltip });

  return (
    <div className={cn(styles.container, className)}>
      <div className={styles.form}>
        <div>
          <div className={styles.prefix}>{prefix}</div>
          <Headline title={title} />
        </div>

        <div>{children}</div>

        {footer && (
          <div className={styles.footer}>
            {footer.buttonSecondary && (
              <SecondaryButton
                size='m'
                {...footer.buttonSecondary}
                label={textProvider(languageCode, footer.buttonSecondary.variant as unknown as Texts)}
              />
            )}

            <div className={styles.mainActions}>
              {footer.buttonAdditional && <AdditionalButton size='m' {...footer.buttonAdditional} />}

              <PrimaryButton
                size='m'
                {...footer.buttonPrimary}
                label={textProvider(languageCode, footer.buttonPrimary.variant as unknown as Texts)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
