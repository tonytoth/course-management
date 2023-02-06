import { Result } from './result';

export class StudentLastName {
  private constructor() {}

  static create(lastNameInput: string): Result<StudentLastName | null> {
    if (lastNameInput === '') {
      return Result.isNotFine('Invalid firstName');
    }
    return Result.isFine(lastNameInput);
  }
}
