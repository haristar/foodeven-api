import { Test, TestingModule } from '@nestjs/testing';
import { ConstantconfigService } from './constantconfig.service';

describe('ConstantconfigService', () => {
  let service: ConstantconfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConstantconfigService],
    }).compile();

    service = module.get<ConstantconfigService>(ConstantconfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
