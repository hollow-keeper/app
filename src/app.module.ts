import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CharacterModule } from './character';
import { EquipmentModule } from './character/equipment';
import { ItemModule } from './item';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (conf: ConfigService) => ({
        type: 'postgres',
        host: conf.get('DB_HOST'),
        port: +conf.get('DB_PORT'),
        username: conf.get('DB_USERNAME'),
        password: conf.get('DB_PASSWORD'),
        database: conf.get('DB_NAME'),
        entities: ['dist/**/*.entity.js'],
        migrations: ['dist/migration/*.js'],
        ...(conf.get('NODE_ENV') !== 'development'
          ? {
              ssl: true,
              extra: {
                ssl: {
                  rejectUnauthorized: false,
                },
              },
            }
          : {}),
      }),
    }),
    CharacterModule,
    EquipmentModule,
    ItemModule,
  ],
})
export class AppModule {}
