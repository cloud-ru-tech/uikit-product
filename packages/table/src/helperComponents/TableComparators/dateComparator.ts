import compareAsc from 'date-fns/compareAsc';

export const dateComparator = (dateA: Date, dateB: Date): number => compareAsc(new Date(dateA), new Date(dateB));
