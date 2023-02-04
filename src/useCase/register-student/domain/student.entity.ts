interface Props {
  email: string;
}

export class Student {
  email: string;

  private constructor(props: Props) {
    this.email = props.email;
  }

  get getEmail() {
    return this.email;
  }

  static create(props: Props): Student {
    return new Student(props);
  }
}
