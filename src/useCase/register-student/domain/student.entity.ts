interface Props {
  email: string;
  firstName: string;
}

export class Student {
  email: string;
  firstName: string;

  private constructor(props: Props) {
    this.email = props.email;
    this.firstName = props.firstName;
  }

  get getEmail() {
    return this.email;
  }

  get getFirstName() {
    return this.firstName;
  }

  static create(props: Props): Student {
    return new Student(props);
  }
}
