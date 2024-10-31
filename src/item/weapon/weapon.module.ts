import { Module } from '@nestjs/common';
/*
import { TypeOrmModule } from '@nestjs/typeorm';

import { Item } from './entities';
*/
import { WeaponController } from './weapon.controller';
/*
import { ItemService } from './item.service';
*/

@Module({
  /*
  imports: [TypeOrmModule.forFeature([Item])],
  */
  controllers: [WeaponController],
  /*
  providers: [ItemService],
  exports: [ItemService],
*/
})
export class WeaponModule {}
