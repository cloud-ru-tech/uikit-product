import { Typography } from '@snack-uikit/typography';

import { Submit, UserAgreementCheckboxes } from '../../components';
import { SiteFormContent, SiteFormProps } from '../../types';
import { FormFieldItem } from './FormFieldItem';
import s from './styles.module.scss';

type FormFieldsProps = Pick<SiteFormProps, 'fields' | 'layoutType' | 'multipleComment' | 'loading' | 'agreement'> &
  Pick<SiteFormContent, 'buttonTitle' | 'footnote'> & {
    onFieldFill(name: string): void;
  };

export function FormFields(props: FormFieldsProps) {
  const { fields, layoutType, loading, buttonTitle, footnote, multipleComment, agreement = {}, onFieldFill } = props;
  const {
    name: agreementName,
    labels: agreementLabels,
    specialConsentLink,
    withUserAgreement = true,
    withSubscribeForMailing = true,
    isSubscribeForMailingRequired,
  } = agreement;

  return (
    <>
      <div className={s.root}>
        {fields.map(field => (
          <FormFieldItem
            key={field.name ?? field.type}
            field={field}
            layoutType={layoutType}
            multipleComment={multipleComment}
            loading={loading}
            onFieldFill={onFieldFill}
          />
        ))}
      </div>
      {(withUserAgreement || withSubscribeForMailing) && (
        <UserAgreementCheckboxes
          specialConsentLink={specialConsentLink}
          agreementName={agreementName}
          labels={agreementLabels}
          onFieldFill={onFieldFill}
          onlyMail={!withUserAgreement}
          withSubscribeForMailing={withSubscribeForMailing}
          isSubscribeForMailingRequired={isSubscribeForMailingRequired}
          disabled={loading}
        />
      )}
      {footnote && (
        <Typography.SansBodyS className={s.footnote} tag='div'>
          {footnote}
        </Typography.SansBodyS>
      )}
      <Submit label={buttonTitle} loading={loading} />
    </>
  );
}
