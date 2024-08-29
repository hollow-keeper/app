import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'characters' })
export class Character {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column()
  characteristics: string;

  @Column()
  equipment: string;

  @Column()
  qwepment: string;
}
