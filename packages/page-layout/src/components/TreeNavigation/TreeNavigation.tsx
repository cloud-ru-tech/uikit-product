import cn from 'classnames';
import { ReactNode, useMemo } from 'react';
import { useUncontrolledProp } from 'uncontrollable';

import { BurgerSVG, CloseSVG } from '@cloud-ru/uikit-product-icons';
import { useLocale } from '@cloud-ru/uikit-product-locale';
import { ButtonSimple } from '@snack-uikit/button';
import { Status, StatusProps } from '@snack-uikit/status';
import { TreeNodeProps } from '@snack-uikit/tree';
import { Typography } from '@snack-uikit/typography';

import { ConditionalPopover, Menu } from './helper-components';
import styles from './styles.module.scss';

export type TreeNavigationProps = {
  header: {
    /** Текст заголовка */
    title: string;
    /** Иконка */
    icon?: ReactNode;
    /** Текст описания */
    description?: string;
    /** Статус (цвет, иконка и т.п.) – любой тип, который принимает ваш <Status/> */
    status?: StatusProps;
    /** Раздел для действий */
    actions?: ReactNode;
  };
  menu: {
    /** Заголовок меню */
    menuTitle?: string;
    /** Данные для дерева меню */
    items: TreeNodeProps[];
    /** Управляемый режим: если передан, меню открывается как popover. */
    isMenuOpen?: boolean;
    /** Колбэк, вызываемый при попытке изменить состояние меню.
     *  В контролируемом режиме обязателен, в неконтролируемом – опционален.
     */
    onMenuToggle?: (open: boolean) => void;
    /** Открывать меню по умолчанию */
    defaultMenuOpened?: boolean;
    /** Позляет отключить кнопку "Свернуть все"*/
    enableShrinkMenuButton?: boolean;
    /** Открывать пункты меню по умолчанию */
    withDefaultOpenedMenuList?: boolean;
  };
  /** Контентная часть страницы */
  content: ReactNode;
  /** Вариант отображения */
  mode: 'popover' | 'aside';
  /** Класс для контейнера контентной части */
  contentClassName?: string;
};

export function TreeNavigation({
  header: { title, icon, description, status, actions },
  menu: {
    menuTitle,
    items,
    enableShrinkMenuButton,
    withDefaultOpenedMenuList,
    isMenuOpen,
    defaultMenuOpened,
    onMenuToggle,
  },
  content,
  mode,
  contentClassName,
}: TreeNavigationProps) {
  const [open, setOpen] = useUncontrolledProp(isMenuOpen, defaultMenuOpened, onMenuToggle);
  const { t } = useLocale('PageLayout');
  const menu = useMemo(
    () => (
      <Menu
        menuItems={items}
        menuTitle={menuTitle}
        enableShrinkMenuButton={enableShrinkMenuButton}
        withDefaultOpenedMenuList={withDefaultOpenedMenuList}
      />
    ),
    [items, menuTitle, enableShrinkMenuButton, withDefaultOpenedMenuList],
  );

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <div className={styles.titleWrapper}>
          <div className={styles.titleInner}>
            <ConditionalPopover
              isOpen={Boolean(open)}
              onOpenChange={setOpen}
              tip={menu}
              withPopover={mode === 'popover'}
            >
              <div className={styles.innerElement}>
                <ButtonSimple
                  size='xs'
                  aria-label={open ? t('TreeNavigation.closeMenu') : t('TreeNavigation.openMenu')}
                  icon={open ? <CloseSVG /> : <BurgerSVG />}
                  onClick={() => setOpen(!open)}
                />
              </div>
            </ConditionalPopover>
            {icon && (
              <div className={styles.innerElement}>
                <div className={styles.icon}>{icon}</div>
              </div>
            )}
            <Typography.SansTitleL className={styles.title}>{title}</Typography.SansTitleL>

            {status && (
              <div className={styles.innerElement}>
                <Status {...status} />
              </div>
            )}
          </div>
          {description && <Typography.SansBodyS className={styles.description}>{description}</Typography.SansBodyS>}
        </div>

        {actions}
      </div>

      <div className={styles.body}>
        {mode === 'aside' && open && <aside className={styles.sidebar}>{menu}</aside>}
        <div className={cn(styles.main, contentClassName)}>{content}</div>
      </div>
    </div>
  );
}
