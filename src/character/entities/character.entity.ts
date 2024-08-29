import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Description } from './description.entity';
import { Characteristics } from './characteristics.entity';

@Entity({ name: 'characters' })
export class Character {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Description, { cascade: true })
  @JoinColumn({
    name: 'description_id',
    referencedColumnName: 'id',
  })
  description: Description;

  @OneToOne(() => Characteristics, { cascade: true })
  @JoinColumn({
    name: 'characteristics_id',
    referencedColumnName: 'id',
  })
  characteristics: Characteristics;

  @Column()
  equipment: string;
}
