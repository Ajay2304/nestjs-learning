import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import {ConfigModule} from '@nestjs/config'
import {DatabaseModule} from '@app/database'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
     DatabaseModule,
     
  ],
  controllers: [ApiController],
  providers: [ApiService],
})
export class ApiModule {}
