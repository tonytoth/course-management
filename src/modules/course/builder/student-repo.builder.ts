import { StudentRepositoryFake } from '../fake/student.repository.fake';

export interface StudentTestProps {
  email: string;
  firstName: string;
  lastName: string;
}

export class StudentRepositoryBuilder {
  repository: StudentRepositoryFake;

  constructor() {
    this.repository = new StudentRepositoryFake();
  }

  withDefaultValues() {
    this.repository.addStudents([]);
    return this;
  }

  withStudents(students: StudentTestProps[]) {
    this.repository.addStudents(students);
    return this;
  }

  build(): StudentRepositoryFake {
    return this.repository;
  }
}
