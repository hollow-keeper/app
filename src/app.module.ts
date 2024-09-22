import { Module } from '@nestjs/common';
import { CharacterModule } from './character/character.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EquipmentModule } from './equipment/equipment.module';
import { ItemModule } from './item/item.module';

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
