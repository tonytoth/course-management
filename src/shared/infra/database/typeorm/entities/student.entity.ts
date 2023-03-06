import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('student')
export default class StudentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;
}
