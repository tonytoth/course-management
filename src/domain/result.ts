interface Error {
  message: string;
}

interface ResultI<T> {
  data: T;
  errors: Error[];
}

export class Result<T> {
  data: T;
  errors: Error[];

  private constructor(props: ResultI<T>) {
    this.data = props.data;
    this.errors = props.errors;
  }

  getValue() {
    return this.data;
  }

  static isFine(param: unknown) {
    return new Result({
      data: param,
      errors: [],
    });
  }

  static isNotFine(message: string) {
    return new Result({
      data: null,
      errors: [{ message }],
    });
  }
}
