import {
  Controller,
  Body,
  Patch,
  Param,
  ParseEnumPipe,
  ParseIntPipe,
  HttpStatus,
} from '@nestjs/common';
import { ApiBadRequestResponse, ApiParam } from '@nestjs/swagger';

import { UpdateEquipmentDto, UpdateHumanityDto, UpdateSoulsDto } from './dto';
import { Hand } from './equipment.consts';
import { EquipmentService } from './equipment.service';

@Controller('characters')
export class EquipmentController {
  constructor(private readonly equipmentService: EquipmentService) {}

  @Patch(':id/souls')
  updateSouls(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
    @Body() updateSoulsDto: UpdateSoulsDto,
  ) {
    return this.equipmentService.updateSouls(id, updateSoulsDto.souls);
  }

  @Patch(':id/humanity')
  updateHumanity(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
    @Body() updateHumanityDto: UpdateHumanityDto,
  ) {
    return this.equipmentService.updateHumanity(id, updateHumanityDto.humanity);
  }

  @Patch(':id/equip')
  equip(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
    @Body() equipmentDto: UpdateEquipmentDto,
  ) {
    return this.equipmentService.equip(id, equipmentDto);
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
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
    @Param('hand', new ParseEnumPipe(Hand))
    hand: Hand,
  ) {
    return this.equipmentService.switchHand(id, hand);
  }
}
