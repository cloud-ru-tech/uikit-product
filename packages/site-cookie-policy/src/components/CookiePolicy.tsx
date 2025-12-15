import { useCallback } from 'react';

import { useLocalStorage } from '@sbercloud/uikit-product-utils';
import { ButtonFilled } from '@snack-uikit/button';

import { COOKIE_POLICY_RIGHT_SECTION_TEXT, COOKIE_POLICY_STORAGE_KEY } from '../constants';
import { CookiePolicyDescription } from './CookiePolicyDescription';
import s from './styles.module.scss';

export function CookiePolicy() {
  const [skipWidget, setSkipWidget] = useLocalStorage<'true' | 'false'>(COOKIE_POLICY_STORAGE_KEY, 'false');

  const handleClickSubmit = useCallback(() => {
    setSkipWidget('true');
  }, [setSkipWidget]);

  if (skipWidget !== 'false') return null;

  return (
    <div className={s.cookiePolicyWrapper}>
      <div className={s.cookiePolicyDescriptionWithButton}>
        <CookiePolicyDescription />
        <ButtonFilled onClick={handleClickSubmit} label={COOKIE_POLICY_RIGHT_SECTION_TEXT} size='m' />
      </div>
    </div>
  );
}
