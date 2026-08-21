import cn from 'classnames';
import { ComponentType, MouseEvent } from 'react';

import { HabrSVG, TelegramSVG, VkSVG, YoutubeSVG } from '@cloud-ru/uikit-product-icons';
import { ButtonSimple } from '@snack-uikit/button';

import { FOOTER_ELEMENT } from '../../constants';
import { useFooterClick } from '../../hooks';
import { type FooterHandlers, type FooterSocialItem, type SocialNetworkShortName } from '../../types';
import { MaxSVG } from './MaxSVG';
import styles from './styles.module.scss';

const ICONS: Record<SocialNetworkShortName, ComponentType<{ size?: number }>> = {
  hb: HabrSVG,
  tg: TelegramSVG,
  max: MaxSVG,
  yt: YoutubeSVG,
  vk: VkSVG,
};

export type SocialButtonsProps = FooterHandlers & {
  className?: string;
  socials: FooterSocialItem[];
};

export function SocialButtons({ className, socials, onElementClick, onNavigate }: SocialButtonsProps) {
  const handleClick = useFooterClick({ onElementClick, onNavigate });

  if (socials.length === 0) {
    return null;
  }

  return (
    <div className={cn(styles.root, className)} data-qa='footer-socials'>
      {socials.map(({ name, url, label }) => {
        const Icon = ICONS[name];

        const onSocialClick = (event: MouseEvent<HTMLElement>) =>
          handleClick({ element: FOOTER_ELEMENT.Social, id: name, text: label ?? name, url, isExternal: true }, event);

        return (
          <ButtonSimple
            key={name}
            className={styles.button}
            size='m'
            href={url}
            target='_blank'
            icon={<Icon size={24} />}
            aria-label={label ?? name}
            data-qa={`footer-social-${name}`}
            onClick={onSocialClick}
          />
        );
      })}
    </div>
  );
}
