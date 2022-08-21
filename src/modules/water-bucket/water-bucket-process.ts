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
      if (smallerBucket.size === amountWanted) {
        const action = smallerBucket.fill();
        return this.getStepDescription({
          action,
          smallerBucket,
          biggerBucket,
        });
      }

      if (biggerBucket.size === amountWanted) {
        const action = biggerBucket.fill();
        return this.getStepDescription({
          action,
          smallerBucket,
          biggerBucket,
        });
      }

      if (smallerBucket.amount === 0) {
        const action = smallerBucket.fill();
        return this.getStepDescription({
          action,
          smallerBucket,
          biggerBucket,
        });
      }

      if (smallerBucket.amount !== 0) {
        const action = smallerBucket.transfer(smallerBucket, biggerBucket);

        return this.getStepDescription({
          action,
          smallerBucket,
          biggerBucket,
        });
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
      this.getCommomDivisor(input.bucketX, input.amountWanted) < 2 &&
      this.getCommomDivisor(input.bucketY, input.amountWanted) < 2
    ) {
      return false;
    }

    return true;
  }

  private getStepDescription({
    action,
    smallerBucket,
    biggerBucket,
  }: {
    action: string;
    smallerBucket: Bucket;
    biggerBucket: Bucket;
  }): GetAmountWantedWaterOutPut {
    const output = new GetAmountWantedWaterOutPut();

    output.explanation = action;
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

  private getCommomDivisor(a: number, b: number): number {
    if (b === 0) return a;
    return this.getCommomDivisor(b, a % b);
  }
}
