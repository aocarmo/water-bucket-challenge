import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Bucket } from '../bucket/bucket';
import { GetAmountWantedWaterInput } from './dto/get-amount-wanted-water-input.dto';
import { GetAmountWantedWaterOutPut } from './dto/get-amount-wanted-water.output.dto';
import { WaterBucketProcess } from './water-bucket-process';

@Injectable()
export class WaterBucketService {
  constructor(
    @Inject(WaterBucketProcess)
    private readonly waterBucketProcess: WaterBucketProcess,
  ) {}
  public getAmountWantedOfWater(
    input: GetAmountWantedWaterInput,
  ): GetAmountWantedWaterOutPut[] {
    const isValidInput = this.waterBucketProcess.validateInput(input);

    if (!isValidInput) {
      throw new HttpException('No Solution', HttpStatus.PRECONDITION_FAILED);
    }

    const response: GetAmountWantedWaterOutPut[] = [];

    const bucketX = new Bucket(input.bucketX, 'bucketX');
    const bucketY = new Bucket(input.bucketY, 'bucketY');

    while (
      !this.waterBucketProcess.checkIsSolved(
        bucketX,
        bucketY,
        input.amountWanted,
      )
    ) {
      const step =
        bucketX.size >= bucketY.size
          ? this.waterBucketProcess.process(
              bucketY,
              bucketX,
              input.amountWanted,
            )
          : this.waterBucketProcess.process(
              bucketX,
              bucketY,
              input.amountWanted,
            );
      response.push(step);
    }

    return response;
  }
}
