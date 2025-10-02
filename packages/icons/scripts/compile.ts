import { execAsync } from '../../../scripts/utils/execAsync';

function buildSvgInherit() {
  return Promise.all([
    execAsync('npm run build:extension-icons'),
    execAsync('npm run build:services-icons-old'),
    execAsync('npm run build:interface-icons-old'),
    execAsync('npm run compile:interface-icons-product'),
    execAsync('npm run compile:service-icons'),
  ]);
}

function buildSvgColor() {
  return Promise.all([execAsync('npm run build:logo-icons'), execAsync('npm run build:flag-icons')]);
}

async function compile() {
  try {
    const results = await Promise.allSettled([buildSvgInherit(), buildSvgColor()]);

    const rejectedResults = results.filter(result => result.status === 'rejected');

    if (rejectedResults.length > 0) {
      console.error('Failed to build packages');
      rejectedResults.forEach(result => {
        if (result.status === 'rejected') {
          console.error(result.reason);
        }
      });
      process.exit(1);
    }

    // Выполняем сборку спрайтов только если все предыдущие команды успешны
    await execAsync('npm run build:sprite-icons');
    console.info('All packages built successfully');
  } catch (error) {
    console.error('Error during compilation:', error);
    process.exit(1);
  }
}

compile();
