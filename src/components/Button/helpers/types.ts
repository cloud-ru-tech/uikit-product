import { ButtonSize, ButtonVariant } from 'components/Button/helpers/constants';

export type TButtonVariant = typeof ButtonVariant[keyof typeof ButtonVariant];
export type TButtonSize = typeof ButtonSize[keyof typeof ButtonSize];
