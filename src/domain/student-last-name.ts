import { Result } from "./result";

export class StudentLastName {
  private constructor() {}

  static create(lastNameInput: string) {
    return Result.isFine(lastNameInput);
  }
}
