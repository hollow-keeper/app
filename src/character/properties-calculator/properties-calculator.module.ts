import { Module } from '@nestjs/common';

import { PropertiesCalculatorService } from './properties-calculator.service';

@Module({
  providers: [PropertiesCalculatorService],
  exports: [PropertiesCalculatorService],
})
export class PropertiesCalculatorModule {}
