import { useContext } from 'react';

import { ButtonFilled } from '@snack-uikit/button';

import { SiteFormContext } from '../../../context';

type Props = {
  label?: string;
  disabled?: boolean;
  loading?: boolean;
};

export function Submit({ label = '', disabled, loading }: Props) {
  const { onControlClick } = useContext(SiteFormContext);

  const handleClick = () => {
    onControlClick?.({ content: label, id: 'submit-button' });
  };

  return (
    <ButtonFilled
      fullWidth
      disabled={disabled}
      loading={loading}
      type='submit'
      label={label}
      size='l'
      data-test-id='section_form_submit'
      onClick={handleClick}
    />
  );
}
