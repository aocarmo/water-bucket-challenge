import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, Min } from 'class-validator';
import { toNumber } from 'src/common/helper/cast.helper';

export class GetWaterBucketInput {
  @ApiProperty({
    description: 'The value of the bucket X',
    type: 'number',
    example: 100,
  })
  @Transform(({ value }) => toNumber(value, { default: 0, min: 0 }))
  @IsInt()
  @Min(0)
  readonly bucketX: number;

  @ApiProperty({
    description: 'The value of the bucket Y',
    type: 'number',
    example: 100,
  })
  @Transform(({ value }) => toNumber(value, { default: 0, min: 0 }))
  @IsInt()
  @Min(0)
  readonly bucketY: number;

  @ApiProperty({
    description: 'The value of the amount wanted Z',
    type: 'number',
    example: 100,
  })
  @Transform(({ value }) => toNumber(value, { default: 0, min: 0 }))
  @IsInt()
  @Min(0)
  readonly amountWanted: number;
}
