import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, Min } from 'class-validator';
import { toNumber } from '../../../common/helper/cast.helper';

export class GetAmountWantedWaterInput {
  @ApiProperty({
    description: 'The value of the bucket X',
    type: 'number',
    example: 10,
  })
  @Transform(({ value }) => toNumber(value))
  @IsInt()
  @Min(0)
  bucketX: number;

  @ApiProperty({
    description: 'The value of the bucket Y',
    type: 'number',
    example: 2,
  })
  @Transform(({ value }) => toNumber(value))
  @IsInt()
  @Min(0)
  bucketY: number;

  @ApiProperty({
    description: 'The value of the amount wanted',
    type: 'number',
    example: 8,
  })
  @Transform(({ value }) => toNumber(value))
  @IsInt()
  @Min(1)
  readonly amountWanted: number;
}
