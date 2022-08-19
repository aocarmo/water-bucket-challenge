import { Test, TestingModule } from '@nestjs/testing';
import { WaterBucketProcess } from './water-bucket-process';

describe('WaterBucketProcess', () => {
  let provider: WaterBucketProcess;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WaterBucketProcess],
    }).compile();

    provider = module.get<WaterBucketProcess>(WaterBucketProcess);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
