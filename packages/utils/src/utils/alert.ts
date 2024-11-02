import { configureDevAlerts } from '@sbercloud/ft-debug-mode';

const { error, warning } = configureDevAlerts({ scope: 'uikit-product', enabled: true });

export { error, warning };
