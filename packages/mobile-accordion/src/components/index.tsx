import { CollapseBlockHeader } from '../helperComponents';
import { MobileAccordionPrimary as MobileAccordionPrimaryComponent } from './MobileAccordionPrimary';
import { MobileAccordionSecondary as MobileAccordionSecondaryComponent } from './MobileAccordionSecondary';
import { MobileCollapseBlockPrimary } from './MobileCollapseBlockPrimary';
import { MobileCollapseBlockSecondary } from './MobileCollapseBlockSecondary';

export const MobileAccordionPrimary = MobileAccordionPrimaryComponent as typeof MobileAccordionPrimaryComponent & {
  CollapseBlock: typeof MobileCollapseBlockPrimary;
  CollapseBlockHeader: typeof CollapseBlockHeader;
};

MobileAccordionPrimary.CollapseBlock = MobileCollapseBlockPrimary;
MobileAccordionPrimary.CollapseBlockHeader = CollapseBlockHeader;

export const MobileAccordionSecondary =
  MobileAccordionSecondaryComponent as typeof MobileAccordionSecondaryComponent & {
    CollapseBlock: typeof MobileCollapseBlockSecondary;
    CollapseBlockHeader: typeof CollapseBlockHeader;
  };

MobileAccordionSecondary.CollapseBlock = MobileCollapseBlockSecondary;
MobileAccordionSecondary.CollapseBlockHeader = CollapseBlockHeader;
