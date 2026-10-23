import { useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { Typography } from '@snack-uikit/typography';

import { FormFields } from '../../helperComponents';
import { SiteFormProvider } from '../../providers';
import { SiteFormHelpers, SiteFormProps, SiteFormValues } from '../../types';
import s from './styles.module.scss';

const noop = () => {};

export function SiteForm({
  layoutType,
  fields,
  multipleComment,
  loading,
  onSubmit,
  getCompanySuggestions,
  content = {},
  agreement,
  events = {},
}: SiteFormProps) {
  const { title, subtitle, buttonTitle = 'Отправить', footnote } = content;
  const { onFieldFill = noop, onControlClick, onInteraction, onInvalidSubmit } = events;

  const formMethods = useForm<SiteFormValues>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  });

  const { handleSubmit, setError, reset } = formMethods;

  const isInteractionSentRef = useRef(false);

  const helpers: SiteFormHelpers = {
    setFieldError: (name, message) => setError(name, { type: 'server', message }),
    reset: () => reset(),
  };

  const handleValidSubmit = (values: SiteFormValues) => onSubmit(values, helpers);
  const handleInvalidSubmit = () => onInvalidSubmit?.();
  const handleFormSubmit = handleSubmit(handleValidSubmit, handleInvalidSubmit);

  const handleClick = () => {
    if (!onInteraction || isInteractionSentRef.current) {
      return;
    }

    isInteractionSentRef.current = true;
    onInteraction();
  };

  return (
    <SiteFormProvider
      layoutType={layoutType}
      onControlClick={onControlClick}
      getCompanySuggestions={getCompanySuggestions}
    >
      <FormProvider {...formMethods}>
        {/* Клик нужен только для аналитики взаимодействия с формой. */}
        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
        <form
          onClick={handleClick}
          onSubmit={handleFormSubmit}
          data-test-id='section_form'
          data-layout-type={layoutType}
          className={s.form}
        >
          {(title || subtitle) && (
            <div className={s.header}>
              {title && (
                <Typography family='sans' purpose='headline' size='l' tag='h2'>
                  {title}
                </Typography>
              )}
              {subtitle && (
                <Typography family='sans' purpose='body' size='l'>
                  {subtitle}
                </Typography>
              )}
            </div>
          )}

          <FormFields
            layoutType={layoutType}
            fields={fields}
            multipleComment={multipleComment}
            loading={loading}
            buttonTitle={buttonTitle}
            footnote={footnote}
            agreement={agreement}
            onFieldFill={onFieldFill}
          />
        </form>
      </FormProvider>
    </SiteFormProvider>
  );
}
