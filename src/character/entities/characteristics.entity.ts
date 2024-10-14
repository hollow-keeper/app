import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'characteristics' })
export class Characteristics {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  level: number;

  @Column()
  vitality: number;

  @Column()
  attunement: number;

  @Column()
  endurance: number;

  @Column()
  strength: number;

  @Column()
  dexterity: number;

  @Column()
  resistance: number;

  @Column()
  intelligence: number;

  @Column()
  faith: number;

  @Column()
  perception: number;

  @Column()
  charisma: number;
}
