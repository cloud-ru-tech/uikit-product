import { StubData } from './types';

function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const numberFormatter = new Intl.NumberFormat('ru-RU', { minimumFractionDigits: 2 });

const STATUSES = ['pending', 'success', 'error', 'warning', 'info'] as const;
const STATUS_APPEARANCES: Record<string, 'blue' | 'green' | 'red' | 'yellow' | 'neutral'> = {
  pending: 'blue',
  success: 'green',
  error: 'red',
  warning: 'yellow',
  info: 'neutral',
};

export function generateRows(count: number, includeStatus = false): StubData[] {
  const res: StubData[] = [];

  for (let i = 0; i < count; ++i) {
    const date = new Date(Math.floor(Math.random() * 1e13)).setFullYear(
      randomIntFromInterval(1980, 2030),
      randomIntFromInterval(1, 12),
      randomIntFromInterval(1, 30),
    );

    res.push({
      ...(includeStatus && {
        status: STATUSES[randomIntFromInterval(0, STATUSES.length - 1)],
      }),
      col1: i * 5,
      col2: i * 5 + 1,
      col3: i * 5 + 2,
      col4: i * 5 + 3,
      col5: i * 5 + 4,
      col6: randomIntFromInterval(100_000, 999_999.99),
      date,
    });
  }

  return res;
}

export { STATUS_APPEARANCES };
