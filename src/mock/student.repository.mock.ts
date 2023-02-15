import { Student } from '../domain/student.entity';
import { StudentRepository } from '../student.repository';

export class StudentRepositoryMock implements StudentRepository {
  getByEmail(email: string): Student {
    return Student.create({
      firstName: 'Hello',
      lastName: 'World',
      email: 'tony@tony.tony',
    }).getValue() as Student;
  }
  save(student: Student): void {}
}
