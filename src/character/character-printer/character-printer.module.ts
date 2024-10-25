import { Module } from '@nestjs/common';

import { CharacterPrinterService } from './character-printer.service';

@Module({
  providers: [CharacterPrinterService],
  exports: [CharacterPrinterService],
})
export class CharacterPrinterModule {}
