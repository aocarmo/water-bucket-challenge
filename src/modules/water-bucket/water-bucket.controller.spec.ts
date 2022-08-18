import { Test, TestingModule } from '@nestjs/testing';
import { WaterBucketController } from './water-bucket.controller';

describe('WaterBucketController', () => {
  let controller: WaterBucketController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WaterBucketController],
    }).compile();

    controller = module.get<WaterBucketController>(WaterBucketController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
