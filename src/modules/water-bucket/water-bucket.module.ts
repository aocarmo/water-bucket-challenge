import { Module } from '@nestjs/common';
import { WaterBucketService } from './water-bucket.service';
import { WaterBucketController } from './water-bucket.controller';

import { WaterBucketProcess } from './water-bucket-process';

@Module({
  providers: [WaterBucketService, WaterBucketProcess],
  controllers: [WaterBucketController],
})
export class WaterBucketModule {}
