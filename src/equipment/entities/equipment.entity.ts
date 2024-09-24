import { Item } from '../../item/entities/item.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'equipment' })
export class Equipment {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Item, { cascade: true, nullable: true })
  @JoinColumn({
    name: 'helmet_id',
    referencedColumnName: 'id',
  })
  helmet?: Item;

  @OneToOne(() => Item, { cascade: true, nullable: true })
  @JoinColumn({
    name: 'armor_id',
    referencedColumnName: 'id',
  })
  armor?: Item;

  @OneToOne(() => Item, { cascade: true, nullable: true })
  @JoinColumn({
    name: 'arms_id',
    referencedColumnName: 'id',
  })
  arms?: Item;

  @OneToOne(() => Item, { cascade: true, nullable: true })
  @JoinColumn({
    name: 'legs_id',
    referencedColumnName: 'id',
  })
  legs?: Item;

  @OneToOne(() => Item, { cascade: true, nullable: true })
  @JoinColumn({
    name: 'ring1_id',
    referencedColumnName: 'id',
  })
  ring1?: Item;

  @OneToOne(() => Item, { cascade: true, nullable: true })
  @JoinColumn({
    name: 'ring2_id',
    referencedColumnName: 'id',
  })
  ring2?: Item;

  @OneToOne(() => Item, { cascade: true, nullable: true })
  @JoinColumn({
    name: 'left_weapon_primary_id',
    referencedColumnName: 'id',
  })
  left_weapon_primary?: Item;

  @OneToOne(() => Item, { cascade: true, nullable: true })
  @JoinColumn({
    name: 'right_weapon_primary_id',
    referencedColumnName: 'id',
  })
  right_weapon_primary?: Item;

  @OneToOne(() => Item, { cascade: true, nullable: true })
  @JoinColumn({
    name: 'left_weapon_secondary_id',
    referencedColumnName: 'id',
  })
  left_weapon_secondary?: Item;

  @OneToOne(() => Item, { cascade: true, nullable: true })
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
