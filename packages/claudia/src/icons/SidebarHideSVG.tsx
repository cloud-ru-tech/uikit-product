type SidebarHideSVGProps = {
  className?: string;
};

export function SidebarHideSVG({ className }: SidebarHideSVGProps) {
  return (
    <svg
      className={className}
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M17 16.439L12 11.439L17 6.43896M7 17L7 5.89502' stroke='#787B8A' strokeWidth='1.5' />
    </svg>
  );
}
