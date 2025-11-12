import { configureDevAlerts } from '@cloud-ru/ft-debug-mode';

const { error, warning } = configureDevAlerts({ scope: 'uikit-product', enabled: true });

export { error, warning };
