import { Result } from './result';

export class StudentFirstName {
  firstName: string;

  private constructor(firstName: string) {
    this.firstName = firstName;
  }

  static create(firstNameInput: string) {
    if (firstNameInput === '') {
      return Result.isNotFine('Invalid firstName');
    }

    if (firstNameInput.length < 2) {
      return Result.isNotFine('firstName length should be greater than 2');
    }

    return Result.isFine(new StudentFirstName(firstNameInput));
  }
}
