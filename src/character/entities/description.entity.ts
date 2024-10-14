import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { GameClass } from '../character.consts';

@Entity({ name: 'descriptions' })
export class Description {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  origin: string;

  @Column()
  name: string;

  @Column({ enum: GameClass })
  game_class: GameClass;
}
