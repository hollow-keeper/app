import { Test, TestingModule } from '@nestjs/testing';
import { PropertiesCalculatorService } from './properties-calculator.service';

describe('PropertiesCalculatorService', () => {
  let service: PropertiesCalculatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PropertiesCalculatorService],
    }).compile();

    service = module.get<PropertiesCalculatorService>(PropertiesCalculatorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
