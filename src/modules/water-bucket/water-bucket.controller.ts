import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetWaterBucketInput } from './dto/get-water-bucket-input.dto';
import { WaterBucketService } from './water-bucket.service';

@Controller('water-bucket')
export class WaterBucketController {
  constructor(private readonly waterBuckerServicer: WaterBucketService) {}

  @ApiTags('Water Bucket Challenge')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'An object with steps to return amount of water',
    //type: any,
  })
  @ApiOperation({
    summary: 'Get all the steps to return the amount of water ',
    description:
      'This endpoint will process the inputs and return all steps to get the amount of water',
  })
  @Get()
  async getStatusSummaryReport(
    @Query() input: GetWaterBucketInput,
  ): Promise<any> {
    //return this.waterBuckerServicer.
  }
}
