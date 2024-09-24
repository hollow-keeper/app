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

  @Column({ nullable: true })
  helmet?: string;

  @Column({ nullable: true })
  armor?: string;

  @Column({ nullable: true })
  arms?: string;

  @Column({ nullable: true })
  legs?: string;

  @Column({ nullable: true })
  ring1?: string;

  @Column({ nullable: true })
  ring2?: string;

  @Column({ nullable: true })
  left_weapon_primary?: string;

  @OneToOne(() => Item, { cascade: true, nullable: true })
  @JoinColumn({
    name: 'right_weapon_primary_id',
    referencedColumnName: 'id',
  })
  right_weapon_primary?: Item;

  @Column({ nullable: true })
  left_weapon_secondary?: string;

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
