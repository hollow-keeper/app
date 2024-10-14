import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Description } from './description.entity';
import { Characteristics } from './characteristics.entity';
import { Equipment } from '../../equipment/entities';

@Entity({ name: 'characters' })
export class Character {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Description, { cascade: true, nullable: false })
  @JoinColumn({
    name: 'description_id',
    referencedColumnName: 'id',
  })
  description: Description;

  @OneToOne(() => Characteristics, { cascade: true, nullable: false })
  @JoinColumn({
    name: 'characteristics_id',
    referencedColumnName: 'id',
  })
  characteristics: Characteristics;

  @OneToOne(() => Equipment, { cascade: true, nullable: false })
  @JoinColumn({
    name: 'equipment_id',
    referencedColumnName: 'id',
  })
  equipment: Equipment;
}
