import { ApiProperty } from '@nestjs/swagger';

export class GetAmountWantedWaterOutPut {
  @ApiProperty({
    description: 'The value of the bucket X',
    type: 'number',
    example: 10,
  })
  bucketX: number;

  @ApiProperty({
    description: 'The value of the bucket Y',
    type: 'number',
    example: 2,
  })
  bucketY: number;

  @ApiProperty({
    description: 'The value of the amount wanted',
    type: 'string',
    example: 'Fill bucket x',
  })
  explanation: string;
}
