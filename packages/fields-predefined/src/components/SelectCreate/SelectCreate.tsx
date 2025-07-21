import { memo, useCallback, useMemo } from 'react';

import { PlusSVG } from '@sbercloud/uikit-product-icons';
import { useLocale } from '@sbercloud/uikit-product-locale';
import { AdaptiveFieldSelect } from '@sbercloud/uikit-product-mobile-fields';
import { AdaptiveDrawer, AdaptiveModal, DrawerProps, ModalProps } from '@sbercloud/uikit-product-mobile-modal';
import { extractSupportProps, WithLayoutType, WithSupportProps } from '@sbercloud/uikit-product-utils';
import { ButtonFunction } from '@snack-uikit/button';
import { IconPredefinedProps } from '@snack-uikit/icon-predefined';
import { TooltipProps, WithTooltip } from '@snack-uikit/tooltip';

import { useOpen } from '../../hooks';
import { SelectFooter } from './SelectFooter';
import { EntityName, FieldSelectProps, LayoutProps } from './types';
import { useSelectDataStates } from './useSelectDataStates';

export type SelectCreateProps = WithSupportProps<
  WithLayoutType &
    LayoutProps & {
      /** Тип объекта для создания новой опции (в единственном числе вин.падеже для кнопки Создать <entityName> и множественном числе) */
      entityName: EntityName;
      /** Коллбек создания новой опции, при успешном выполнении возвращает value новой опции */
      submitHandler: () => Promise<string | void>;
      /** Пропсы прокидываемые в селект */
      selectProps: FieldSelectProps;
      /** Коллбек рефетча запроса на получение списка опций в случае ошибки (при передаче dataError в selectProps). */
      onRefetch?: VoidFunction;
      className?: string;
      /** Коллбек после закрытия модального окна/дровера */
      afterClose?: VoidFunction;
      /** Иконка сервиса */
      entityIcon?: IconPredefinedProps['icon'];
      /** Управление состоянием компонента в зависимости от прав пользователя (по дефолту permission = 'canCreate') */
      permission?: 'none' | 'canRead' | 'canCreate';
    }
>;

export const SelectCreate = memo(function SelectCreate({
  selectProps,
  createLayoutProps,
  createLayoutType = 'drawer',
  entityName,
  submitHandler,
  onRefetch,
  className,
  afterClose,
  entityIcon,
  permission = 'canCreate',
  layoutType,
  ...rest
}: SelectCreateProps) {
  const { t } = useLocale('FieldsPredefined');
  const { onClose, onOpen, isOpen } = useOpen();
  const selectDataStates = useSelectDataStates({ entityName, entityIcon, onRefetch });
  const selectSize: FieldSelectProps['size'] = selectProps.size || 'm';

  const handleClose = useCallback(() => {
    onClose();
    afterClose?.();
  }, [afterClose, onClose]);

  const handleCreate = useCallback(async () => {
    const newOption = await submitHandler();
    selectProps.onChange?.(newOption);
    handleClose();
  }, [handleClose, selectProps, submitHandler]);

  const buttons = useMemo<Pick<ModalProps, 'approveButton' | 'cancelButton'>>(
    () => ({
      approveButton: { label: t('SelectCreate.buttonCreate'), onClick: handleCreate },
      cancelButton: { label: t('SelectCreate.buttonCancel'), onClick: onClose },
    }),
    [t, handleCreate, onClose],
  );

  const formLayout = useMemo(() => {
    const layoutProps = { ...createLayoutProps, ...buttons, open: isOpen, onClose: handleClose, layoutType };

    return createLayoutType === 'modal' ? (
      <AdaptiveModal {...(layoutProps as WithLayoutType<ModalProps>)} />
    ) : (
      <AdaptiveDrawer {...(layoutProps as WithLayoutType<DrawerProps>)} />
    );
  }, [createLayoutProps, buttons, isOpen, handleClose, layoutType, createLayoutType]);

  const createBtnLabel = `${t('SelectCreate.buttonCreate')} ${entityName.single.toLocaleLowerCase()}`;

  const tooltipProps: TooltipProps = {
    tip: t('SelectCreate.noPermission'),
    placement: 'top',
  };

  return (
    <div className={className} {...extractSupportProps(rest)} data-test-id='select-create__wrapper'>
      <WithTooltip tooltip={permission === 'none' ? tooltipProps : undefined}>
        <AdaptiveFieldSelect
          layoutType={layoutType}
          placeholder={t('SelectCreate.selectPlaceholder')}
          {...selectDataStates}
          {...selectProps}
          size={selectSize}
          footer={
            <SelectFooter onClick={onOpen} createButtonLabel={createBtnLabel} canCreate={permission === 'canCreate'} />
          }
          disabled={permission === 'none'}
        />
        <WithTooltip tooltip={permission === 'canRead' ? tooltipProps : undefined}>
          <ButtonFunction
            label={createBtnLabel}
            icon={<PlusSVG />}
            iconPosition='before'
            onClick={onOpen}
            size={selectSize}
            data-test-id='select-create__create-button'
            disabled={permission !== 'canCreate'}
          />
        </WithTooltip>
      </WithTooltip>
      {formLayout}
    </div>
  );
});
