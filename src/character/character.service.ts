import { Injectable } from '@nestjs/common';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Character } from './entities/character.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CharacterService {
  constructor(
    @InjectRepository(Character)
    private repository: Repository<Character>,
  ) {}

  create(createCharacterDto: CreateCharacterDto) {
    const char = this.repository.create(createCharacterDto);
    return this.repository.save(char);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: number) {
    return this.repository.find({
      where: { id },
      relations: { description: true, characteristics: true, equipment: true },
    });
  }

  update(id: number, updateCharacterDto: UpdateCharacterDto) {
    return `This action updates a #${id} character`;
  }

  remove(id: number) {
    return `This action removes a #${id} character`;
  }
}
