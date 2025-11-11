import { CommonButtonProps } from '../helperComponents/ButtonPrivate/types';

export function extractCommonButtonProps({
  disabled,
  href,
  icon,
  label,
  loading,
  onClick,
  onFocus,
  onBlur,
  onKeyDown,
}: Omit<CommonButtonProps, 'iconPosition'>) {
  return { disabled, href, icon, label, loading, onClick, onKeyDown, onFocus, onBlur };
}
