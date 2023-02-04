import { Result } from './result';

export class StudentFirstName {
  static create(firstNameInput: string) {
    if (firstNameInput === '') {
      return Result.isNotFine('Invalid firstName');
    }

    if (firstNameInput.length < 2) {
      return Result.isNotFine('firstName length should be greater than 2');
    }

    return Result.isFine(firstNameInput);
  }
}
