import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Item } from './entities';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';
import { WeaponModule } from './weapon/weapon.module';

@Module({
  imports: [TypeOrmModule.forFeature([Item]), WeaponModule],
  controllers: [ItemController],
  providers: [ItemService],
  exports: [ItemService],
})
export class ItemModule {}
