import cn from 'classnames';

import { Habr } from './Habr';
import styles from './styles.module.scss';
import { Telegram } from './Telegram';
import { Vkontakte } from './Vkontakte';
import { Youtube } from './Youtube';

type SocialNetworkShortName = 'vk' | 'tg' | 'yt' | 'hb';

type SocialButtonProps = {
  classNameImg?: string;
  classNameImgHb?: string;
  classNameImgTg?: string;
  classNameImgVk?: string;
  classNameImgYt?: string;
  classNameSocialButton?: string;
  name: SocialNetworkShortName;
};

function SocialButton({
  classNameImg,
  classNameImgHb,
  classNameImgTg,
  classNameImgVk,
  classNameImgYt,
  classNameSocialButton,
  name,
}: SocialButtonProps) {
  let icon = null;
  let link = '';

  switch (name) {
    case 'vk':
      icon = <Vkontakte className={cn(styles.img, styles.imgVk, classNameImg, classNameImgVk)} />;
      link = 'https://vk.com/cloudruprovider';
      break;
    case 'tg':
      icon = <Telegram className={cn(styles.img, styles.imgTg, classNameImg, classNameImgTg)} />;
      link = 'https://t.me/cloudruprovider';
      break;
    case 'yt':
      icon = <Youtube className={cn(styles.img, styles.imgYt, classNameImg, classNameImgYt)} />;
      link = 'https://www.youtube.com/@cloudru_team';
      break;
    case 'hb':
      icon = <Habr className={cn(styles.img, styles.imgHb, classNameImg, classNameImgHb)} />;
      link = 'https://habr.com/ru/companies/cloud_ru/articles/';
      break;
    default:
      break;
  }

  return (
    <a
      aria-label='Social button'
      className={cn(styles.socialButton, classNameSocialButton)}
      href={link}
      target='_blank'
      rel='noreferrer'
      data-qa='social-button'
    >
      {icon}
    </a>
  );
}

type SocialButtonsProps = {
  socialNamesArray?: SocialNetworkShortName[];
  classNameImg?: string;
  classNameImgHb?: string;
  classNameImgTg?: string;
  classNameImgVk?: string;
  classNameImgYt?: string;
  classNameSocialButton?: string;
};

export function SocialButtons({
  socialNamesArray = ['hb', 'tg', 'yt', 'vk'],
  className,
  classNameImg,
  classNameImgHb,
  classNameImgTg,
  classNameImgVk,
  classNameImgYt,
  classNameSocialButton,
  ...rest
}: React.HTMLAttributes<HTMLDivElement> & SocialButtonsProps) {
  return (
    <div className={cn(styles.root, className)} {...rest}>
      {socialNamesArray.map((name, index) => (
        <SocialButton
          key={index}
          name={name}
          classNameImg={classNameImg}
          classNameImgHb={classNameImgHb}
          classNameImgTg={classNameImgTg}
          classNameImgVk={classNameImgVk}
          classNameImgYt={classNameImgYt}
          classNameSocialButton={classNameSocialButton}
        />
      ))}
    </div>
  );
}
