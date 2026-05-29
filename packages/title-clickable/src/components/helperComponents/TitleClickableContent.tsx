import { Avatar } from '@snack-uikit/avatar';
import { TruncateString } from '@snack-uikit/truncate-string';
import { Typography } from '@snack-uikit/typography';

import { TEST_IDS } from '../../constants';
import { TitleClickableProps } from '../../types';
import styles from './styles.module.scss';

type TitleClickableContent = Pick<
  TitleClickableProps,
  'title' | 'icon' | 'children' | 'titleTag' | 'avatar' | 'fullWidth'
>;

export function TitleClickableContent({
  title,
  icon: Icon,
  children,
  titleTag,
  avatar,
  fullWidth,
}: TitleClickableContent) {
  return (
    <div data-test-id={TEST_IDS.content} className={styles.contentWrapper} data-full-width={fullWidth || undefined}>
      {Icon && <Icon data-test-id={TEST_IDS.icon} size={24} className={styles.iconTitleWrapper} />}

      {title && (
        <div className={styles.titleWrapper}>
          <Typography.SansTitleM tag={titleTag} data-test-id={TEST_IDS.title}>
            <TruncateString text={title} maxLines={1} variant='end' />
          </Typography.SansTitleM>
        </div>
      )}

      {avatar && (
        <>
          <Avatar {...avatar} data-test-id={TEST_IDS.avatar} />
          <div className={styles.avatarWrapper}>
            <Typography.SansLabelL tag='span' data-test-id={TEST_IDS.avatarLabel}>
              <TruncateString text={avatar.name} maxLines={1} variant='end' />
            </Typography.SansLabelL>
            <Typography.SansBodyS className={styles.subtitle} tag='span' data-test-id={TEST_IDS.avatarSubtitle}>
              <TruncateString text={avatar.subtitle} maxLines={1} variant='end' />
            </Typography.SansBodyS>
          </div>
        </>
      )}

      {children}
    </div>
  );
}
