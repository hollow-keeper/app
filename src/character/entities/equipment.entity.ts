import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column({ nullable: true })
  right_weapon_primary?: string;

  @Column({ nullable: true })
  left_weapon_secondary?: string;

  @Column({ nullable: true })
  right_weapon_secondary?: string;

  @Column({ default: 0 })
  souls: number = 0;

  @Column({ default: 0 })
  humanity: number = 0;

  // @Column()
  // spells: ISpell[] = [];
}
