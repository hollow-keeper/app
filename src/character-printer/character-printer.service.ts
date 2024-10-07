import { Injectable } from '@nestjs/common';

@Injectable()
export class CharacterPrinterService {
  print(id: number, length: number) {
    return `${id}: ${length}`;
  }
}
