import { Student } from './domain/student.entity';

export interface StudentRepository {
  getByEmail(email: string): Student;
  save(student: Student): void;
}
