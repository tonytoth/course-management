interface Error {
  message: string;
  type: string;
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

  static isNotFine(error: Error): Result<null> {
    return new Result<null>({
      data: null,
      errors: [error],
    });
  }
}
