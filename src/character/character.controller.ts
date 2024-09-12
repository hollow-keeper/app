import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CharacterService } from './character.service';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { UpdateSoulsDto } from './dto/update-souls.dto';
import { UpdateCharacteristicsDto } from './dto/update-characteristics.dto';

@Controller('characters')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @Post()
  create(@Body() createCharacterDto: CreateCharacterDto) {
    return this.characterService.create(createCharacterDto);
  }

  @Get()
  findAll() {
    return this.characterService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.characterService.findOne(+id);
  }

  @Get(':id/available-levels')
  getAvailableLevels(@Param('id') id: string) {
    return this.characterService.getAvailableLevels(+id);
  }

  @Patch(':id/souls')
  updateSouls(@Param('id') id: string, @Body() updateSoulsDto: UpdateSoulsDto) {
    return this.characterService.updateSouls(+id, updateSoulsDto.souls);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCharacterDto: UpdateCharacterDto,
  ) {
    return this.characterService.update(+id, updateCharacterDto);
  }

  @Patch(':id/up')
  levelup(
    @Param('id') id: string,
    @Body() characteristicsDto: UpdateCharacteristicsDto,
  ) {
    return this.characterService.levelup(+id, characteristicsDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.characterService.remove(+id);
  }
}
