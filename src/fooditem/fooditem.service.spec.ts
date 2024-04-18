import { Test, TestingModule } from '@nestjs/testing';
import { FooditemService } from './fooditem.service';

describe('FooditemService', () => {
  let service: FooditemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FooditemService],
    }).compile();

    service = module.get<FooditemService>(FooditemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
