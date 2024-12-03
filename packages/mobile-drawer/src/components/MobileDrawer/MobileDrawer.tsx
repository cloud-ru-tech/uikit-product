import { ReactElement } from 'react';

import { MobileTooltipProps } from '@sbercloud/uikit-product-mobile-tooltip';
import {
  ButtonFilled,
  ButtonFilledProps,
  ButtonOutline,
  ButtonOutlineProps,
  ButtonSimple,
  ButtonSimpleProps,
} from '@snack-uikit/button';

import { TEST_IDS } from '../../constants';
import { DrawerBodyProps, DrawerHeaderProps } from '../../helperComponents';
import { WithTooltip } from '../../helperComponents/WithTooltip';
import { Size } from '../../types';
import { MobileDrawerCustom, MobileDrawerCustomProps } from '../MobileDrawerCustom';
import styles from './styles.module.scss';

export type DrawerProps = Omit<
  MobileDrawerCustomProps,
  'size' | 'children' | 'nestedDrawer' | 'push' | 'closeButtonEnabled' | 'swipeEnabled'
> &
  Pick<DrawerHeaderProps, 'titleTooltip' | 'image'> &
  Pick<DrawerBodyProps, 'content'> & {
    /** Заголовок */
    title: string;
    /** Подзаголовок */
    subtitle?: string;
    /** Размер */
    size?: Size;
    /** Основная кнопка */
    approveButton?: Omit<ButtonFilledProps, 'size'> & { tooltip?: MobileTooltipProps };
    /** Кнопка отмены */
    cancelButton?: Omit<ButtonOutlineProps, 'size'> & { tooltip?: MobileTooltipProps };
    /** Дополнительная кнопка */
    additionalButton?: Omit<ButtonSimpleProps, 'size'> & { tooltip?: MobileTooltipProps };
    /** Вложенный Drawer */
    nestedDrawer?: ReactElement<DrawerProps>;
    /**
     *  Максимальное кол-во строк
     * <br> - `title` - в заголовке
     * <br> - `subtitle` - в подзаголовке
     * @default '{ <br>title: 1; <br>subtitle: 2; }'
     */
    truncate?: {
      title?: number;
      subtitle?: number;
    };
  };

/** Готовый компонент Drawer */
export function MobileDrawer({
  title,
  titleTooltip,
  subtitle,
  image,
  content,
  approveButton,
  cancelButton,
  additionalButton,
  ...rest
}: DrawerProps) {
  const needFooter = Boolean(approveButton) || Boolean(cancelButton) || Boolean(additionalButton);

  return (
    <MobileDrawerCustom {...rest} closeButtonEnabled={true} swipeEnabled={false}>
      <MobileDrawerCustom.Header
        title={title}
        titleTooltip={titleTooltip}
        subtitle={subtitle}
        image={image}
        data-test-id={TEST_IDS.header}
      />

      <MobileDrawerCustom.Body content={content} data-test-id={TEST_IDS.content} />

      {needFooter ? (
        <MobileDrawerCustom.Footer
          data-test-id={TEST_IDS.footer}
          actions={
            <>
              {approveButton && (
                <WithTooltip tooltip={approveButton.tooltip}>
                  <ButtonFilled
                    appearance='primary'
                    size='m'
                    data-test-id={TEST_IDS.approveButton}
                    {...approveButton}
                  />
                </WithTooltip>
              )}

              {cancelButton && (
                <WithTooltip tooltip={cancelButton.tooltip}>
                  <ButtonOutline appearance='neutral' size='m' data-test-id={TEST_IDS.cancelButton} {...cancelButton} />
                </WithTooltip>
              )}

              {additionalButton && (
                <WithTooltip tooltip={additionalButton.tooltip}>
                  <ButtonSimple
                    appearance='neutral'
                    size='m'
                    data-test-id={TEST_IDS.additionalButton}
                    {...additionalButton}
                  />
                </WithTooltip>
              )}
            </>
          }
        />
      ) : (
        <div className={styles.footerPlug} />
      )}
    </MobileDrawerCustom>
  );
}
