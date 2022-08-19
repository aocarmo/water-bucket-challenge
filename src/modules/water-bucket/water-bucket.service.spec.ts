import { HttpException, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { GetAmountWantedWaterInput } from './dto/get-amount-wanted-water-input.dto';
import { GetAmountWantedWaterOutPut } from './dto/get-amount-wanted-water.output.dto';
import { WaterBucketProcess } from './water-bucket-process';
import { WaterBucketService } from './water-bucket.service';

describe('WaterBucketService', () => {
  let service: WaterBucketService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WaterBucketService, WaterBucketProcess],
    }).compile();

    service = module.get<WaterBucketService>(WaterBucketService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be able to get amount wanted of water', () => {
    const input: GetAmountWantedWaterInput = {
      amountWanted: 4,
      bucketX: 2,
      bucketY: 10,
    };

    const output: GetAmountWantedWaterOutPut[] = [
      {
        explanation: 'Fill bucketX',
        bucketX: 2,
        bucketY: 0,
      },
      {
        explanation: 'Tranfer from bucketX to bucketY',
        bucketX: 0,
        bucketY: 2,
      },
      {
        explanation: 'Fill bucketX',
        bucketX: 2,
        bucketY: 2,
      },
      {
        explanation: 'Tranfer from bucketX to bucketY',
        bucketX: 0,
        bucketY: 4,
      },
    ];

    const result = service.getAmountWantedOfWater(input);
    expect(result).toEqual(output);
  });

  it('should be able to return "No Solution" with invalid inputs', async () => {
    const input: GetAmountWantedWaterInput = {
      amountWanted: 10,
      bucketX: 2,
      bucketY: 3,
    };

    expect(() => service.getAmountWantedOfWater(input)).toThrow(
      new HttpException('No Solution', HttpStatus.PRECONDITION_FAILED),
    );
  });
});
