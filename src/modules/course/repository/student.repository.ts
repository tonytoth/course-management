import { Student } from '../domain/student.entity';

export interface StudentRepository {
  getByEmail(email: string): Promise<Student | undefined>;
  save(student: Student): Promise<void>;
}
