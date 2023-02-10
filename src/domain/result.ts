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

  getValue(): T {
    return this.data;
  }

  getFirstError(): Error {
    return this.errors[0];
  }

  hasErrors(): boolean {
    return this.errors.length > 0;
  }

  static isFine<T>(param: T): Result<T> {
    return new Result<T>({
      data: param,
      errors: [],
    });
  }

  static isNotFine(message: string): Result<null> {
    return new Result<null>({
      data: null,
      errors: [{ message }],
    });
  }
}
