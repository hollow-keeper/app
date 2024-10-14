import { majorHorizontalSeparator } from './major-horizontal-serparator';
import { IPair } from './pair';
import { sector } from './sector';

export function column(sectors: (string | IPair)[][], length: number) {
  return `${sectors
    .map((sec, i) => sector(sec, length, i != sectors.length - 1))
    .join('\n')}
${majorHorizontalSeparator(length)}`;
}
