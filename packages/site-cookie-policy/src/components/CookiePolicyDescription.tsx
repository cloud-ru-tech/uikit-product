import { Link } from '@snack-uikit/link';
import { Typography } from '@snack-uikit/typography';

import s from './styles.module.scss';

const LINKS = {
  cookie: 'https://cdn.cloud.ru/docs/legal/security/cybersecurity-pd/cookie-policy.pdf',
  policy: 'https://cdn.cloud.ru/docs/legal/security/cybersecurity-pd/recommendation-technologies-rules.pdf',
};

export function CookiePolicyDescription() {
  return (
    <Typography className={s.cookiePolicyDescription} family='sans' purpose='body' size='s'>
      Для повышения удобства работы с сайтом Cloud.ru использует файлы{' '}
      <Link
        insideText
        href={LINKS.cookie}
        textMode='on-accent'
        appearance='neutral'
        size='s'
        target='_blank'
        text='cookie'
      />{' '}
      и{' '}
      <Link
        insideText
        href={LINKS.policy}
        textMode='on-accent'
        appearance='neutral'
        size='s'
        target='_blank'
        text='рекомендательные технологии'
      />
      . В них содержатся данные о прошлых посещениях сайта. Если вы не хотите, чтобы эти данные обрабатывались,
      отключите cookie в настройках браузера.
    </Typography>
  );
}
