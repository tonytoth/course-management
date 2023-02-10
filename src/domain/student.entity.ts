import { Result } from "./result";
import { StudentEmail } from "./student-email";
import { StudentFirstName } from "./student-first-name";

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
    const studentEmail = StudentEmail.create(props.email);

    if (studentEmail.hasErrors()) {
      return Result.isNotFine('Invalid email address');
    }

    const studentFirstName = StudentFirstName.create(props.firstName);

    if (studentFirstName.hasErrors()) {
      return Result.isNotFine('Invalid firstName');
    }

    return Result.isFine(new Student(props));
  }
}
