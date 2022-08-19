import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetAmountWantedWaterInput } from './dto/get-amount-wanted-water-input.dto';
import { GetAmountWantedWaterOutPut } from './dto/get-amount-wanted-water.output.dto';
import { WaterBucketService } from './water-bucket.service';

@Controller('water-bucket')
export class WaterBucketController {
  constructor(private readonly waterBuckerServicer: WaterBucketService) {}

  @ApiTags('Water Bucket Challenge')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'An object with steps to return amount wanted of water',
    type: [GetAmountWantedWaterOutPut],
  })
  @ApiOperation({
    summary: 'Get all the steps to return the amount wanted of water ',
    description:
      'This endpoint will process the inputs and return all steps to get the amount wanted of water',
  })
  @Get()
  async getAmountWater(
    @Query() input: GetAmountWantedWaterInput,
  ): Promise<GetAmountWantedWaterOutPut[]> {
    return this.waterBuckerServicer.getAmountWantedOfWater(input);
  }
}
