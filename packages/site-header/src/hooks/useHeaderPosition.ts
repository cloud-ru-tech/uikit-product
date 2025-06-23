import { RefObject, useEffect, useState } from 'react';

export const useHeaderPosition = (isModalMenuOpen?: boolean, refHeader?: RefObject<HTMLDivElement>) => {
  const [showHeader, setShowHeader] = useState(true);
  const [headerPosition, setHeaderPosition] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const targetScroll = () => {
      const lastScrollPos = window.scrollY;

      if (headerPosition !== 0) {
        if (!isModalMenuOpen && lastScrollPos > headerPosition && showHeader && lastScrollPos > 150) {
          setShowHeader(false);
          setHeaderPosition(lastScrollPos);
        } else if (lastScrollPos < headerPosition && !showHeader) {
          setShowHeader(true);
        }
      }

      setHeaderPosition(lastScrollPos);
    };

    const updateHeaderHeight = () => {
      if (refHeader && refHeader.current) {
        const height = refHeader.current.offsetHeight;
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
  }, [showHeader, headerPosition, isModalMenuOpen, refHeader]);

  return {
    showHeader,
    headerPosition,
    headerHeight,
  };
};
