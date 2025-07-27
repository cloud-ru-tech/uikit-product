import { CollapseBlockHeader } from '../helperComponents';
import { AdaptiveAccordionPrimary as AdaptiveAccordionPrimaryComponent } from './AdaptiveAccordionPrimary';
import { AdaptiveAccordionSecondary as AdaptiveAccordionSecondaryComponent } from './AdaptiveAccordionSecondary';
import { AdaptiveCollapseBlockPrimary as AdaptiveCollapseBlockPrimaryComponent } from './AdaptiveCollapseBlockPrimary';
import { AdaptiveCollapseBlockSecondary as AdaptiveCollapseBlockSecondaryComponent } from './AdaptiveCollapseBlockSecondary';
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

export const AdaptiveAccordionPrimary =
  AdaptiveAccordionPrimaryComponent as typeof AdaptiveAccordionPrimaryComponent & {
    CollapseBlock: typeof AdaptiveCollapseBlockPrimaryComponent;
    CollapseBlockHeader: typeof CollapseBlockHeader;
  };

export const AdaptiveAccordionSecondary =
  AdaptiveAccordionSecondaryComponent as typeof AdaptiveAccordionSecondaryComponent & {
    CollapseBlock: typeof AdaptiveCollapseBlockSecondaryComponent;
    CollapseBlockHeader: typeof CollapseBlockHeader;
  };
