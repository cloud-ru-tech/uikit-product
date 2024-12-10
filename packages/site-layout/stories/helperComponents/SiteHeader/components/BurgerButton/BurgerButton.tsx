import { ButtonOutline } from '@snack-uikit/button';

import styles from './styles.module.scss';

function CloseIcon() {
  return (
    <svg
      className={styles.icon}
      xmlns='http://www.w3.org/2000/svg'
      width='20'
      height='20'
      viewBox='0 0 20 20'
      fill='none'
    >
      <path
        d='M6.06249 15.1597L4.84058 13.9377L8.77808 10.0002L4.84058 6.06274L6.06249 4.84082L9.99999 8.77832L13.9375 4.84082L15.1594 6.06274L11.2219 10.0002L15.1594 13.9377L13.9375 15.1597L9.99999 11.2222L6.06249 15.1597Z'
        fill='currentColor'
      />
    </svg>
  );
}

function DefaultIcon() {
  return (
    <svg
      className={styles.icon}
      xmlns='http://www.w3.org/2000/svg'
      width='20'
      height='20'
      viewBox='0 0 20 20'
      fill='none'
    >
      <path
        d='M2.83057 14.7441V13.0149H17.1694V14.7441H2.83057ZM2.83057 10.8646V9.13542H17.1694V10.8646H2.83057ZM2.83057 6.98506V5.25587H17.1694V6.98506H2.83057Z'
        fill='currentColor'
      />
    </svg>
  );
}

export function BurgerButton({ onClick, isBurgerOpen }: { onClick(): void; isBurgerOpen: boolean }) {
  return (
    <ButtonOutline
      appearance='neutral'
      size='m'
      icon={isBurgerOpen ? <CloseIcon /> : <DefaultIcon />}
      onClick={onClick}
      data-click='allclicks'
    />
  );
}
