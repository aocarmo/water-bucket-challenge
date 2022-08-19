import { Test, TestingModule } from '@nestjs/testing';
import { GetAmountWantedWaterInput } from './dto/get-amount-wanted-water-input.dto';
import { GetAmountWantedWaterOutPut } from './dto/get-amount-wanted-water.output.dto';
import { WaterBucketController } from './water-bucket.controller';
import { WaterBucketService } from './water-bucket.service';

type MockWaterBucketService = Partial<
  Record<keyof WaterBucketService, jest.Mock>
>;
const createWaterBucketService = (): MockWaterBucketService => ({
  getAmountWantedOfWater: jest.fn(),
});

describe('WaterBucketController', () => {
  let controller: WaterBucketController;
  let service: MockWaterBucketService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WaterBucketController],
      providers: [
        {
          provide: WaterBucketService,
          useFactory: createWaterBucketService,
        },
      ],
    }).compile();

    controller = module.get<WaterBucketController>(WaterBucketController);
    service = module.get(WaterBucketService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Get() Customer by id number', () => {
    it('should query the getCustomerByIdNumber', async () => {
      const output = {} as GetAmountWantedWaterOutPut;

      service.getAmountWantedOfWater.mockReturnValue(output);

      const response = await controller.getAmountWater(
        {} as GetAmountWantedWaterInput,
      );

      expect(response).toEqual(output);
    });
  });
});
