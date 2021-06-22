import { PlaceholderIcons } from './types';
import CompanyPlaceholder from '../helperComponents/CompanyPlaceholder';
import UserPlaceholder from '../helperComponents/UserPlaceholder';

const PLACHOLDER_ICONS = {
  [PlaceholderIcons.Company]: <CompanyPlaceholder />,
  [PlaceholderIcons.User]: <UserPlaceholder />,
};

const ABBREVIATION_LENGTH = 2;

export { ABBREVIATION_LENGTH, PLACHOLDER_ICONS };
