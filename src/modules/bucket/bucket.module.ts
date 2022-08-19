import { Module } from '@nestjs/common';
import { Bucket } from './bucket';

@Module({
  providers: [Bucket],
})
export class BucketModule {}
