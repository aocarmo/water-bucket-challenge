import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app.config';
import { WaterBucketModule } from './modules/water-bucket/water-bucket.module';
@Module({
  imports: [
    // config
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
    }),
    WaterBucketModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
