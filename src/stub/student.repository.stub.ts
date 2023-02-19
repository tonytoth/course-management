import { StudentI } from '../builder/student-repo.builder';
import { Student } from '../domain/student.entity';
import { StudentRepository } from '../student.repository';

export class StudentRepositoryStub implements StudentRepository {
  students: StudentI[] | undefined;

  constructor() {}

  addStudents(students: StudentI[]) {
    this.students = students;
  }

  getByEmail(email: string): Student | undefined {
    return undefined;
  }

  save(student: Student): void {}
}
