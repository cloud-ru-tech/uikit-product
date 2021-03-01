import { canUseDOM } from './canUseDOM';

export const copyText = (value: React.ReactText): void => {
  if (!canUseDOM) return;
  const tmp: HTMLTextAreaElement = document.createElement('textarea');
  const focus = document.activeElement as HTMLTextAreaElement;
  tmp.value = `${value}`;

  document.body.appendChild(tmp);
  tmp.select();
  document.execCommand('copy');
  document.body.removeChild(tmp);
  focus.focus();
};
