import { Result } from '../../domain/result';
import { StudentEmail } from '../../domain/student-email';
import { StudentFirstName } from '../../domain/student-first-name';
import { StudentLastName } from '../../domain/student-last-name';

interface StudentInput {
  email: string;
  firstName: string;
  lastName: string;
}

class RegisterStudent {
  constructor() {}

  async execute(input: Partial<StudentInput>) {
    const studentEmail = StudentEmail.create(input.email || '');

    if (!studentEmail) {
      return Result.isNotFine('Invalid email address');
    }

    const studentFirstName = StudentFirstName.create(input.firstName || '');

    if (studentFirstName.hasErrors()) {
      return Result.isNotFine('Invalid firstName');
    }

    const studentLastName = StudentLastName.create(input.lastName || '');

    if (studentLastName.hasErrors()) {
      return Result.isNotFine('Invalid lastName');
    }

    return Result.isFine<StudentInput>(input as StudentInput);
  }
}

export { RegisterStudent };
