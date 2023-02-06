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

  static create(props: Props): Student {
    return new Student(props);
  }
}
