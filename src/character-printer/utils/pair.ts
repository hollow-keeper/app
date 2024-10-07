export interface IPair {
  key: string;
  value: string;
}

export function pair({ key, value }: IPair, length: number) {
  return `${key}:${value.padStart(length - key.length - 1)}`;
}
