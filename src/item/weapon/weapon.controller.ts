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
import { WeaponService } from './weapon.service';

@Controller('weapon')
export class WeaponController {
  constructor(private readonly weaponService: WeaponService) {}

  @Post()
  create(@Body() createWeaponDto: CreateWeaponDto) {
    return this.weaponService.create(createWeaponDto);
  }

  @Get()
  findAll() {
    return this.weaponService.findAll();
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
    return this.weaponService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
    @Body() updateWeaponDto: UpdateWeaponDto,
  ) {
    return this.weaponService.update(id, updateWeaponDto);
  }

  @Delete(':id')
  remove(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.weaponService.remove(id);
  }
}
