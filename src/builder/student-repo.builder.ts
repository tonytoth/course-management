import { StudentRepositoryStub } from '../stub/student.repository.stub';

export interface StudentI {
  email: string;
  firstName: string;
  lastName: string;
}

export class StudentRepositoryBuilder {
  repository: StudentRepositoryStub;

  constructor() {
    this.repository = new StudentRepositoryStub();
  }

  withDefaultValues() {
    this.repository.addStudents([]);
    return this;
  }

  withStudents(students: StudentI[]) {
    this.repository.addStudents(students);
    return this;
  }

  build(): StudentRepositoryStub {
    return this.repository;
  }
}
