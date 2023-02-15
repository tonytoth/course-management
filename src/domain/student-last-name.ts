import { Result } from './result';

export class StudentLastName {
  lastName: string;

  private constructor(lastNameInput: string) {
    this.lastName = lastNameInput;
  }

  static create(lastNameInput: string): Result<StudentLastName | null> {
    if (lastNameInput === '') {
      return Result.isNotFine('Invalid lastName');
    }
    return Result.isFine<StudentLastName>(new StudentLastName(lastNameInput));
  }
}
