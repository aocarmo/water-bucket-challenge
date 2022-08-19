import { Injectable } from '@nestjs/common';
import { Bucket } from '../bucket/bucket';
import { GetAmountWantedWaterInput } from './dto/get-amount-wanted-water-input.dto';
import { GetAmountWantedWaterOutPut } from './dto/get-amount-wanted-water.output.dto';

@Injectable()
export class WaterBucketProcess {
  public process(
    smallerBucket: Bucket,
    biggerBucket: Bucket,
    amountWanted: number,
  ): GetAmountWantedWaterOutPut {
    const output = new GetAmountWantedWaterOutPut();
    const isSolved = this.checkIsSolved(
      smallerBucket,
      biggerBucket,
      amountWanted,
    );

    if (!isSolved) {
      if (smallerBucket.amount === 0) {
        output.explanation = smallerBucket.fill();
        output.bucketX =
          smallerBucket.name === 'bucketX'
            ? smallerBucket.amount
            : biggerBucket.amount;

        output.bucketY =
          smallerBucket.name === 'bucketY'
            ? smallerBucket.amount
            : biggerBucket.amount;
        return output;
      }

      if (smallerBucket.amount !== 0) {
        output.explanation = smallerBucket.transfer(
          smallerBucket,
          biggerBucket,
        );
        output.bucketX =
          smallerBucket.name === 'bucketX'
            ? smallerBucket.amount
            : biggerBucket.amount;

        output.bucketY =
          smallerBucket.name === 'bucketY'
            ? smallerBucket.amount
            : biggerBucket.amount;
        return output;
      }
    }

    return output;
  }

  public checkIsSolved(
    bucketX: Bucket,
    bucketY: Bucket,
    amountWanted: number,
  ): boolean {
    if (bucketX.amount === amountWanted || bucketY.amount === amountWanted)
      return true;

    return false;
  }

  public validateInput(input: GetAmountWantedWaterInput): boolean {
    if (
      input.amountWanted > input.bucketX &&
      input.amountWanted > input.bucketY
    ) {
      return false;
    }

    if (
      input.amountWanted %
        this.getCommomDivisor(input.bucketX, input.bucketY) !==
      0
    ) {
      return false;
    }

    return true;
  }

  private getCommomDivisor(a: number, b: number): number {
    if (b === 0) return a;
    return this.getCommomDivisor(b, a % b);
  }
}
