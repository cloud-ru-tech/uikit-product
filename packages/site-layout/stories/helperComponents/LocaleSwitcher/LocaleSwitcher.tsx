import { useMemo, useState } from 'react';

import { InternetSVG } from '@sbercloud/uikit-product-icons';
import { ButtonFunction } from '@snack-uikit/button';
import { Droplist } from '@snack-uikit/list';

import { LANG_OPTIONS } from './constants';

type Lang = {
  id: string;
  content: string;
  href: string;
};

const [ruLang, cnLang] = LANG_OPTIONS;

const getCurrentLang = (langId: string): Lang => (langId === ruLang.id ? ruLang : cnLang);

export function LocaleSwitcher() {
  const [lang, setLang] = useState<string>(ruLang.id);

  const currentLang = useMemo(() => getCurrentLang(lang), [lang]);

  const handleLangChange = (value: string) => {
    if (value === lang || !value) {
      return;
    }

    setLang(value);
  };

  return (
    <Droplist
      trigger='click'
      items={LANG_OPTIONS}
      placement='bottom'
      closeDroplistOnItemClick
      selection={{ value: lang, onChange: handleLangChange, mode: 'single' }}
    >
      <ButtonFunction icon={<InternetSVG size={24} />} iconPosition='before' label={currentLang.content} />
    </Droplist>
  );
}
