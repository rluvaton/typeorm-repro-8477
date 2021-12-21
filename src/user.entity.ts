import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { Place } from './place.entity';

@Entity()
export class User {
  @Column({ unique: true, primary: true })
  id: string;

  @ManyToMany(() => Place)
  @JoinTable()
  rootPlaces: Place[];
}
