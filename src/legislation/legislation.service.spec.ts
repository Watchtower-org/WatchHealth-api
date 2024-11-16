import { Test, TestingModule } from '@nestjs/testing';
import { LegislationService } from './legislation.service';

describe('LegislationService', () => {
  let service: LegislationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LegislationService],
    }).compile();

    service = module.get<LegislationService>(LegislationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
