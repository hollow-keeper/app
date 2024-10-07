import { horizontalSeparator } from "./horizontal-serparator";

export function valueInContainer(value: string, length: number) {
  return `${horizontalSeparator(length)}
|${value.padStart((length - 2) / 2 + value.length / 2).padEnd(length - 2)}|
${horizontalSeparator(length)}`;
}
