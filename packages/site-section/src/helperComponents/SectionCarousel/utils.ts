import { SectionCarouselProps } from './types';

type Props = Pick<SectionCarouselProps, 'itemMinWidth' | 'maxItemsPerPage'> & {
  wrapperWidth: number;
};

export const calculateAmountOfItemsPerPage = ({ wrapperWidth, itemMinWidth, maxItemsPerPage }: Props): number => {
  const amount = Math.floor(wrapperWidth / itemMinWidth);
  return amount > maxItemsPerPage ? maxItemsPerPage : amount;
};
