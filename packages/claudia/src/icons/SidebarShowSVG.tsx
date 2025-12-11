type SidebarShowSVGProps = {
  className?: string;
};

export function SidebarShowSVG({ className }: SidebarShowSVGProps) {
  return (
    <svg
      className={className}
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M12 16.9999L17 11.9999L12 6.99988M7 17.4999L7 6.49988' stroke='#787B8A' strokeWidth='1.5' />
    </svg>
  );
}
