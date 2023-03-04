import { StudentTestProps } from '../builder/student-repo.fake.builder';
import { Student } from '../domain/student.entity';
import { StudentRepository } from './student.repository';

export class StudentRepositoryFake implements StudentRepository {
  students: StudentTestProps[];

  constructor() {
    this.students = [];
  }

  addStudents(students: StudentTestProps[]) {
    this.students = students;
  }

  async getByEmail(email: string): Promise<Student | undefined> {
    const foundStudent = this.students?.find(
      (student) => student.email === email,
    );

    if (foundStudent) {
      return Student.create(foundStudent).getValue() || undefined;
    }

    return undefined;
  }

  async save(student: Student): Promise<void> {
    this.students.push(student);
  }
}
