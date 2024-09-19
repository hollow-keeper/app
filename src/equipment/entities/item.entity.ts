import {
  ChildEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  TableInheritance,
} from 'typeorm';

@Entity({ name: 'items' })
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  weight: number;

  @Column({ type: 'float' })
  balance: number;

  @Column({ type: 'jsonb', nullable: true })
  characteristics_bonus?: Record<string, string>;

  @Column({ type: 'jsonb', nullable: true })
  properties_bonus?: Record<string, string>;
}

enum EDamageType {
  slash = 'slash',
  crush = 'crush',
  pierce = 'pierce',
}

@ChildEntity()
export class Weapon extends Item {
  @Column()
  damage: number;

  @Column()
  damage_type: EDamageType;
}