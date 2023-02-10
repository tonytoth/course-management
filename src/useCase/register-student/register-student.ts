import { Result } from '../../domain/result';
import { Student } from '../../domain/student.entity';

interface StudentInput {
  email: string;
  firstName: string;
  lastName: string;
}

class RegisterStudent {
  constructor() {}

  async execute(input: Partial<StudentInput>) {
    const studentResult = Student.create({
      email: input.email || '',
      firstName: input.firstName || '',
      lastName: input.lastName || '',
    });

    if (studentResult.hasErrors()) {
      return Result.isNotFine(studentResult.getFirstError().message);
    }

    return Result.isFine(studentResult.getValue());
  }
}

export { RegisterStudent };
