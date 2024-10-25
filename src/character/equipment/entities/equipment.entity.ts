import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Item } from '../../../item';

@Entity({ name: 'equipments' })
export class Equipment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Item, { nullable: true })
  @JoinColumn({
    name: 'helmet_id',
    referencedColumnName: 'id',
  })
  helmet?: Item;

  @ManyToOne(() => Item, { nullable: true })
  @JoinColumn({
    name: 'armor_id',
    referencedColumnName: 'id',
  })
  armor?: Item;

  @ManyToOne(() => Item, { nullable: true })
  @JoinColumn({
    name: 'arms_id',
    referencedColumnName: 'id',
  })
  arms?: Item;

  @ManyToOne(() => Item, { nullable: true })
  @JoinColumn({
    name: 'legs_id',
    referencedColumnName: 'id',
  })
  legs?: Item;

  @ManyToOne(() => Item, { nullable: true })
  @JoinColumn({
    name: 'ring1_id',
    referencedColumnName: 'id',
  })
  ring1?: Item;

  @ManyToOne(() => Item, { nullable: true })
  @JoinColumn({
    name: 'ring2_id',
    referencedColumnName: 'id',
  })
  ring2?: Item;

  @ManyToOne(() => Item, { nullable: true })
  @JoinColumn({
    name: 'left_weapon_primary_id',
    referencedColumnName: 'id',
  })
  left_weapon_primary?: Item;

  @ManyToOne(() => Item, { nullable: true })
  @JoinColumn({
    name: 'right_weapon_primary_id',
    referencedColumnName: 'id',
  })
  right_weapon_primary?: Item;

  @ManyToOne(() => Item, { nullable: true })
  @JoinColumn({
    name: 'left_weapon_secondary_id',
    referencedColumnName: 'id',
  })
  left_weapon_secondary?: Item;

  @ManyToOne(() => Item, { nullable: true })
  @JoinColumn({
    name: 'right_weapon_secondary_id',
    referencedColumnName: 'id',
  })
  right_weapon_secondary?: Item;

  @Column({ default: 0 })
  souls: number = 0;

  @Column({ default: 0 })
  humanity: number = 0;

  // @Column()
  // spells: ISpell[] = [];
}
