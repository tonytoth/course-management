import { Result } from './result';

export class StudentLastName {
  private constructor() {}

  static create(lastNameInput: string) {
    if (lastNameInput === '') {
      return Result.isNotFine('Invalid firstName');
    }
    return Result.isFine(lastNameInput);
  }
}
