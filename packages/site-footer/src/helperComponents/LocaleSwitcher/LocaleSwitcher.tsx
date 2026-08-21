import { InternetSVG } from '@cloud-ru/uikit-product-icons';
import { ButtonFunction } from '@snack-uikit/button';
import { Droplist } from '@snack-uikit/list';

import { FOOTER_ELEMENT } from '../../constants';
import { type FooterElementClickHandler, type FooterLocaleOption } from '../../types';
import { isExternalUrl } from '../../utils';

export type LocaleSwitcherProps = {
  locales: FooterLocaleOption[];
  currentLocaleId?: string;
  onLocaleChange?(locale: FooterLocaleOption): void;
  onElementClick?: FooterElementClickHandler;
};

export function LocaleSwitcher({ locales, currentLocaleId, onLocaleChange, onElementClick }: LocaleSwitcherProps) {
  const currentLocale = locales.find(({ id }) => id === currentLocaleId) ?? locales[0];

  if (locales.length < 2 || !currentLocale) {
    return null;
  }

  const handleLocaleChange = (value: string) => {
    const selectedLocale = locales.find(({ id }) => id === value);

    if (!selectedLocale || selectedLocale.id === currentLocale.id) {
      return;
    }

    onElementClick?.({
      element: FOOTER_ELEMENT.Locale,
      id: selectedLocale.id,
      text: selectedLocale.content,
      url: selectedLocale.href,
      isExternal: isExternalUrl(selectedLocale.href),
    });

    onLocaleChange?.(selectedLocale);
  };

  return (
    <Droplist
      trigger='click'
      items={locales}
      placement='bottom'
      closeDroplistOnItemClick
      selection={{ value: currentLocale.id, onChange: handleLocaleChange, mode: 'single' }}
    >
      <ButtonFunction
        size='l'
        icon={<InternetSVG size={24} />}
        iconPosition='before'
        label={currentLocale.content}
        data-qa='footer-locale-switcher'
      />
    </Droplist>
  );
}
