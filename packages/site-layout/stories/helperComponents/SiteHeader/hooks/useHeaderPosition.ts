import { useEffect, useState } from 'react';

export const useHeaderPosition = (staticHeader?: boolean, isModalMenuOpen?: boolean, isBurgerOpen?: boolean) => {
  const [showHeader, setShowHeader] = useState(true);
  const [showSubheader, setShowSubheader] = useState(false);
  const [headerPosition, setHeaderPosition] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const targetScroll = () => {
      const lastScrollPos = window.scrollY;

      if (headerPosition !== 0) {
        if (
          !staticHeader &&
          !isModalMenuOpen &&
          !isBurgerOpen &&
          lastScrollPos > headerPosition &&
          showHeader &&
          lastScrollPos > 150
        ) {
          setShowHeader(false);
          setHeaderPosition(lastScrollPos);
        } else if (lastScrollPos < headerPosition && !showHeader) {
          setShowHeader(true);
        }
      }

      const subheader = document.getElementById('subheader');
      setShowSubheader(Boolean(subheader));

      setHeaderPosition(lastScrollPos);
    };

    const updateHeaderHeight = () => {
      const headerElement = document.querySelector("[data-attr='layout-header']") as HTMLDivElement;
      if (headerElement) {
        const height = headerElement.offsetHeight;
        setHeaderHeight(Math.floor(height));
      }
    };

    const handleResize = () => {
      updateHeaderHeight();
    };

    updateHeaderHeight();
    targetScroll();

    window.addEventListener('scroll', targetScroll);
    window.addEventListener('scroll', handleResize);

    return () => {
      window.removeEventListener('scroll', targetScroll);
      window.removeEventListener('scroll', handleResize);
    };
  }, [showHeader, headerPosition, staticHeader, isBurgerOpen, isModalMenuOpen]);

  return {
    showHeader,
    setShowSubheader,
    showSubheader,
    headerPosition,
    headerHeight,
  };
};
