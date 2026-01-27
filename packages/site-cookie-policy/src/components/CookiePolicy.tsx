import cn from 'classnames';
import { useCallback, useEffect, useState } from 'react';

import { useLocalStorage, WithLayoutType } from '@cloud-ru/uikit-product-utils';
import { ButtonFilled } from '@snack-uikit/button';

import { COOKIE_POLICY_RIGHT_SECTION_TEXT, COOKIE_POLICY_STORAGE_KEY } from '../constants';
import { CookiePolicyDescription } from './CookiePolicyDescription';
import s from './styles.module.scss';

export type CookiePolicyProps = WithLayoutType<{
  /** Дополнительный className root элемента */
  className?: string;
  /** Событие клика на кнопку */
  onClick?(): void;
}>;

export function CookiePolicy({ className, onClick, layoutType }: CookiePolicyProps) {
  const [skipWidget, setSkipWidget] = useLocalStorage<'true' | 'false'>(COOKIE_POLICY_STORAGE_KEY, 'false');
  const [showCookiePolicy, setShowCookiePolicy] = useState(false);

  useEffect(() => {
    if (skipWidget === 'false') setShowCookiePolicy(true);
  }, [skipWidget]);

  const handleClickSubmit = useCallback(() => {
    setSkipWidget('true');
    setShowCookiePolicy(false);
    onClick?.();
  }, [setSkipWidget, onClick]);

  if (!showCookiePolicy) return null;

  return (
    <div className={cn(s.cookiePolicyWrapper, className)} data-layout-type={layoutType}>
      <div className={s.cookiePolicyDescriptionWithButton} data-layout-type={layoutType}>
        <CookiePolicyDescription />
        <ButtonFilled
          onClick={handleClickSubmit}
          label={COOKIE_POLICY_RIGHT_SECTION_TEXT}
          size='m'
          fullWidth={layoutType === 'mobile'}
        />
      </div>
    </div>
  );
}
