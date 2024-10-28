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
} from '@nestjs/common';
import { ApiBadRequestResponse, ApiNotFoundResponse } from '@nestjs/swagger';

import { CreateWeaponDto, UpdateWeaponDto } from './dto';
//import { ItemService } from './item.service';

@Controller('weapon')
export class WeaponController {
  constructor(/*private readonly itemService: ItemService*/) {}

  @Post()
  create(@Body() createWeaponDto: CreateWeaponDto) {
    //return this.itemService.create(createItemDto);
  }

  @Get()
  findAll() {
    //return this.itemService.findAll();
  }

  @Get(':id')
  @ApiBadRequestResponse({
    description: 'Invalid id: id must be a positive integer',
  })
  @ApiNotFoundResponse({ description: 'Weapon with ID not found' })
  findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    //return this.itemService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
    @Body() updateItemDto: UpdateWeaponDto,
  ) {
    //return this.itemService.update(id, updateItemDto);
  }

  @Delete(':id')
  remove(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    //return this.itemService.remove(id);
  }
}
