import { horizontalSeparator } from './horizontal-serparator';
import { IPair, pair } from './pair';

export function sector(
  values: (string | IPair)[],
  length: number,
  drawLine = true,
) {
  return `${values
    .map((value) => {
      if (typeof value === 'string') {
        return ` ${value}`;
      }

      return ` ${pair(value, length - 2)}`;
    })
    .join('\n')}
${drawLine ? horizontalSeparator(length) : ''}`;
}
