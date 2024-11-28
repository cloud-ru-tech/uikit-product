import { Bounce, ToastContainerProps } from 'react-toastify';

export const defaultProps: ToastContainerProps = {
  position: 'top-right',
  transition: Bounce,
  autoClose: 5000,
  closeButton: true,
  pauseOnHover: true,
  pauseOnFocusLoss: true,
  draggable: 'touch',
  draggablePercent: 80,
  draggableDirection: 'x',
  role: 'alert',
  theme: 'light',
};
