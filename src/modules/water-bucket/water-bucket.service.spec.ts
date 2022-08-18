import { Test, TestingModule } from '@nestjs/testing';
import { WaterBucketService } from './water-bucket.service';

describe('WaterBucketService', () => {
  let service: WaterBucketService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WaterBucketService],
    }).compile();

    service = module.get<WaterBucketService>(WaterBucketService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
