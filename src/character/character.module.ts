import { Module } from '@nestjs/common';
import { CharacterService } from './character.service';
import { CharacterController } from './character.controller';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Character } from './entities/character.entity';
import { Repository } from 'typeorm';

@Module({
  controllers: [CharacterController],
  providers: [
    CharacterService,
    { provide: getRepositoryToken(Character), useClass: Repository<Character> },
  ],
  imports: [TypeOrmModule.forFeature([Character]), Repository<Character>],
})
export class CharacterModule {}
