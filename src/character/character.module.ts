import { Module } from '@nestjs/common';
import { CharacterService } from './character.service';
import { CharacterController } from './character.controller';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Character } from './entities/character.entity';
import { Repository } from 'typeorm';

@Module({
  controllers: [CharacterController],
  providers: [CharacterService],
  imports: [TypeOrmModule.forFeature([Character])],
})
export class CharacterModule {}
