import { Injectable } from '@nestjs/common';
import { Bucket } from '../bucket/bucket';
import { GetAmountWantedWaterInput } from './dto/get-amount-wanted-water-input.dto';
import { GetAmountWantedWaterOutPut } from './dto/get-amount-wanted-water.output.dto';

@Injectable()
export class WaterBucketProcess {
  public process(
    fromBucket: Bucket,
    toBucket: Bucket,
    amountWanted: number,
  ): GetAmountWantedWaterOutPut[] {
    fromBucket.empty();
    toBucket.empty();

    let action = fromBucket.fill();

    const path: GetAmountWantedWaterOutPut[] = [];

    while (
      fromBucket.amount !== amountWanted &&
      toBucket.amount !== amountWanted
    ) {
      path.push(this.getStepDescription(fromBucket, toBucket, action));

      const temp = Math.min(fromBucket.amount, toBucket.size - toBucket.amount);

      action = fromBucket.transfer(fromBucket, toBucket, temp);

      path.push(this.getStepDescription(fromBucket, toBucket, action));

      if (
        fromBucket.amount == amountWanted ||
        toBucket.amount == amountWanted
      ) {
        break;
      }

      if (fromBucket.amount == 0) {
        action = fromBucket.fill();
      }

      if (toBucket.amount == toBucket.size) {
        action = toBucket.empty();
      }
    }

    return path;
  }

  private getStepDescription(
    fromBucket: Bucket,
    toBucket: Bucket,
    action: string,
  ): GetAmountWantedWaterOutPut {
    const output = new GetAmountWantedWaterOutPut();

    output.explanation = action;
    output.bucketX =
      fromBucket.name === 'bucketX' ? fromBucket.amount : toBucket.amount;

    output.bucketY =
      fromBucket.name === 'bucketY' ? fromBucket.amount : toBucket.amount;
    return output;
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
