import {
  ButtonFilled,
  ButtonFilledProps,
  ButtonOutline,
  ButtonOutlineProps,
  ButtonSimple,
  ButtonSimpleProps,
} from '@snack-uikit/button';
import { Link, LinkProps } from '@snack-uikit/link';
import { TruncateString } from '@snack-uikit/truncate-string';
import { Typography } from '@snack-uikit/typography';

import { ALIGN, TEST_IDS } from '../../constants';
import { Align } from '../../types';
import { getAlignProps, getButtonsSize } from '../../utils';
import { MobileModalCustom, MobileModalCustomProps } from '../MobileModalCustom';
import styles from './styles.module.scss';

export type MobileModalProps = Omit<MobileModalCustomProps, 'children'> & {
  /** Заголовок модального окна */
  title: string;
  /** Всплывающая подсказка для заголовка */
  titleTooltip?: MobileModalCustom.HeaderProps['titleTooltip'];
  /** Подзаголовок */
  subtitle?: string;
  /** Содержимое модального окна */
  content?: MobileModalCustom.BodyProps['content'];
  /** Основная кнопка действия */
  approveButton: Omit<ButtonFilledProps, 'size' | 'data-test-id'>;
  /** Кнопка отмены */
  cancelButton?: Omit<ButtonOutlineProps, 'size' | 'data-test-id'>;
  /** Вторая кнопка действия */
  additionalButton?: Omit<ButtonSimpleProps, 'size' | 'data-test-id'>;
  /** Небольшой текст под кнопками футера с возможностью передать дополнительно ссылку */
  disclaimer?: {
    text: string;
    link?: Pick<LinkProps, 'text' | 'href' | 'target' | 'external'>;
  };
  /**
   * Выравнивание, для разных размеров доступны разные значения
   * <br> для size=`s` - все
   */
  align?: Align;
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

export function MobileModal({
  title,
  titleTooltip,
  subtitle,
  content,
  approveButton,
  cancelButton,
  additionalButton,
  disclaimer,
  truncate,
  align = ALIGN.Default,
  ...rest
}: MobileModalProps) {
  const aligns = getAlignProps({ align });
  const buttonsSize = getButtonsSize();

  return (
    <MobileModalCustom {...rest}>
      <MobileModalCustom.Header
        title={<TruncateString text={title} maxLines={truncate?.title || 1} />}
        titleTooltip={titleTooltip}
        subtitle={subtitle ? <TruncateString text={subtitle} maxLines={truncate?.subtitle || 2} /> : undefined}
        align={aligns.header}
      />

      {Boolean(content) && (
        <MobileModalCustom.Body className={styles.modalBody} content={content} align={aligns.body} />
      )}

      <MobileModalCustom.Footer
        actions={
          <>
            <ButtonFilled
              appearance='primary'
              {...approveButton}
              size={buttonsSize}
              className={styles.footerButton}
              data-test-id={TEST_IDS.approveButton}
            />

            {cancelButton && (
              <ButtonOutline
                appearance='neutral'
                {...cancelButton}
                size={buttonsSize}
                className={styles.footerButton}
                data-test-id={TEST_IDS.cancelButton}
              />
            )}

            {additionalButton && (
              <ButtonSimple
                appearance='neutral'
                {...additionalButton}
                size={buttonsSize}
                className={styles.footerButton}
                data-test-id={TEST_IDS.additionalButton}
              />
            )}
          </>
        }
        disclaimer={
          disclaimer && (
            <>
              <Typography.SansBodyS data-test-id={TEST_IDS.disclaimerText}>{disclaimer.text}</Typography.SansBodyS>

              {disclaimer.link && (
                <Link external {...disclaimer.link} size='s' data-test-id={TEST_IDS.disclaimerLink} />
              )}
            </>
          )
        }
        align={aligns.footer}
        className={styles.modalFooter}
      />
    </MobileModalCustom>
  );
}
