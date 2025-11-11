import { CommonButtonProps } from './types';

export function extractCommonButtonProps({
  disabled,
  href,
  icon,
  iconPosition,
  label,
  loading,
  onClick,
  onFocus,
  onBlur,
  onKeyDown,
}: CommonButtonProps) {
  return { disabled, href, icon, iconPosition, label, loading, onClick, onKeyDown, onFocus, onBlur };
}
