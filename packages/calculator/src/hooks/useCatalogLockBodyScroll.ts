import { useEffect } from 'react';

type UseLockBodyScrollProps = {
  catalogOpen: boolean;
};

// FIXME: убрать после задачи PDS-3175
export const useCatalogLockBodyScroll = ({ catalogOpen }: UseLockBodyScrollProps) => {
  useEffect(() => {
    if (catalogOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [catalogOpen]);
};
