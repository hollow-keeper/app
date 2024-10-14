import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpStatus,
  Header,
  Query,
} from '@nestjs/common';
import { CharacterService } from './character.service';
import { CreateCharacterDto, UpdateCharacteristicsDto } from './dto';
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
  @ApiNotFoundResponse({ description: 'Charachter with ID not found' })
  findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.characterService.findOne(id);
  }

  @Get(':id/sheet')
  @Header('Content-Type', 'text/plain')
  @ApiNotFoundResponse({ description: 'Charachter with ID not found' })
  printCharacterSheet(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
    @Query('length', ParseIntPipe)
    length: number = 100,
  ) {
    return this.characterService.printCharacterSheet(id, length);
  }

  @Get(':id/available-levels')
  getAvailableLevels(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.characterService.getAvailableLevels(id);
  }

  @Patch(':id/up')
  @ApiNotFoundResponse({ description: `Character with ID not found` })
  @ApiBadRequestResponse({ description: 'Not enough souls' })
  levelup(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
    @Body() characteristicsDto: UpdateCharacteristicsDto,
  ) {
    return this.characterService.levelup(id, characteristicsDto);
  }

  @Delete(':id')
  remove(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.characterService.remove(id);
  }
}
