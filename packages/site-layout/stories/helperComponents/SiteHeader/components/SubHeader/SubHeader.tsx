import cn from 'classnames';
import React, { Dispatch, ReactNode, SetStateAction, useEffect } from 'react';

import { CloseSVG } from '@cloud-ru/uikit-product-icons';
import { WithLayoutType } from '@cloud-ru/uikit-product-utils';

import { Wrapper } from '../../../Wrapper';
import { bannerInfo } from '../../fixtures/bannerInfo';
import s from './styles.module.scss';

type BannerWrapperProps = {
  link?: string;
  children: ReactNode;
};

function BannerWrapper({ link, children }: BannerWrapperProps) {
  if (link)
    return (
      <a
        href={link}
        target='_blank'
        className={cn(s.bannerWrapper, 'link')}
        data-qa='subheader_banner_link'
        id='header-subheader-banner-link'
        rel='noreferrer'
      >
        {children}
      </a>
    );

  return <div className={s.bannerWrapper}>{children}</div>;
}

type SubHeaderProps = WithLayoutType<{
  className?: string;
  showSubheader: boolean;
  setShowSubheader: Dispatch<SetStateAction<boolean>>;
}>;

export function SubHeader({ className = '', showSubheader, setShowSubheader, layoutType }: SubHeaderProps) {
  useEffect(() => {
    const flag = localStorage.getItem('isBannerOpen');
    if (flag === null) {
      localStorage.setItem('isBannerOpen', JSON.stringify(true));
    }
  }, []);

  const handleCloseSubheader = () => {
    setShowSubheader(false);
    localStorage.setItem('isBannerOpen', JSON.stringify(false));
  };

  useEffect(() => {
    const flag = JSON.parse(localStorage.getItem('isBannerOpen') || 'true');
    if (flag) {
      setShowSubheader(Boolean(bannerInfo?.title));
    }
  }, [setShowSubheader]);

  return (
    <>
      {showSubheader && bannerInfo && (
        <div className={cn(s.root, className, s[bannerInfo.color])} id='subheader' data-attribute='no_search_index'>
          <Wrapper className={s.wrapper} layoutType={layoutType}>
            <BannerWrapper link={bannerInfo.link}>
              <div
                className={cn(s.bannerText, {
                  [s.link]: bannerInfo.link,
                })}
                dangerouslySetInnerHTML={{ __html: bannerInfo.title }}
                data-qa='subheader_banner'
              />
            </BannerWrapper>
            <CloseSVG className={cn(s.icon, s.iconClose)} onClick={handleCloseSubheader} />
          </Wrapper>
        </div>
      )}
    </>
  );
}
