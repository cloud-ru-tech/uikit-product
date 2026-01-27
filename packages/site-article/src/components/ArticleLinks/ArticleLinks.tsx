import { MouseEvent, useMemo } from 'react';

import { WithLayoutType } from '@cloud-ru/uikit-product-utils';
import { Typography, TypographyProps } from '@snack-uikit/typography';

import styles from './styles.module.scss';

export type ArticleLink = {
  id: string;
  text: string;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
};

export type ArticleLinksProps = WithLayoutType<{
  links: ArticleLink[];
}>;

export function ArticleLinks(props: ArticleLinksProps) {
  const { layoutType, links } = props;

  const typographyProps: TypographyProps = useMemo(() => {
    if (layoutType === 'mobile') {
      return {
        family: 'sans',
        purpose: 'title',
        size: 'm',
      };
    }

    return {
      family: 'sans',
      purpose: 'title',
      size: 'l',
    };
  }, [layoutType]);

  return (
    <div className={styles.articleLinks}>
      <Typography className={styles.title} {...typographyProps} tag='div'>
        Содержание
      </Typography>
      <ul className={styles.list} data-test-id='article-links'>
        {links.map(link => (
          <li className={styles.listItem} key={link.id}>
            <a className={styles.link} href={`#${link.id}`} onClick={e => link.onClick?.(e)}>
              <Typography.SansBodyL>{link.text}</Typography.SansBodyL>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
