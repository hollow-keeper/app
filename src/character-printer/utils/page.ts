import { column } from "./column";
import { IPair } from "./pair";

export function page(columns: (string | IPair)[][][], length: number) {
  return columns.map((col) => column(col, length)).join("\n");
}
