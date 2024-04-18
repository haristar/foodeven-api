import { Test, TestingModule } from '@nestjs/testing';
import { FooditemController } from './fooditem.controller';

describe('FooditemController', () => {
  let controller: FooditemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FooditemController],
    }).compile();

    controller = module.get<FooditemController>(FooditemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
