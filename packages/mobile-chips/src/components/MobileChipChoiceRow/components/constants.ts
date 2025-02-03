import { MobileChipChoice } from '../../MobileChipChoice';
import { CHIP_CHOICE_TYPE } from '../../MobileChipChoice/constants';

export const MAP_CHIP_TYPE_TO_COMPONENT = {
  [CHIP_CHOICE_TYPE.Single]: MobileChipChoice.Single,
  [CHIP_CHOICE_TYPE.Multiple]: MobileChipChoice.Multiple,
  [CHIP_CHOICE_TYPE.Date]: MobileChipChoice.Date,
  [CHIP_CHOICE_TYPE.DateTime]: MobileChipChoice.Date,
  [CHIP_CHOICE_TYPE.DateRange]: MobileChipChoice.DateRange,
  [CHIP_CHOICE_TYPE.Time]: MobileChipChoice.Time,
  [CHIP_CHOICE_TYPE.Custom]: MobileChipChoice.Custom,
};
