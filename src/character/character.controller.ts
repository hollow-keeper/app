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
import { UpdateCharacteristicsDto } from './dto/update-characteristics.dto';
import { GameClass } from './character.consts';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiParam,
} from '@nestjs/swagger';

@Controller('characters')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @Post(':class')
  @ApiParam({
    name: 'class',
    enum: GameClass,
    description: 'Class to create character',
  })
  create(
    @Param('class') gameClass: GameClass,
    @Body() createCharacterDto: CreateCharacterDto,
  ) {
    return this.characterService.create(gameClass, createCharacterDto);
  }

  @Get()
  findAll() {
    return this.characterService.findAll();
  }

  @Get(':id')
  @ApiNotFoundResponse({ description: 'Charachter with ID wasnt found' })
  findOne(@Param('id') id: string) {
    return this.characterService.findOne(+id);
  }

  @Get(':id/available-levels')
  getAvailableLevels(@Param('id') id: string) {
    return this.characterService.getAvailableLevels(+id);
  }

  @Patch(':id/up')
  @ApiNotFoundResponse({ description: `Character with ID not found` })
  @ApiBadRequestResponse({ description: 'Not enough souls' })
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
