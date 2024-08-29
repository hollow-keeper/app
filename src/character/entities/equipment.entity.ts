import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'equipment' })
export class Equipment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  helmet?: string;

  @Column()
  armor?: string;

  @Column()
  arms?: string;

  @Column()
  legs?: string;

  @Column()
  ring1?: string;

  @Column()
  ring2?: string;

  @Column()
  left_weapon_primary?: string;

  @Column()
  right_weapon_primary?: string;

  @Column()
  left_weapon_secondary?: string;

  @Column()
  right_weapon_secondary?: string;

  @Column()
  souls: number = 0;

  @Column()
  humanity: number = 0;

  // @Column()
  // spells: ISpell[] = [];
}
