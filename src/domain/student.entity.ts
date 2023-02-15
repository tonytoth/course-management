import { StudentLastName } from './student-last-name';
import { Result } from './result';
import { StudentEmail } from './student-email';
import { StudentFirstName } from './student-first-name';

interface Props {
  email: string;
  firstName: string;
  lastName: string;
}

export class Student {
  email: string;
  firstName: string;
  lastName: string;

  private constructor(props: Props) {
    this.email = props.email;
    this.firstName = props.firstName;
    this.lastName = props.lastName;
  }

  get getEmail() {
    return this.email;
  }

  get getFirstName() {
    return this.firstName;
  }

  get getLastName() {
    return this.lastName;
  }

  static create(props: Props): Result<Student | null> {
    const studentEmailResult = StudentEmail.create(props.email);

    if (studentEmailResult.hasErrors()) {
      return Result.isNotFine(studentEmailResult.getFirstError().message);
    }

    const studentFirstNameResult = StudentFirstName.create(props.firstName);

    if (studentFirstNameResult.hasErrors()) {
      return Result.isNotFine(studentFirstNameResult.getFirstError().message);
    }

    const studentLastNameResult = StudentLastName.create(props.lastName);

    if (studentLastNameResult.hasErrors()) {
      return Result.isNotFine(studentLastNameResult.getFirstError().message);
    }

    return Result.isFine(new Student(props));
  }
}
