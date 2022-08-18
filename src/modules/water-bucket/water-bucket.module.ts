import { Module } from '@nestjs/common';
import { WaterBucketService } from './water-bucket.service';
import { WaterBucketController } from './water-bucket.controller';

@Module({
  providers: [WaterBucketService],
  controllers: [WaterBucketController],
})
export class WaterBucketModule {}
