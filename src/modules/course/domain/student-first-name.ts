import { Result } from './result';

export class StudentFirstName {
  firstName: string;

  private constructor(firstName: string) {
    this.firstName = firstName;
  }

  static create(firstNameInput: string) {
    if (firstNameInput === '') {
      return Result.isNotFine({
        message: 'Invalid firstName',
        type: 'InvalidFirstName',
      });
    }

    if (firstNameInput.length < 2) {
      return Result.isNotFine({
        message: 'firstName length should be greater than 2',
        type: 'InvalidFirstName',
      });
    }

    return Result.isFine<StudentFirstName>(
      new StudentFirstName(firstNameInput),
    );
  }
}
