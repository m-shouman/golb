import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config'
import { UsersModule } from './users/users.module';
import appConfig from '../config/app.config'
import Environments from '../config/environments'
import ConfigKeys from '../config/configKeys'
import databaseConfig from '../config/database.config'
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>(ConfigKeys.databaseHost),
        port: configService.get<number>(ConfigKeys.databasePort),
        username: configService.get<string>(ConfigKeys.databaseUsername),
        password: configService.get<string>(ConfigKeys.databasePassword),
        database: configService.get<string>(ConfigKeys.databaseName),
        entities: [path.join(__dirname, '/**/*.entity{.ts,.js}')],
        synchronize: process.env.NODE_ENV === Environments.Development,
      })
    }),
    UsersModule],
})
export class AppModule { }
