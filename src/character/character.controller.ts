import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseEnumPipe,
} from '@nestjs/common';
import { CharacterService } from './character.service';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateSoulsDto } from './dto/update-souls.dto';
import { UpdateCharacteristicsDto } from './dto/update-characteristics.dto';
import { UpdateHumanityDto } from './dto/update-humanity.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
import { GameClass, Hand } from './character.consts';
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

  @Patch(':id/souls')
  updateSouls(@Param('id') id: string, @Body() updateSoulsDto: UpdateSoulsDto) {
    return this.characterService.updateSouls(+id, updateSoulsDto.souls);
  }

  @Patch(':id/humanity')
  updateHumanity(
    @Param('id') id: string,
    @Body() updateHumanityDto: UpdateHumanityDto,
  ) {
    return this.characterService.updateHumanity(
      +id,
      updateHumanityDto.humanity,
    );
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

  @Patch(':id/equip')
  equip(@Param('id') id: string, @Body() equipmentDto: UpdateEquipmentDto) {
    return this.characterService.equip(+id, equipmentDto);
  }

  @Patch(':id/equip/:hand')
  @ApiBadRequestResponse({
    description: 'Validation failed (enum string is expected)',
  })
  @ApiParam({
    name: 'hand',
    enum: Hand,
    description: 'The hand to equip (left or right)',
  })
  switchHand(
    @Param('id') id: string,
    @Param('hand', new ParseEnumPipe(Hand))
    hand: Hand,
  ) {
    return this.characterService.switchHand(+id, hand);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.characterService.remove(+id);
  }
}
