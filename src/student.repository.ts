import { Student } from './domain/student.entity';

export interface StudentRepository {
  getByEmail(email: string): Student | undefined;
  save(student: Student): void;
}
