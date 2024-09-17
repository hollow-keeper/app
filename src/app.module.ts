import { Module } from '@nestjs/common';
import { CharacterModule } from './character/character.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    CharacterModule,
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
        ssl: true,
      }),
    }),
  ],
})
export class AppModule {}
